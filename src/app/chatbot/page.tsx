import { Lightbulb } from "lucide-react";
import ChatWindow from "@/components/ChatWindow";
import PageShell from "@/components/PageShell";

// Ask PATH chatbot page header and chat window
export default function ChatbotPage() {
    return (
        <PageShell>
            <p className = "text-3xl font-semibold text-gray-900">
                Ask PATH
            </p>
            <h1 className = "mt-2 text-4xl font-bold tracking-tight text-[#DC701B] md:text-5xl">
                Get quick answers, anytime.
            </h1>
            <p className = "mt-4 mb-10 text-sm text-slate-600">
                Ask a question about grades, course rigor, extracurriculars, or test prep, and get an instant answer.
            </p>

            {/* Warm up notice with an orange lightbulb beside the text */}
            <div className = "flex items-center gap-2">
                <Lightbulb className = "h-5 w-5 shrink-0 text-[#DC701B]" />
                <p className = "text-sm font-bold italic text-gray-500">
                    Please give the model up to a minute to warm up on first use.
                </p>
            </div>

            <ChatWindow />
        </PageShell>
    );
}