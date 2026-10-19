"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Navbar links for each route
const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/advice", label: "High School Advice" },
    { href: "/camps", label: "Code Camps & Tutoring" },
    { href: "/chatbot", label: "Ask PATH" },
];

// Navbar component across site
export default function Navbar() {
 
    // Tracks if mobile menu is open
    const [isOpen, setIsOpen] = useState(false);
 
    return (
        <header className = "relative z-20 h-[72px] bg-[#EEEBF4]">
            <div className = "flex h-full items-center justify-between px-6 md:px-12">
 
                {/* Logo links to home */}
                <Link href = "/">
                    <Image src = "/pathLogo.svg" alt = "PATH by Rohin" width = {140} height = {40} priority />
                </Link>
 
                {/* Desktop nav links */}
                <ul className = "hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <li key = {link.href}>
                            <Link href = {link.href} className = "text-sm font-medium text-[#09223E] hover:text-[#DC701B] hover:underline">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
 
                {/* Menu toggle button for mobile */}
                <button onClick = {() => setIsOpen(!isOpen)} className = "text-sm font-medium text-[#09223E] md:hidden">
                    {isOpen ? "Close" : "Menu"}
                </button>
            </div>
 
            {/* Mobile menu with nav links and solid background so it stays legible over any page content */}
            {isOpen && (
                <ul className = "absolute inset-x-0 top-full flex flex-col gap-4 bg-[#EEEBF4] px-6 py-4 shadow-sm md:hidden">
                    {navLinks.map((link) => (
                        <li key = {link.href}>
                            <Link href = {link.href} onClick = {() => setIsOpen(false)} className = "text-sm font-medium text-[#09223E] hover:text-[#DC701B] hover:underline">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </header>
    );
}