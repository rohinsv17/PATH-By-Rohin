import PageShell from "@/components/PageShell";
import LinkButton from "@/components/LinkButton";
import ProgramCard from "@/components/ProgramCard";
import programs from "@/content/programs";

// Link to the code camp signup form
const signupLink = "https://forms.gle/pgK1LAcjggpwpeyJ6";

// Intro text split into paragraphs
const introParagraphs = [
    "I enjoy sharing what I've learned about programming with younger students who are interested in exploring Computer Science. I've hosted several virtual Python coding sessions for family friends, introducing students to programming fundamentals and helping them gain confidence through hands-on practice. I've also had the opportunity to teach C programming to freshmen in my Computer Science teacher's class, helping them understand foundational concepts and work through coding challenges.",
    "In addition to programming, I volunteer as an SAT tutor through Schoolhouse.world's Official SAT Tutoring program, in partnership with College Board. Through live, small-group sessions, I help students strengthen their problem-solving skills and prepare for the SAT while developing my own teaching and communication skills.",
    "I'm planning additional coding sessions over the coming months, including during winter break. If you're interested in joining a future camp, please fill out the interest form linked below to receive updates about upcoming sessions and registration.",
];

// Code Camps and Tutoring page with an intro and a card for each program
export default function CodeCamps() {
    return (
        <PageShell widthClass = "max-w-5xl">

            {/* Short intro and signup button */}
            <div className = "mb-16 flex flex-col items-center gap-4 text-center">
                <h1 className = "text-3xl font-semibold text-gray-900">
                    Code Camps & Tutoring
                </h1>

                {/* Indented paragraphs are left aligned, the title and button stay centered */}
                <div className = "flex max-w-2xl flex-col gap-3 text-left">
                    {introParagraphs.map((paragraph, index) => (
                        <p key = {index} className = "indent-8 leading-relaxed text-gray-600">
                            {paragraph}
                        </p>
                    ))}
                </div>

                {/* Signup button sits directly under the paragraphs */}
                <div className = "mt-2">
                    <LinkButton href = {signupLink}>
                        Sign Up for the Next Camp
                    </LinkButton>
                </div>
            </div>

            {/* Program list, one card per program */}
            <div className = "flex flex-col gap-8">
                {programs.map((program) => (
                    <ProgramCard key = {program.title} title = {program.title} description = {program.description} tags = {program.tags} images = {program.images} imageSide = {program.imageSide} bgClass = {program.bgClass} />
                ))}
            </div>
        </PageShell>
    );
}