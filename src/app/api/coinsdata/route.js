import { NextResponse } from 'next/server';
import FetchCryptoPrices from "../../FetchCryptoPrices";

// In-memory storage
let cachedData = [];
let lastFetchTime = null;

function isTwoHoursApart(oldTimestamp) {
    const currentTime = new Date();
    const oldTime = new Date(oldTimestamp);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = Math.abs(currentTime - oldTime);

    // Convert milliseconds to hours
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

    // Check if the difference is at least 2 hours
    return differenceInHours >= 2;
}

export async function POST(req) {
    try {
        const contentType = req.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            return NextResponse.json({ message: "Unsupported content type, expected 'application/json'" }, { status: 415 });
        }

        let body;
        try {
            body = await req.json();
        } catch (jsonError) {
            console.error('Failed to parse JSON:', jsonError);
            return NextResponse.json({ message: "Invalid JSON input" }, { status: 400 });
        }

        // Check if we need to refetch data
        if (!lastFetchTime || isTwoHoursApart(lastFetchTime)) {
            console.log('Fetching new data...');
            cachedData = await FetchCryptoPrices(body.CoinsNeeded);
            lastFetchTime = new Date(); // Update last fetch time
        } else {
            console.log('Returning cached data...');
        }

        // Create response object with cache control headers
        const response = NextResponse.json({ FetchedData: cachedData });
        response.headers.set('Cache-Control', 's-maxage=3600, stale-while-revalidate=59'); // Cache for 1 hour

        return response;
    } catch (err) {
        console.error('Internal server error:', err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
