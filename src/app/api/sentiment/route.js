import { NextResponse } from 'next/server';
import fetchCryptoNews from './NewsApi';
import Sentiment from 'sentiment';

// Initialize sentiment analyzer
const sentiment = new Sentiment();

// In-memory storage for caching news data per coin
let cachedNewsData = {};
let lastFetchTimes = {};

// Function to analyze sentiment of a single text
async function analyzeSentiment(text) {
    try {
        const result = sentiment.analyze(text);
        return result.score;  // Return the sentiment score
    } catch (error) {
        console.error('Error during sentiment analysis:', error);
        throw error;
    }
}

// Calculate average sentiment from news articles' titles
async function calculateAverageSentiment(articles) {
    if (articles.length === 0) return 0;

    let totalSentiment = 0;
    let count = 0;

    // Create an array of promises for sentiment analysis
    const sentimentPromises = articles.map(async (article) => {
        const title = article.title;
        if (title) {
            const sentimentScore = await analyzeSentiment(title);
            totalSentiment += sentimentScore; // Accumulate the sentiment scores
            count += 1;
        }
    });

    // Wait for all promises to complete
    await Promise.all(sentimentPromises);

    let sentiment = 0;

    if (totalSentiment > 5) {
        sentiment = 10;
    } else if (totalSentiment + 5 < 0) {
        sentiment = 0;
    } else {
        sentiment = totalSentiment + 5;
    }

    return sentiment;
}

// Check if two hours have passed
function isTwoHoursApart(oldTimestamp) {
    const currentTime = new Date();
    const oldTime = new Date(oldTimestamp);
    const differenceInMilliseconds = Math.abs(currentTime - oldTime);
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
    return differenceInHours >= 2;
}

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

        const coinName = body.userInput.trim().toLowerCase();

        // Check if we need to refetch data for the specific coin
        if (!lastFetchTimes[coinName] || isTwoHoursApart(lastFetchTimes[coinName])) {
            console.log(`Fetching new data for ${coinName}...`);
            const articles = await fetchCryptoNews(coinName);
            const averageSentiment = await calculateAverageSentiment(articles);

            // Store the fetched data and update last fetch time
            cachedNewsData[coinName] = { articles, averageSentiment };
            lastFetchTimes[coinName] = new Date(); // Update last fetch time
        } else {
            console.log(`Returning cached data for ${coinName}...`);
        }

        // Return the cached data
        const { articles, averageSentiment } = cachedNewsData[coinName];
        return NextResponse.json({ averageSentiment, articles });
    } catch (err) {
        console.error('Internal server error:', err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
