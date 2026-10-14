import AdviceAccordion from "@/components/AdviceAccordion";
import PageShell from "@/components/PageShell";
import { adviceSections, introText } from "@/content/advice";

// High School advice page with header and accordion of sections
export default function AdvicePage() {
    return (
        <PageShell>
 
            {/* Two line header */}
            <p className = "text-sm font-semibold tracking-wide text-[#DC701B]">
                HIGH SCHOOL
            </p>
            <h1 className = "mt-2 text-4xl font-bold tracking-tight md:text-5xl">
                <span className = "block text-[#09223E]">Build Today for</span>
                <span className = "mt-2 block text-[#DC701B]">Bigger Tomorrow</span>
            </h1>
            <p className = "mt-4 mb-10 text-sm text-slate-600">
                {introText}
            </p>
 
            <AdviceAccordion sections = {adviceSections} />
        </PageShell>
    );
}