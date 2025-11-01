// Client Authentication utilities
import axios from 'axios';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export interface ClientUser {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ClientAuthResponse {
  jwt: string;
  user: ClientUser;
}

export interface ClientLoginCredentials {
  email: string;
  password: string;
}

class ClientAuth {
  private baseURL: string;

  constructor() {
    this.baseURL = `${STRAPI_URL}/api`;
  }

  // Login with email and password using Strapi Customer API
  async login(credentials: ClientLoginCredentials): Promise<ClientAuthResponse> {
    try {
      const response = await axios.post(`${this.baseURL}/auth/local`, {
        identifier: credentials.email,
        password: credentials.password,
      });

      const { jwt, user } = response.data;

      // Store JWT in localStorage with client-specific key
      if (typeof window !== 'undefined') {
        localStorage.setItem('strapi_client_jwt', jwt);
        localStorage.setItem('strapi_client_user', JSON.stringify(user));
      }

      return { jwt, user };
    } catch (error: any) {
      console.error('Client login error:', error);
      throw new Error(error.response?.data?.error?.message || error.response?.data?.message || error.message || 'Client login failed');
    }
  }

  // Get current user from stored JWT
  async getCurrentUser(): Promise<ClientUser | null> {
    try {
      const jwt = this.getStoredToken();
      if (!jwt) return null;

      const response = await axios.get(`${this.baseURL}/users/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      this.logout(); // Clear invalid token
      return null;
    }
  }

  // Validate stored token
  async validateToken(): Promise<boolean> {
    try {
      const jwt = this.getStoredToken();
      if (!jwt) return false;

      const response = await axios.get(`${this.baseURL}/users/me`, {
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
    return localStorage.getItem('strapi_client_jwt');
  }

  // Get stored user data
  getStoredUser(): ClientUser | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('strapi_client_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Logout user
  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('strapi_client_jwt');
      localStorage.removeItem('strapi_client_user');
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
const clientAuth = new ClientAuth();

export default clientAuth;

