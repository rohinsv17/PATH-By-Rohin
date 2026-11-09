"use client";

import { useState } from "react";
import PageShell from "@/components/PageShell";

// Address of the FastAPI backend hosted on Hugging Face Spaces read as an environment variable
const API_URL = process.env.NEXT_PUBLIC_SENTIMENT_API_URL;

// Error handling for type guard
if (!API_URL) {
    throw new Error("NEXT_PUBLIC_SENTIMENT_API_URL is not set — check your .env.local file.");
}

// Copy taken after the guard so its type is a plain string inside the component
const SENTIMENT_API_URL: string = API_URL;

// Shape of a successful prediction response from the backend
interface PredictionResult {
    label: string;
    scores: Record<string, number>;
}

// Meme stock sentiment classifier demo page
export default function SentimentAnalysis() {

    // Holds the text the user types into the input box
    const [inputText, setInputText] = useState("");

    // Holds the most recent prediction result, once one exists
    const [result, setResult] = useState<PredictionResult | null>(null);

    // Tracks whether a request is currently in flight
    const [isLoading, setIsLoading] = useState(false);

    // Holds an error message if the request fails
    const [error, setError] = useState<string | null>(null);

    // Sends the current input text to the backend and stores the response
    async function classifyText() {

        // Ignores empty submissions
        if (!inputText.trim()) return;

        // Resets error and result state, then marks the request as loading
        setError(null);
        setResult(null);
        setIsLoading(true);

        try {
            // Sends a POST request with the text in the JSON body
            const response = await fetch(SENTIMENT_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: inputText }),
            });

            // Throws if the server responded with an error status
            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status}`);
            }

            // Parses the JSON body into our expected shape
            const data: PredictionResult = await response.json();
            setResult(data);
        } catch (err) {
            // Free Spaces sleep after inactivity, so a slow or failed first request is expected
            setError("The model is waking up or unreachable, please try again in a moment.");
        } finally {
            // Clears loading state regardless of success or failure
            setIsLoading(false);
        }
    }

    return (
        <PageShell widthClass = "max-w-xl">

            {/* Page heading and short explanation */}
            <div className = "mb-8 flex flex-col items-center gap-3 pt-8 text-center">
                <h1 className = "text-3xl font-semibold text-gray-900">
                    Meme Stock Sentiment Classifier
                </h1>
            </div>

            {/* Project description split into short labelled sections */}
            <div className = "mb-10 flex flex-col gap-5 text-sm text-gray-600">
                <div className = "flex flex-col gap-1">
                    <h2 className = "font-semibold text-gray-900">
                        What it does:
                    </h2>
                    <p>
                        This tool reads a piece of investing related text, such as a post or comment about a stock, and classifies its tone as Positive, Negative, or Neutral. It also shows how confident the model is in each of the three labels.
                    </p>
                </div>

                <div className = "flex flex-col gap-1">
                    <h2 className = "font-semibold text-gray-900">
                        How to use it:
                    </h2>
                    <p>
                        Paste text into the box below and press Classify. It is meant for gauging the mood of online discussion around a meme stock, not for predicting price movements, and nothing here is financial advice. Meme stocks, specifically, are stocks that gain popularity through social media and online sentiments.
                    </p>
                </div>

                <div className = "flex flex-col gap-1">
                    <h2 className = "font-semibold text-gray-900">
                        Background:
                    </h2>
                    <p>
                        I built this to explore how sentiment around meme stocks could inform whether one is worth a closer look. I collaborated with other students to tune the model in Google Colab, and then independently turned it into a small web service so it could be used from this site.
                    </p>
                </div>

                <div className = "flex flex-col gap-1">
                    <h2 className = "font-semibold text-gray-900">
                        How it works:
                    </h2>
                    <p>
                        The classifier uses a tuned BERT model for Natural Language Processing. A FastAPI backend in Python serves it from a Hugging Face Space, with the model weights hosted on the Hugging Face Hub. This page is built with Next.js, React, and TypeScript, and sends your text to the backend through a single API request. The backend runs on free hardware that sleeps when idle, so the first request after a quiet period can take up to a minute while the model wakes up.
                    </p>
                </div>
            </div>

            {/* Text input and submit button */}
            <div className = "flex flex-col gap-4">
                <textarea value = {inputText} onChange = {(e) => setInputText(e.target.value)} rows = {4} placeholder = "e.g. The GameStop stock is experiencing record highs this month..." className = "rounded-lg border border-gray-200 p-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300" />
                <button onClick = {classifyText} disabled = {isLoading} className = "rounded-lg bg-gray-900 py-3 text-sm font-medium text-white disabled:opacity-50">
                    {isLoading ? "Classifying..." : "Classify"}
                </button>
            </div>

            {/* Loading hint, only shown while a request is in flight */}
            {isLoading && (
                <p className = "mt-6 text-center text-sm text-gray-500">
                    Waking up the model, this can take up to a minute on the first request.
                </p>
            )}

            {/* Error message, only shown if the request failed */}
            {error && (
                <p className = "mt-6 text-center text-sm text-red-600">
                    {error}
                </p>
            )}

            {/* Result card, only shown once a prediction exists */}
            {result && (
                <div className = "mt-8 rounded-lg border border-gray-200 p-6">
                    <p className = "text-sm text-gray-600">
                        Predicted sentiment
                    </p>
                    <p className = "text-2xl font-semibold text-gray-900">
                        {result.label}
                    </p>
                    <div className = "mt-4 flex flex-col gap-2">
                        {Object.entries(result.scores).map(([label, score]) => (
                            <div key = {label} className = "flex items-center gap-3">
                                <span className = "w-20 text-sm text-gray-600">
                                    {label}
                                </span>
                                <div className = "h-2 flex-1 rounded-full bg-gray-100">
                                    <div style = {{ width: `${score * 100}%` }} className = "h-2 rounded-full bg-gray-900" />
                                </div>
                                <span className = "w-12 text-right text-sm text-gray-600">
                                    {Math.round(score * 100)}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </PageShell>
    );
}