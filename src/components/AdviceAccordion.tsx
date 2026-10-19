"use client";

import { useState } from "react";
import Image from "next/image";
import { GraduationCap, BookOpen, Compass, Users, BarChart3, Clock, ChevronDown } from "lucide-react";
import AdviceTerm from "@/components/AdviceTerm";
import type { AdviceSection, Segment } from "@/content/advice";

// Placeholder icon per section, matched by section id
const sectionIcons: Record<string, typeof GraduationCap> = {
    grades: GraduationCap,
    "course-rigor": BookOpen,
    extracurriculars: Compass,
    leadership: Users,
    "sat-act": BarChart3,
    balance: Clock,
};

// Renders one paragraph's segments, mapping each segment kind to its styling
function ParagraphSegments({ segments }: { segments: Segment[] }) {
    return (
        <>
            {segments.map((segment, index) => {

                // Terms open a clickable definition
                if (segment.kind === "term") {
                    return <AdviceTerm key = {index} term = {segment.value} definition = {segment.definition} />;
                }

                // Bold segments highlight a key sentence
                if (segment.kind === "bold") {
                    return <strong key = {index} className = "font-semibold text-gray-800">{segment.value}</strong>;
                }

                // Italic segments emphasize a single word
                if (segment.kind === "italic") {
                    return <em key = {index}>{segment.value}</em>;
                }

                // Links open in a new tab
                if (segment.kind === "link") {
                    return <a key = {index} href = {segment.url} target = "_blank" rel = "noopener noreferrer" className = "text-[#09223E] underline hover:text-[#DC701B]">{segment.value}</a>;
                }

                // Remaining segments are plain text
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

                // Falls back to a default icon if a section id has no match
                const Icon = sectionIcons[section.id] ?? GraduationCap;

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

                        {/* Tab body, always rendered so its height can animate, hidden content is also skipped by keyboard and screen readers */}
                        <div className = {`grid transition-[grid-template-rows,visibility] duration-300 ease-in-out motion-reduce:transition-none ${isOpen ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"}`}>

                            {/* Clips the content while the row height animates */}
                            <div className = "overflow-hidden">
                                <div className = "flex flex-col gap-4 border-t border-gray-200 px-6 py-4">
                                    {section.blocks.map((block, index) => {

                                        // Course hierarchy chart
                                        if (block.kind === "image") {
                                            return (
                                                <div key = {index} className = "relative h-64 overflow-hidden rounded">
                                                    <Image src = "/courseFlow.png" alt = "Course rigor hierarchy chart" fill className = "object-contain" />
                                                </div>
                                            );
                                        }

                                        // Subheading that starts a new topic inside a section
                                        if (block.kind === "heading") {
                                            return (
                                                <h4 key = {index} className = "mt-2 text-base font-semibold text-[#09223E]">
                                                    {block.value}
                                                </h4>
                                            );
                                        }

                                        // Bulleted list
                                        if (block.kind === "list") {
                                            return (
                                                <ul key = {index} className = "ml-6 flex list-disc flex-col gap-1 text-sm text-gray-600">
                                                    {block.items.map((item) => (
                                                        <li key = {item}>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            );
                                        }

                                        // Takeaway callout with a bar in the section's accent color
                                        if (block.kind === "advice") {
                                            return (
                                                <div key = {index} className = "flex gap-3 rounded-lg bg-gray-50 p-4">
                                                    <span className = {`w-1 shrink-0 rounded-full ${section.accentColor}`} />
                                                    <p className = "text-sm text-gray-700">
                                                        <span className = "font-semibold text-[#09223E]">My advice: </span>
                                                        {block.value}
                                                    </p>
                                                </div>
                                            );
                                        }

                                        // Remaining blocks are paragraphs
                                        return (
                                            <p key = {index} className = "text-sm text-gray-600">
                                                <ParagraphSegments segments = {block.segments} />
                                            </p>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}