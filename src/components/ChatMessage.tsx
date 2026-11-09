import ReactMarkdown from "react-markdown";

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

                {/* User messages stay plain text, assistant replies render as Markdown */}
                {isUser ? (
                    content
                ) : (
                    <div className = "[&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:mb-2 [&_ul]:ml-5 [&_ul]:list-disc [&_ol]:mb-2 [&_ol]:ml-5 [&_ol]:list-decimal [&_li]:mb-1 [&_ul:last-child]:mb-0 [&_ol:last-child]:mb-0">
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
}