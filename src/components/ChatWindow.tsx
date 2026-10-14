"use client";

import { useState } from "react";
import ChatMessage from "@/components/ChatMessage";
import type { ChatMessageProps } from "@/components/ChatMessage";

// Greeting shown before the user sends anything
const initialMessages: ChatMessageProps[] = [
    { role: "assistant", content: "Hi, I'm Ask PATH. Ask me anything about navigating high school." },
];

// Chat window with message history and the input form
export default function ChatWindow() {

    // Holds the running conversation
    const [messages, setMessages] = useState<ChatMessageProps[]>(initialMessages);

    // Holds the current text in the input box
    const [input, setInput] = useState("");

    // Adds the user message and a placeholder reply, replaced by a real API call later
    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const trimmed = input.trim();
        if (!trimmed) {
            return;
        }

        const userMessage: ChatMessageProps = { role: "user", content: trimmed };
        const placeholderReply: ChatMessageProps = { role: "assistant", content: "This is a placeholder reply. The real answer will come from Ollama once the backend is connected." };

        setMessages([...messages, userMessage, placeholderReply]);
        setInput("");
    }

    return (
        <div className = "flex h-[32rem] flex-col rounded-xl border border-gray-200 bg-white shadow-sm">

            {/* Scrollable message history */}
            <div className = "flex flex-1 flex-col gap-3 overflow-y-auto p-6">
                {messages.map((message, index) => (
                    <ChatMessage key = {index} role = {message.role} content = {message.content} />
                ))}
            </div>

            {/* Input row, submits on Enter or button click */}
            <form onSubmit = {handleSubmit} className = "flex gap-2 border-t border-gray-200 p-4">
                <input value = {input} onChange = {(event) => setInput(event.target.value)} placeholder = "Ask a question about high school..." className = "flex-1 rounded-full border border-gray-200 px-4 py-2 text-sm outline-none focus:border-[#09223E]" />
                <button type = "submit" className = "rounded-full bg-[#09223E] px-5 py-2 text-sm font-medium text-white">
                    Send
                </button>
            </form>
        </div>
    );
}