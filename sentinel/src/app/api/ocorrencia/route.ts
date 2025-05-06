import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch('https://gkr7t959w0.execute-api.sa-east-1.amazonaws.com/ocorrencia', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        const response = await fetch('https://gkr7t959w0.execute-api.sa-east-1.amazonaws.com/ocorrencia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, ...data } = body;
        
        const response = await fetch(`https://gkr7t959w0.execute-api.sa-east-1.amazonaws.com/ocorrencia/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();
        return NextResponse.json(responseData, { status: response.status });
    } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
} 