// Shape of a single camp or tutoring entry
export interface Program {
    title: string;
    description: string[];
    tags: string[];
    images: string[];
    imageSide: "left" | "right";
    bgClass: string;
}

// Programs shown as cards on the Code Camps & Tutoring page
const programs: Program[] = [
    {
        title: "Code & High School Advice Camps",
        description: [
            "I started hosting virtual coding camps for younger students interested in learning programming and exploring Computer Science. In my introductory Python sessions, I taught a small group of family friends the fundamentals of programming, including variables, data types, conditional statements, user input, and basic arithmetic operations. To help them apply what they learned, I guided them through building a basic calculator in Python, allowing them to see how individual programming concepts come together to create a working application. Alongside the coding lessons, I also shared advice from my own High School experience, covering topics such as choosing classes, exploring extracurricular activities, developing good study habits, and finding opportunities to pursue their interests. My goal was not only to introduce students to programming but also to help them feel more prepared and confident about navigating High School.",
            "I also had the opportunity to assist my Computer Science teacher in teaching C programming to his freshman class. During these sessions, I helped students understand foundational programming concepts, work through challenging assignments, and troubleshoot errors in their code. Rather than simply showing them the correct answers, I encouraged students to understand the reasoning behind their solutions and explore ways to take their assignments further than the basic requirements. This experience gave me a chance to return to the same Computer Science classroom where I began developing my own programming skills and share what I've learned with students who are just starting their journey. Teaching both Python and C has helped me become a better communicator and reinforced how much I enjoy making programming more approachable for others.",
        ],
        tags: ["Python", "Variables", "Functions", "Procedures", "Error Handling", "Ollama LLM Integration"],
        images: ["/pythonCamp2.png", "/pythonCamp3.png", "/pythonCamp1.png"],
        imageSide: "left",
        bgClass: "bg-[#F3F7FB]",
    },
    {
        title: "SAT Tutoring",
        description: [
            "I was selected by College Board to serve as a volunteer peer SAT tutor after scoring above the 90th percentile on the SAT. Through College Board's partnership with Schoolhouse.world, a nonprofit tutoring platform founded by Sal Khan, the founder of Khan Academy, I host Official SAT Tutoring bootcamps to help students strengthen their understanding of SAT concepts and prepare for the exam. Each bootcamp runs for four weeks, with two live sessions per week lasting approximately 75 minutes each, allowing me to work closely with a small group of students in an interactive learning environment.",
            "My tutoring sessions emphasize active participation, collaboration, and understanding concepts rather than simply memorizing answers. Students work through SAT-style questions, discuss different approaches to solving problems, and explain their reasoning during group discussions. I encourage students to ask questions, participate in problem-solving activities, and learn from one another's approaches. Practice tests and exercises help students gauge their current abilities, identify areas where they need improvement, and track their progress throughout the bootcamp. I use these insights to focus discussions on challenging concepts and help students develop more effective problem-solving strategies.",
            "Beyond reviewing SAT material, I also share test preparation strategies and advice from my own SAT experience, including how I approached practice tests, managed my study schedule, reviewed mistakes, and developed strategies for working under timed conditions. My goal is to help students not only improve their SAT readiness but also become more confident and independent in their learning. Tutoring has also been a meaningful experience for me, allowing me to strengthen my communication and mentoring skills while helping other students work toward their academic goals.",
        ],
        tags: ["Reading & Writing", "Math", "Test Tips", "Time Management", "Practice Tests"],
        images: ["/satCamp1.png", "/satCamp3.png", "/satCamp2.png"],
        imageSide: "right",
        bgClass: "bg-[#FDF3EA]",
    },
];

export default programs;