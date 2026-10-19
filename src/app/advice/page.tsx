import AdviceAccordion from "@/components/AdviceAccordion";
import PageShell from "@/components/PageShell";
import { adviceSections, introText } from "@/content/advice";

// High School advice page with header and accordion of sections
export default function AdvicePage() {
    return (
        <PageShell>
 
            {/* Two line header */}
            <p className = "text-3xl font-semibold text-gray-900">
                High School Advice
            </p>
            <h1 className = "mt-2 text-4xl font-bold tracking-tight md:text-5xl">
                <span className = "block text-[#09223E]">Build Today for a</span>
                <span className = "mt-2 block text-[#DC701B]">Bigger Tomorrow</span>
            </h1>
            <div className = "mt-6 mb-12 flex max-w-2xl flex-col gap-3 text-left">
                {introText.map((paragraph, index) => (
                    <p key = {index} className = "indent-8 leading-relaxed text-gray-600">
                        {paragraph}
                    </p>
                ))}
            </div>
 
            <AdviceAccordion sections = {adviceSections} />
        </PageShell>
    );
}