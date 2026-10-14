import ChatWindow from "@/components/ChatWindow";
import PageShell from "@/components/PageShell";

// Ask PATH chatbot page header and chat window
export default function ChatbotPage() {
    return (
        <PageShell>
            <p className = "text-sm font-semibold tracking-wide text-[#DC701B]">
                ASK PATH
            </p>
            <h1 className = "mt-2 text-4xl font-bold tracking-tight text-[#09223E] md:text-5xl">
                Get quick answers, anytime.
            </h1>
            <p className = "mt-4 mb-10 text-sm text-slate-600">
                Ask a question about grades, course rigor, extracurriculars, or test prep, and get an instant answer.
            </p>
 
            <ChatWindow />
        </PageShell>
    );
}