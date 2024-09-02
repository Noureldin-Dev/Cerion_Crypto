import { NextResponse } from 'next/server';


export async function POST(req) {
    try {
        const contentType = req.headers.get('content-type');
        if (!contentType || contentType.indexOf('application/json') === -1) {
            return NextResponse.json({ message: "Unsupported content type, expected 'application/json'" }, { status: 415 });
        }

        let body;
        try {
            body = await req.json();
        } catch (jsonError) {
            console.error('Failed to parse JSON:', jsonError);
            return NextResponse.json({ message: "Invalid JSON input" }, { status: 400 });
        }

        if (!body || typeof body.userInput !== 'string') {
            return NextResponse.json({ message: "Invalid JSON input" }, { status: 400 });
        }

  

        // Return the average sentiment and articles
        return NextResponse.json({ coins: "coins" });
    } catch (err) {
        console.error('Internal server error:', err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
