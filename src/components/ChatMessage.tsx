// Shape of one chat message
export interface ChatMessageProps {
    role: "user" | "assistant";
    content: string;
}

// Renders a single message bubble, aligned by sender role
export default function ChatMessage({ role, content }: ChatMessageProps) {
    const isUser = role === "user";

    return (
        <div className = {`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div className = {`max-w-[75%] rounded-lg px-4 py-2 text-sm ${isUser ? "bg-[#09223E] text-white" : "bg-blue-50 text-[#09223E]"}`}>
                {content}
            </div>
        </div>
    );
}