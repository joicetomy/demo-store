// Role: API Route
// Purpose: Proxy GraphQL requests to Saleor API to avoid CORS issues

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const saleorApiUrl = process.env.NEXT_PUBLIC_SALEOR_API_URL || 'https://demo.saleor.io/graphql/';
    const channel = process.env.NEXT_PUBLIC_SALEOR_CHANNEL || 'default-channel';

    if (!saleorApiUrl) {
      return NextResponse.json(
        { error: 'Saleor API URL not configured' },
        { status: 500 }
      );
    }

    // Get authorization token from request headers if present
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || null;

    const response = await fetch(saleorApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        'saleor-channel': channel,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Saleor API error:', response.status, errorText);
      return NextResponse.json(
        { error: `Saleor API error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('GraphQL proxy error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

