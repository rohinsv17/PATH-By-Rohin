"use client";

import Image from "next/image";

// Button scrolls to the following section
export default function ScrollIndicator({ targetId }: { targetId: string }) {

    // Scrolls to the target section
    function handleClick() {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <button onClick = {handleClick} className = "absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <Image src = "/window.svg" alt = "Scroll to next section" width = {24} height = {24}/>
        </button>
    );
}