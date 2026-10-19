"use client";

import { useState } from "react";
import Image from "next/image";
import LinkButton from "@/components/LinkButton";
import TagList from "@/components/TagList";
import type { Project } from "@/content/projects";

// Displays one project with an info column and an image gallery
export default function ProjectCard({ title, description, tags, link, demoLink, images }: Project) {

    // Tracks which image in the gallery is currently showing
    const [imageIndex, setImageIndex] = useState(0);

    // Moves to the previous image, wrapping around at the start
    function showPrevious() {
        setImageIndex((imageIndex - 1 + images.length) % images.length);
    }

    // Moves to the next image, wrapping around at the end
    function showNext() {
        setImageIndex((imageIndex + 1) % images.length);
    }

    return (
        <div className = "flex flex-col gap-6 rounded-lg border border-gray-200 p-6 md:flex-row">

            {/* Left column with title, description, and project links */}
            <div className = "flex flex-1 flex-col justify-center gap-3">
                <h3 className = "text-xl font-semibold text-gray-900">
                    {title}
                </h3>

                {/* Each paragraph is indented on its first line */}
                {description.map((paragraph, index) => (
                    <p key = {index} className = "indent-8 text-sm text-gray-600">
                        {paragraph}
                    </p>
                ))}
                <TagList label = "Project Includes:" tags = {tags} />
                <div className = "mt-2 flex flex-wrap gap-4">
                    {link && (
                        <LinkButton href = {link} variant = "secondary" icon = "/githubLogo.svg">
                            View Codebase (GitHub)
                        </LinkButton>
                    )}
                    {demoLink && (
                        <LinkButton href = {demoLink}>
                            View Project Live
                        </LinkButton>
                    )}
                </div>
            </div>

            {/* Right column image gallery with arrow controls */}
            <div className = "relative flex flex-1 items-center justify-center bg-gray-50 py-8">
                <button onClick = {showPrevious} className = "absolute left-2 text-lg text-gray-600 hover:text-gray-900">
                    ←
                </button>
                <Image src = {images[imageIndex]} alt = {`${title} screenshot ${imageIndex + 1}`} width = {300} height = {200} className = "rounded" />
                <button onClick = {showNext} className = "absolute right-2 text-lg text-gray-600 hover:text-gray-900">
                    →
                </button>
            </div>
        </div>
    );
}