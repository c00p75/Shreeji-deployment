import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const IMGHIPPO_API_KEY = process.env.IMGHIPPO_API_KEY; // Server-side only
    
    if (!IMGHIPPO_API_KEY) {
      return NextResponse.json(
        { error: 'Imghippo API key is not configured' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Create new FormData for Imghippo API
    const imghippoFormData = new FormData();
    imghippoFormData.append('api_key', IMGHIPPO_API_KEY);
    imghippoFormData.append('file', file);

    // Upload to Imghippo server-side
    const response = await fetch('https://api.imghippo.com/v1/upload', {
      method: 'POST',
      body: imghippoFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Imghippo upload failed: ${response.status} ${response.statusText}`;
      
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorJson.error?.message || errorMessage;
      } catch {
        if (errorText) {
          errorMessage = errorText;
        }
      }

      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    if (!data.success || !data.data) {
      return NextResponse.json(
        { error: data.message || 'Upload failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: data.data.url,
      view_url: data.data.view_url,
      name: data.data.title || file.name,
    });
  } catch (error: any) {
    console.error('Imghippo upload proxy error:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      cause: error.cause,
    });
    
    // Check for specific error types
    if (error.cause?.code === 'ECONNREFUSED') {
      return NextResponse.json(
        { error: 'Connection refused. Please check your internet connection.' },
        { status: 503 }
      );
    }
    
    if (error.cause?.code === 'ETIMEDOUT') {
      return NextResponse.json(
        { error: 'Upload timed out. Please try again.' },
        { status: 504 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

