// Update your sentiment API handler

import { NextResponse } from 'next/server';
import fetchCryptoNews from './NewsApi';
const tf = require('@tensorflow/tfjs');

// Use a global variable to hold the model
let model = null;
let isModelInUse = false;

function initializeModel() {
    try {
        if (!model) {
            tf.disposeVariables();  // Clear any previously registered variables
            model = tf.sequential();  // Create the model
            model.add(tf.layers.dense({ inputShape: [1], units: 1, activation: 'sigmoid' }));
            model.compile({ optimizer: 'sgd', loss: 'binaryCrossentropy' });
            console.log('Model initialized successfully');
        }
    } catch (error) {
        console.error('Error during model initialization:', error);
        throw error;
    }
}

async function analyzeSentiment(userInput) {
    try {
        while (isModelInUse) {
            await new Promise(resolve => setTimeout(resolve, 10));
        }
        isModelInUse = true;  // Lock the model

        initializeModel();

        const result = tf.tidy(() => {
            const processedText = preprocessText(userInput);
            const tokenizedText = tokenizeText(processedText);
            const inputTensor = tf.tensor([[tokenizedText.length]]);
            const prediction = model.predict(inputTensor);
            return prediction.arraySync()[0][0];  // Extract the value
        });

        isModelInUse = false;  // Release the lock
        return result;

    } catch (error) {
        isModelInUse = false;  // Ensure the lock is released in case of an error
        console.error('Error during sentiment analysis:', error);
        throw error;
    }
}

function preprocessText(text) {
    return text.toLowerCase().replace(/[^a-z\s]/g, '');
}

function tokenizeText(text) {
    return text.split(/\s+/);
}

// Calculate average sentiment from news articles
function calculateAverageSentiment(articles) {
  if (articles.length === 0) return 0;

  let totalSentiment = 0;
  let totalWeight = 0;

  articles.forEach(article => {
    const sentiment = article.sentiment;
    const weight = sentiment > 0 ? sentiment : 0; // Adjust weight logic as needed

    totalSentiment += sentiment * weight;
    totalWeight += weight;
  });

  return totalWeight > 0 ? totalSentiment / totalWeight : 0;
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

        const sentiment = await analyzeSentiment(body.userInput);
        console.log('Sentiment analysis result:', sentiment);

        const news = await fetchCryptoNews(body.userInput);
        const averageSentiment = calculateAverageSentiment(news);
        console.log('Calculated average sentiment:', averageSentiment);

        return NextResponse.json({ averageSentiment, news });
    } catch (err) {
        console.error('Internal server error:', err);
        return NextResponse.json({ message: "internal server error" }, { status: 500 });
    }
}
