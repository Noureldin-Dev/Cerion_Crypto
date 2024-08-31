import { NextResponse } from 'next/server';
import { Pipeline } from '@xenova/transformers';
import axios from 'axios';


require('@tensorflow/tfjs');
const use = require('@tensorflow-models/universal-sentence-encoder');
// Load the model.
use.load().then(model => {
  // Embed an array of sentences.
  const sentences = [
    'Hello.',
    'How are you?'
  ];
  model.embed(sentences).then(embeddings => {
    // `embeddings` is a 2D tensor consisting of the 512-dimensional embeddings for each sentence.
    // So in this example `embeddings` has the shape [2, 512].
    embeddings.print(true /* verbose */);
  });
});
export async function POST(req){
  const { token } = req.body;

  try {


    return NextResponse.json({ message: "success" })
  } catch (err) {
    return NextResponse.json({ message: "internal server error" })
  }
}