import Link from "next/link";
import BrandIcon from "@/components/BrandIcon";

// Visual styles for each button variant
const variantClasses = {
    primary: "bg-[#09223E] text-white hover:bg-[#DC701B]",
    secondary: "border border-[#09223E] text-[#09223E] hover:border-[#DC701B] hover:text-[#DC701B]",
};

// Rounded link button with an optional icon, uses next/link for internal routes and a plain anchor for external links
export default function LinkButton({ href, children, variant = "primary", icon }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary"; icon?: string }) {
    const classes = `inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-colors ${variantClasses[variant]}`;

    // Internal routes start with a slash
    if (href.startsWith("/")) {
        return (
            <Link href = {href} className = {classes}>
                {icon && <BrandIcon src = {icon} />}
                {children}
            </Link>
        );
    }

    return (
        <a href = {href} target = "_blank" rel = "noopener noreferrer" className = {classes}>
            {icon && <BrandIcon src = {icon} />}
            {children}
        </a>
    );
}