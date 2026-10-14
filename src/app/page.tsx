import Image from "next/image"
import LinkButton from "@/components/LinkButton";
import ScrollIndicator from "@/components/ScrollIndicator";

const heroImageSrc = "/heroBackground.png";

// Preview sections linking to the other main pages
const sections = [
    {
        href: "/about",
        title: "About Me",
        description: "My background, portfolio, and the projects I have built.",
        image: "/aboutScrollImage.png"
    },
    {
        href: "/advice",
        title: "High School Advice",
        description: "Lessons and tips for navigating high school well.",
        image: "/adviceScrollImage.png"
    },
    {
        href: "/camps",
        title: "Code Camps & Tutoring",
        description: "Recordings and info from the code camps I host.",
        image: "/codeScrollImage.jpg"
    },
    {
        href: "/chatbot",
        title: "Ask PATH",
        description: "Ask questions about high school and get instant answers.",
        image: "/chatbotScrollImage.png"

    },
];

// Homepage with a hero section and sections for each page route
export default function Home() {
    return (
        <>
            {/* Hero section with a full width background image */}
            <section className = "relative flex h-[calc(100dvh-72px)] scroll-mt-[72px] snap-start items-center px-6 pb-24 md:px-12 bg-white">
 
                {/* Background image fills the section and scales with the viewport width */}
                <Image src = {heroImageSrc} alt = "" fill priority sizes = "100vw" className = "object-cover" />
 
                {/* Hero text sits above the image */}
                <div className = "relative z-10 w-full">
                    <h1 className = "text-4xl font-bold tracking-tight md:text-6xl">
                        <span className = "block text-[#09223E]">Find your Direction.</span>
                        <span className = "mt-2 block text-[#FFFFFF]">Build your Path.</span>
                    </h1>
                    <p className = "mt-4 max-w-xl text-[#C5CAEC]">
                        A student-to-student guide to navigating academics, extracurriculars, leadership, test prep, and opportunities from middle school through college applications.
                    </p>
                </div>
 
                {/* Scroll cue, scrolls to first preview section then hides itself */}
                <ScrollIndicator targetId = "first-section" />
            </section>
 
            {/* One full screen section per other page, image and text swap sides each time */}
            {sections.map((section, index) => (
                <section key = {section.href} id = {index === 0 ? "first-section" : undefined} className = {`flex h-dvh snap-start flex-col bg-white ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
 
                    {/* Image half, fills exactly half of the section from top to bottom */}
                    <div className = "relative h-1/2 w-full md:h-full md:w-1/2">
                        <Image src = {section.image} alt = "" fill sizes = "(min-width: 768px) 50vw, 100vw" className = "object-cover" />
                    </div>
 
                    {/* Text half, title, blurb, and button centered within its half */}
                    <div className = "flex h-1/2 w-full flex-col items-center justify-center px-8 text-center md:h-full md:w-1/2">
                        <h2 className = "text-3xl font-semibold text-[#09223E]">
                            {section.title}
                        </h2>
                        <p className = "mt-4 max-w-md text-slate-600">
                            {section.description}
                        </p>
                        <div className = "mt-6">
                            <LinkButton href = {section.href}>
                                Explore {section.title}
                            </LinkButton>
                        </div>
                    </div>
                </section>
            ))}
        </>
    );
}