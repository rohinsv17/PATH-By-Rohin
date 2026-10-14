"use client";

import { useState } from "react";
import Image from "next/image";
import { GraduationCap, BookOpen, Users, BarChart3, ChevronDown } from "lucide-react";
import AdviceTerm from "@/components/AdviceTerm";
import type { AdviceSection, Segment } from "@/content/advice";

// Placeholder icon per section, matched by section id
const sectionIcons: Record<string, typeof GraduationCap> = {
    grades: GraduationCap,
    "course-rigor": BookOpen,
    extracurriculars: Users,
    "sat-act": BarChart3,
};

// Renders one paragraph's segments, mapping terms to clickable buttons
function ParagraphSegments({ segments }: { segments: Segment[] }) {
    return (
        <>
            {segments.map((segment, index) => {
                if (segment.kind === "term") {
                    return <AdviceTerm key = {index} term = {segment.value} definition = {segment.definition} />;
                }
                return <span key = {index}>{segment.value}</span>;
            })}
        </>
    );
}
 
// Accordion of all advice sections, one open at a time
export default function AdviceAccordion({ sections }: { sections: AdviceSection[] }) {
 
    // Tracks which section id is currently open, or null if none
    const [openId, setOpenId] = useState<string | null>(null);
 
    return (
        <div className = "flex flex-col gap-4">
            {sections.map((section) => {
                const isOpen = section.id === openId;
                const Icon = sectionIcons[section.id];
 
                return (
                    <div key = {section.id} className = "rounded-xl border border-gray-200 bg-white shadow-sm">
 
                        {/* Tab header, toggles this section open or closed */}
                        <button onClick = {() => setOpenId(isOpen ? null : section.id)} className = "flex w-full items-center gap-4 px-6 py-4 text-left">
 
                            {/* Numbered badge in the section's accent color */}
                            <span className = {`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${section.accentColor}`}>
                                {section.number}
                            </span>
 
                            {/* Icon badge, placeholder icon representing the section */}
                            <span className = "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#09223E]">
                                <Icon className = "h-5 w-5" />
                            </span>
 
                            {/* Title and brief description */}
                            <span className = "flex-1">
                                <span className = "block font-semibold text-[#09223E]">
                                    {section.title}
                                </span>
                                <span className = "block text-sm text-slate-600">
                                    {section.description}
                                </span>
                            </span>
 
                            {/* Chevron toggle, rotates when open */}
                            <span className = "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 text-[#09223E]">
                                <ChevronDown className = {`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                            </span>
                        </button>
 
                        {/* Tab body, only rendered while open */}
                        {isOpen && (
                            <div className = "flex flex-col gap-4 border-t border-gray-200 px-6 py-4">
                                {section.blocks.map((block, index) => {
                                    if (block.kind === "image") {
                                        return (
                                            <div key = {index} className = "relative h-64 overflow-hidden rounded">
                                                <Image src = "/courseFlow.png" alt = "Course rigor hierarchy chart" fill className = "object-contain" />
                                            </div>
                                        );
                                    }
                                    return (
                                        <p key = {index} className = "text-sm text-gray-600">
                                            <ParagraphSegments segments = {block.segments} />
                                        </p>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
 