import PageShell from "@/components/PageShell";
import LinkButton from "@/components/LinkButton";
import ProjectCard from "@/components/ProjectCard";
import projects from "@/content/projects";

// Contact links shown at the top of the page
const contactLinks = [
    { href: "https://github.com/rohinsv17", label: "GitHub", icon: "/githubLogo.svg" },
    { href: "https://linkedin.com/in/rohin-vijay/", label: "LinkedIn", icon: "/linkedinLogo.svg" },
];

// Bio text split into paragraphs
const bioParagraphs = [
    "I'm a High School senior passionate about Computer Science, Artificial Intelligence, and Machine Learning, driven by curiosity and a love for problem-solving. I enjoy exploring new ideas through building and research, especially when a challenge pushes me to learn something I don't already know.",
    "Whether I'm investigating a question or turning an idea into something useful, I enjoy the process of learning, experimenting, and improving along the way. I'm excited to keep exploring where my curiosity takes me and how I can use technology to make a meaningful impact for the community.",
];

// About page with a short bio and a list of projects
export default function About() {
    return (
        <PageShell widthClass = "max-w-4xl">
 
            {/* Short intro and contact links */}
            <div className = "mb-16 flex flex-col items-center gap-4 text-center">
                <h1 className = "text-3xl font-semibold text-gray-900">
                    About Me
                </h1>

                {/* Indented paragraphs are left aligned, the title and buttons stay centered */}
                <div className = "flex max-w-2xl flex-col gap-3 text-left">
                    {bioParagraphs.map((paragraph, index) => (
                        <p key = {index} className = "indent-8 leading-relaxed text-gray-600">
                            {paragraph}
                        </p>
                    ))}
                </div>
                <ul className = "mt-2 flex gap-4">
                    {contactLinks.map((link) => (
                        <li key = {link.href}>
                            <LinkButton href = {link.href} icon = {link.icon}>
                                {link.label}
                            </LinkButton>
                        </li>
                    ))}
                </ul>
            </div>
 
            {/* Project list, one card per project */}
            <div className = "flex flex-col gap-8">
                {projects.map((project) => (
                    <ProjectCard key = {project.title} title = {project.title} description = {project.description} tags = {project.tags} link = {project.link} demoLink = {project.demoLink} images = {project.images} />
                ))}
            </div>
        </PageShell>
    );
}