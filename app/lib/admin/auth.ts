// Strapi Authentication utilities
import axios from 'axios';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337/api';
const STRAPI_ADMIN_URL = process.env.NEXT_PUBLIC_STRAPI_ADMIN_URL || 'http://localhost:1337';

export interface StrapiUser {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  jwt: string;
  user: StrapiUser;
}

export interface LoginCredentials {
  identifier: string; // email or username
  password: string;
}

class StrapiAuth {
  private baseURL: string;

  constructor() {
    this.baseURL = STRAPI_URL;
  }

  // Login with email/username and password using Admin API
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Admin API uses '/admin/login' endpoint and 'email' field
      // The identifier from the form can be either email or username
      const response = await axios.post(`${STRAPI_ADMIN_URL}/admin/login`, {
        email: credentials.identifier, // Admin API uses email field
        password: credentials.password,
      });

      // Admin API typically returns: { data: { token: string, user: {...} } }
      // Handle different possible response structures
      const responseData = response.data;
      const jwt = responseData?.data?.token || responseData?.token || responseData?.jwt || responseData?.data?.jwt;
      const user = responseData?.data?.user || responseData?.user || responseData?.data;

      if (!jwt || !user) {
        throw new Error('Invalid response structure from Admin API');
      }

      // Store JWT in localStorage with admin-specific key
      if (typeof window !== 'undefined') {
        localStorage.setItem('strapi_admin_jwt', jwt);
        localStorage.setItem('strapi_admin_user', JSON.stringify(user));
      }

      return { jwt, user };
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.error?.message || error.response?.data?.message || error.message || 'Login failed');
    }
  }

  // Register a new user (admin only)
  async register(userData: {
    username: string;
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${STRAPI_ADMIN_URL}/api/auth/local/register`, userData);
      const { jwt, user } = response.data;

      // Store JWT in localStorage with admin-specific key
      if (typeof window !== 'undefined') {
        localStorage.setItem('strapi_admin_jwt', jwt);
        localStorage.setItem('strapi_admin_user', JSON.stringify(user));
      }

      return { jwt, user };
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(error.response?.data?.error?.message || 'Registration failed');
    }
  }

  // Get current user from stored JWT using Admin API
  async getCurrentUser(): Promise<StrapiUser | null> {
    try {
      const jwt = this.getStoredToken();
      if (!jwt) return null;

      const response = await axios.get(`${STRAPI_ADMIN_URL}/admin/users/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      // Admin API may return data in { data: { ... } } format
      return response.data.data || response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      this.logout(); // Clear invalid token
      return null;
    }
  }

  // Validate stored token using Admin API
  async validateToken(): Promise<boolean> {
    try {
      const jwt = this.getStoredToken();
      if (!jwt) return false;

      const response = await axios.get(`${STRAPI_ADMIN_URL}/admin/users/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  // Get stored JWT token
  getStoredToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('strapi_admin_jwt');
  }

  // Get stored user data
  getStoredUser(): StrapiUser | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('strapi_admin_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Logout user
  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('strapi_admin_jwt');
      localStorage.removeItem('strapi_admin_user');
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getStoredToken();
  }

  // Get authorization header for API requests
  getAuthHeaders(): Record<string, string> {
    const token = this.getStoredToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

// Create singleton instance
const strapiAuth = new StrapiAuth();

export default strapiAuth;

