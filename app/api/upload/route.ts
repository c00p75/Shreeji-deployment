import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_ECOM_API_URL?.replace(/\/$/, '') || 'http://localhost:4000';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Get admin JWT token from request headers or cookie
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || 
                  request.cookies.get('admin_jwt')?.value ||
                  (typeof window !== 'undefined' ? localStorage.getItem('admin_jwt') : null);

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Forward the file to the NestJS backend
    const backendFormData = new FormData();
    backendFormData.append('file', file);

    const response = await fetch(`${API_URL}/files/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: backendFormData,
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error: error || 'Upload failed' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}

