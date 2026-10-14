import Link from "next/link";

// Visual styles for each button variant
const variantClasses = {
    primary: "bg-[#09223E] text-white hover:bg-[#DC701B]",
    secondary: "border border-[#09223E] text-[#09223E] hover:border-[#DC701B] hover:text-[#DC701B]",
};

// Rounded link button, uses next/link for internal routes and a plain anchor for external links
export default function LinkButton({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary" }) {
    const classes = `inline-block rounded-full px-6 py-2.5 text-sm font-medium transition-colors ${variantClasses[variant]}`;

    // Internal routes start with a slash
    if (href.startsWith("/")) {
        return (
            <Link href = {href} className = {classes}>
                {children}
            </Link>
        );
    }

    return (
        <a href = {href} target = "_blank" rel = "noopener noreferrer" className = {classes}>
            {children}
        </a>
    );
}