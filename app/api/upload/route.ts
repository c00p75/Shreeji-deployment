import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_ECOM_API_URL?.replace(/\/$/, '') || 'http://localhost:4000';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Get admin JWT token from Authorization header or cookie
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || request.cookies.get('admin_jwt')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Forward the file to the NestJS backend
    const backendFormData = new FormData();
    backendFormData.append('file', file);

    const response = await fetch(`${API_URL}/files/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: backendFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Image upload failed: ${response.status} ${response.statusText}`;

      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error?.message || errorJson.message || errorMessage;
      } catch {
        if (errorText) {
          errorMessage = errorText;
        }
      }

      return NextResponse.json({ error: errorMessage }, { status: response.status });
    }

    // Transform backend FileMetadata -> frontend expected shape
    const backendData = await response.json();
    return NextResponse.json({
      id: backendData.id || Date.now(),
      url: backendData.url,
      name: backendData.originalName || backendData.name || file.name,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}

