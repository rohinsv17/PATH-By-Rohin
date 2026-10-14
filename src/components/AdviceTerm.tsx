"use client";

import { useState } from "react";
import type { Segment } from "@/content/advice";

// Renders a definition's segments by handling plain text and embedded links
function DefinitionText({ segments }: { segments: Segment[] }) {
    return (
        <>
            {segments.map((segment, index) => {
                if (segment.kind === "link") {
                    return (
                        <a key = {index} href = {segment.url} target = "_blank" rel = "noopener noreferrer" className = "font-medium text-gray-900 underline underline-offset-4">
                            {segment.value}
                        </a>
                    );
                }
                return <span key = {index}>{segment.value}</span>;
            })}
        </>
    );
}

// Clickable terms open a small popover next to the word on click
export default function AdviceTerm({ term, definition }: { term: string; definition: Segment[] }) {

    // Tracks whether the popover is open
    const [isOpen, setIsOpen] = useState(false);

    return (
        <span className = "relative inline-block">

            {/* Dotted underline distinguishes a term from a normal navigation link */}
            <button onClick = {() => setIsOpen(true)} className = "underline decoration-dotted underline-offset-4 text-gray-900">
                {term}
            </button>

            {isOpen && (
                <>
                    {/* Invisible layer to catch outside clicks*/}
                    <span onClick = {() => setIsOpen(false)} className = "fixed inset-0 z-40" />

                    {/* Popover anchored below the word */}
                    <span className = "absolute left-0 top-full z-50 mt-2 block w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
                        <span className = "block text-sm text-gray-600">
                            <DefinitionText segments = {definition} />
                        </span>
                    </span>
                </>
            )}
        </span>
    );
}