import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Admin routes protection
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
      // Allow access to login page
      return NextResponse.next()
    }
    
    // For other admin routes, check authentication via cookie or header
    // Note: This is a basic check. In production, you may want to validate the token
    const adminToken = request.cookies.get('strapi_admin_jwt')?.value ||
                      request.headers.get('authorization')?.replace('Bearer ', '')
    
    // If accessing admin routes without token, middleware will allow but client-side
    // ProtectedRoute component will handle the redirect
    // Alternatively, you can redirect here:
    // if (!adminToken) {
    //   return NextResponse.redirect(new URL('/admin/login', request.url))
    // }
  }
  
  // Client portal routes protection
  if (pathname.startsWith('/portal')) {
    if (pathname === '/portal/login') {
      // Allow access to login page
      return NextResponse.next()
    }
    
    // For other portal routes, check authentication
    const clientToken = request.cookies.get('strapi_client_jwt')?.value ||
                       request.headers.get('authorization')?.replace('Bearer ', '')
    
    // Similar to admin - client-side protection will handle redirects
    // For server-side redirect, uncomment:
    // if (!clientToken) {
    //   return NextResponse.redirect(new URL('/portal/login', request.url))
    // }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/portal/:path*',
  ],
}

