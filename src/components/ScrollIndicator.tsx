"use client";

import { ArrowDown } from "lucide-react";

// Button scrolls to the following section
export default function ScrollIndicator({ targetId }: { targetId: string }) {

    // Scrolls to the target section
    function handleClick() {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <button onClick = {handleClick} aria-label = "Scroll to next section" className = "absolute bottom-8 left-1/2 flex h-12 w-12 -translate-x-1/2 animate-bounce items-center justify-center rounded-full bg-[#09223E] text-white transition-colors hover:animate-none hover:bg-[#DC701B]">
            <ArrowDown className = "h-6 w-6" />
        </button>
    );
}