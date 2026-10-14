"use client";
 
import { useEffect, useState } from "react";

// Social links
const socialLinks = [
    { href: "https://github.com/rohinsv17", label: "GitHub" },
    { href: "https://linkedin.com/in/rohin-vijay/", label: "LinkedIn" },
];

// Footer component across site
export default function Footer() {

    // Calculates current year to update copyright
    const currentYear = new Date().getFullYear();

    // Tracks whether the user has scrolled near the bottom of the page
    const [isVisible, setIsVisible] = useState(false);

    // Checks scroll position against total page height
    useEffect(() => {
        function handleScroll() {
            const scrolledToBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 10;
            setIsVisible(scrolledToBottom);
        }
 
        // Runs once on mount in case the page loads already scrolled
        handleScroll();
 
        window.addEventListener("scroll", handleScroll, { passive: true });
 
        // Removes the listener when the component unmounts
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
 
    // Renders nothing until the user is near the bottom
    if (!isVisible) {
        return null;
    }

    return (
        <footer className = "fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-[#EEEBF4]">
            <div className = "flex flex-col items-center gap-4 px-6 py-8 md:flex-row md:justify-between md:px-12">
 
                {/* Copyright line with dynamic year */}
                <p className = "text-sm text-gray-600">
                    {currentYear}, Rohin Vijay. All rights reserved.
                </p>
 
                {/* Social links that open in a new tab with rel for security */}
                <ul className = "flex gap-6">
                    {socialLinks.map((link) => (
                        <li key = {link.href}>
                            <a href = {link.href} target = "_blank" rel = "noopener noreferrer" className = "text-sm text-gray-600 hover:text-gray-900">
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
}