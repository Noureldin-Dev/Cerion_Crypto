import { NextResponse } from 'next/server';
import fetchCryptoNews from './NewsApi';
import Sentiment from 'sentiment';

// Initialize sentiment analyzer
const sentiment = new Sentiment();

// Function to analyze sentiment of a single text
async function analyzeSentiment(text) {
    try {
        const result = sentiment.analyze(text);
        console.log(result.score);
        return result.score;  // Return the sentiment score
    } catch (error) {
        console.error('Error during sentiment analysis:', error);
        throw error;
    }
}

// Calculate average sentiment from news articles' titles
async function calculateAverageSentiment(articles) {
    console.log("calculate");

    if (articles.length === 0) return 0;

    let totalSentiment = 0;
    let count = 0;

    // Create an array of promises for sentiment analysis
    const sentimentPromises = articles.map(async (article) => {
        const title = article.title;
        if (title) {
            const sentimentScore = await analyzeSentiment(title);
            console.log("sentiment");
            console.log(sentimentScore);
            totalSentiment += sentimentScore; // Accumulate the sentiment scores
            count += 1;
        }
    });

    // Wait for all promises to complete
    await Promise.all(sentimentPromises);

    console.log("totalSentiment");
    console.log(totalSentiment);

    return totalSentiment > 5? 10 : totalSentiment+5;
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

        console.log('Received user input:', body.userInput);

        // Fetch news articles based on user input
        const articles = await fetchCryptoNews(body.userInput);

        // Calculate average sentiment from article titles
        const averageSentiment = await calculateAverageSentiment(articles);
        console.log('Calculated average sentiment:', averageSentiment);

        // Return the average sentiment and articles
        return NextResponse.json({ averageSentiment, articles });
    } catch (err) {
        console.error('Internal server error:', err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
