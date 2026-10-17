"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import type { ChatMessageProps } from "@/components/ChatMessage";

// Greeting shown before the user sends anything
const initialMessages: ChatMessageProps[] = [
    { role: "assistant", content: "Hi, I'm Ask PATH. Ask me anything about navigating high school." },
];

// Phrases shown in the reply bubble while waiting, one is picked at random for each question
const loadingPhrases = ["Thinking...", "Synthesizing...", "Formulating...", "Searching sources...", "Putting it together..."];

// Chat window with message history and the input form
export default function ChatWindow() {

    // Holds the running conversation
    const [messages, setMessages] = useState<ChatMessageProps[]>(initialMessages);

    // Holds the current text in the input box
    const [input, setInput] = useState("");

    // Tracks whether a reply is currently being fetched
    const [isLoading, setIsLoading] = useState(false);

    // Holds the loading phrase shown for the current question
    const [loadingPhrase, setLoadingPhrase] = useState(loadingPhrases[0]);

    // Sends the conversation to the chat API and appends the reply
    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const trimmed = input.trim();
        if (!trimmed || isLoading) {
            return;
        }

        const userMessage: ChatMessageProps = { role: "user", content: trimmed };
        const updatedMessages = [...messages, userMessage];

        // Picks a random loading phrase for this question
        setLoadingPhrase(loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)]);
        setMessages(updatedMessages);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: updatedMessages }),
            });

            const data = await response.json();
            const replyMessage: ChatMessageProps = { role: "assistant", content: data.reply };

            setMessages([...updatedMessages, replyMessage]);
        } catch {

            // Handles a network failure reaching our own API route
            const fallback: ChatMessageProps = { role: "assistant", content: "Something went wrong sending your message. Please try again." };
            setMessages([...updatedMessages, fallback]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className = "flex h-[32rem] flex-col rounded-xl border border-gray-200 bg-white shadow-sm">

            {/* Scrollable message history */}
            <div className = "flex flex-1 flex-col gap-3 overflow-y-auto p-6">
                {messages.map((message, index) => (
                    <ChatMessage key = {index} role = {message.role} content = {message.content} />
                ))}

                {/* Shown while waiting for a reply */}
                {isLoading && (
                    <ChatMessage role = "assistant" content = {loadingPhrase} />
                )}
            </div>

            {/* Input row, submits on Enter or button click, length matches the RAG service limit */}
            <form onSubmit = {handleSubmit} className = "flex gap-2 border-t border-gray-200 p-4">
                <input id = "chat-input" name = "message" type = "text" autoComplete = "off" aria-label = "Ask a question about high school" value = {input} onChange = {(event) => setInput(event.target.value)} placeholder = "Ask a question about high school..." maxLength = {1000} disabled = {isLoading} className = "flex-1 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-[#09223E] outline-none placeholder:text-gray-500 focus:border-[#09223E] disabled:opacity-50" />
                <button type = "submit" aria-label = "Send" disabled = {isLoading} className = "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#09223E] text-white transition-colors enabled:cursor-pointer enabled:hover:bg-[#DC701B] disabled:opacity-50">
                    <Send className = "h-4 w-4" />
                </button>
            </form>
        </div>
    );
}