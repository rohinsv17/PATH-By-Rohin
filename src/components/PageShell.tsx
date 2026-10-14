import Image from "next/image";

// Shared wrapper for inner pages adds the background image and standard content spacing
export default function PageShell({ children, widthClass = "max-w-3xl" }: { children: React.ReactNode; widthClass?: string }) {
    return (
        <>
 
            {/* Background image stays fixed behind the page and fills the full viewport */}
            <div className = "pointer-events-none fixed inset-0 z-0">
                <Image src = "/transparentBackground.png" alt = "" fill priority sizes = "100vw" className = "object-cover object-top" />
            </div>
 
            {/* Page content sits above the image and scrolls over it */}
            <div className = {`relative z-10 mx-auto px-6 pb-32 pt-12 ${widthClass}`}>
                {children}
            </div>
        </>
    );
}