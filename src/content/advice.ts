// A segment of text within a paragraph or a definition
export type Segment =
    | { kind: "text"; value: string }
    | { kind: "bold"; value: string }
    | { kind: "italic"; value: string }
    | { kind: "link"; value: string; url: string }
    | { kind: "term"; value: string; definition: Segment[] };

// A block within a section
export type Block =
    | { kind: "paragraph"; segments: Segment[] }
    | { kind: "heading"; value: string }
    | { kind: "list"; items: string[] }
    | { kind: "advice"; value: string }
    | { kind: "image" };

// One accordion section
export interface AdviceSection {
    id: string;
    number: string;
    title: string;
    description: string;
    accentColor: string;
    blocks: Block[];
}

// Intro text split into paragraphs
export const introText = [
    "Based on my experience, High School is an opportunity to discover new interests, challenge yourself academically, and develop skills that extend beyond the classroom. While grades and test scores are important, colleges also want to understand how you've used the opportunities available to you, whether through extracurricular activities, leadership, personal projects, or contributing to your community.",
    "Something I've learned throughout High School is that there isn't one perfect formula for getting into a competitive college. Everyone has different interests, strengths, and opportunities, and what works for one student may not work for another.",
    "My goal here is to share what I've learned while navigating these decisions myself, including things I wish I had understood earlier.",
];

// Accordion sections, in the order they appear in the source document
export const adviceSections: AdviceSection[] = [
    {
        id: "grades",
        number: "01",
        title: "Grades & GPA",
        description: "Academic performance, weighted/unweighted GPA, recovering from setbacks",
        accentColor: "bg-[#DC701B]",
        blocks: [
            { kind: "paragraph", segments: [{ kind: "text", value: "Grades are one of the most important parts of your academic profile because they demonstrate how consistently you've performed throughout High School." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "Unless you've taken courses in Middle School that provide High School credit, your Middle School grades generally aren't considered as part of your High School academic record. However, I wouldn't go as far as saying Freshman grades don't matter. Colleges typically review your entire High School transcript, including 9th grade, although some institutions evaluate grades differently." }] },
            {
                kind: "paragraph",
                segments: [
                    { kind: "text", value: "What I mean by this is that " },
                    { kind: "bold", value: "a few disappointing grades don't necessarily define your entire academic record" },
                    { kind: "text", value: ". If you struggle during one semester but improve significantly afterward, that improvement can demonstrate academic growth and your ability to adjust to more challenging coursework." },
                ],
            },
            {
                kind: "paragraph",
                segments: [
                    { kind: "text", value: "Another important distinction is between " },
                    {
                        kind: "term",
                        value: "weighted and unweighted GPA",
                        definition: [
                            { kind: "text", value: "An unweighted GPA measures academic performance without adding extra points for advanced courses. A weighted GPA may award additional points for Honors, AP, IB, or Dual Enrollment courses. The calculation and scale depend on the school. Colleges may also recalculate GPA using their own methods." },
                        ],
                    },
                    { kind: "text", value: "." },
                ],
            },
            { kind: "paragraph", segments: [{ kind: "text", value: "An unweighted GPA reflects your academic performance without additional points for advanced courses. A weighted GPA may include additional points for Honors, Advanced Placement, International Baccalaureate, or other qualifying advanced classes, depending on your school's grading system." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "For example, a student with a 4.0 unweighted GPA might have taken mostly standard-level classes, while another student with a 3.7 GPA might have consistently challenged themselves with advanced coursework. Colleges consider both academic performance and the difficulty of the courses taken, so GPA alone doesn't tell the entire story." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "That being said, maintaining the highest grades you reasonably can is still important. I wouldn't recommend sacrificing your grades just to take more advanced classes, but I also wouldn't recommend avoiding challenging classes simply to protect a perfect GPA." }] },
            { kind: "advice", value: "Focus on building consistent study habits, challenge yourself appropriately, and don't let one difficult semester discourage you. What matters is how you respond and continue improving." },
            { kind: "heading", value: "If You Have a Rough Semester" },
            {
                kind: "paragraph",
                segments: [
                    { kind: "text", value: "If your grades begin slipping, the first thing I would recommend is identifying " },
                    { kind: "italic", value: "why" },
                    { kind: "text", value: "." },
                ],
            },
            { kind: "paragraph", segments: [{ kind: "text", value: "Are you struggling to understand the material? Are you taking on too many responsibilities? Are you studying inefficiently or leaving assignments until the last minute?" }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "Once you understand the problem, you can start making changes. Talk to your teachers, attend tutoring or help sessions, reorganize your schedule, and identify which study methods actually help you learn." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "For me, one of the most important lessons has been recognizing that spending more time studying doesn't automatically mean you're studying more effectively." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "Instead of simply rereading notes, try practicing problems, explaining concepts without looking at your materials, and reviewing difficult topics over multiple days." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "A rough semester isn't something you can erase, but it is something you can learn from." }] },
        ],
    },
    {
        id: "course-rigor",
        number: "02",
        title: "Course Choice & Rigor",
        description: "Honors, AP, IB, Dual Enrollment, summer courses",
        accentColor: "bg-blue-600",
        blocks: [
            { kind: "paragraph", segments: [{ kind: "text", value: "While the courses offered differ from school to school, most High Schools provide several levels of academic difficulty, such as On-Level, Honors, Accelerated, Advanced Placement, and International Baccalaureate." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "The following chart demonstrates a simplified progression of the course levels offered at my school." }] },
            { kind: "image" },
            {
                kind: "paragraph",
                segments: [
                    { kind: "text", value: "One of the biggest things colleges look for academically is " },
                    {
                        kind: "term",
                        value: "course rigor",
                        definition: [
                            { kind: "text", value: "Course rigor refers to the academic challenge and complexity of a student's coursework. Colleges may consider the level of courses taken, their prerequisites, the student's performance, and the advanced courses available at the school." },
                        ],
                    },
                    { kind: "text", value: ", or how much you've challenged yourself through the classes available to you." },
                ],
            },
            {
                kind: "paragraph",
                segments: [
                    { kind: "text", value: "However, colleges don't simply count how many AP classes you've taken. They also evaluate your coursework based on the " },
                    {
                        kind: "term",
                        value: "opportunities available at your school",
                        definition: [
                            { kind: "text", value: "Colleges may evaluate academic choices in the context of the courses and programs a student's high school actually offers. Students are not generally expected to take advanced classes that are unavailable to them." },
                        ],
                    },
                    { kind: "text", value: "." },
                ],
            },
            { kind: "paragraph", segments: [{ kind: "text", value: "For instance, if your school offers only a few AP courses, colleges generally won't expect you to take classes that weren't available. On the other hand, if your school offers a wide range of advanced classes, your course selections can help demonstrate how you've challenged yourself relative to those opportunities." }] },
            { kind: "heading", value: "Choosing Between On-Level, Honors & AP" },
            { kind: "paragraph", segments: [{ kind: "text", value: "My recommendation is to gradually increase your course rigor as you become more comfortable with your academic workload." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "Honors classes can be a good transition between On-Level and AP coursework, depending on the subject and your school's curriculum." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "AP classes introduce college-level material and typically involve more demanding assignments, independent studying, and preparation for an AP exam." }] },
            {
                kind: "paragraph",
                segments: [
                    { kind: "text", value: "However, " },
                    { kind: "bold", value: "taking an AP class just because it has \"AP\" in the name isn't necessarily the best decision" },
                    { kind: "text", value: "." },
                ],
            },
            { kind: "paragraph", segments: [{ kind: "text", value: "Consider how interested you are in the subject, how well you've performed in prerequisite classes, and how much time you can realistically dedicate to the course." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "For subjects closely related to your intended major, I would generally recommend challenging yourself when you're academically prepared." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "For example, because I'm interested in Computer Science and Machine Learning, I prioritized advanced math and Computer Science courses throughout High School." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "That doesn't mean someone interested in medicine, business, or the humanities should follow the same schedule. Your course choices should reflect your own interests and goals." }] },
            { kind: "heading", value: "Dual Enrollment" },
            {
                kind: "paragraph",
                segments: [
                    {
                        kind: "term",
                        value: "Dual Enrollment",
                        definition: [
                            { kind: "text", value: "A program allowing eligible high school students to take college-level courses, potentially earning both high school and college credit. Eligibility, costs, course availability, and credit transfer policies vary." },
                        ],
                    },
                    { kind: "text", value: " allows eligible High School students to take college courses while completing their High School education." },
                ],
            },
            { kind: "paragraph", segments: [{ kind: "text", value: "Depending on the program, these courses may be offered online, at a college campus, or through a partnership with your school." }] },
            {
                kind: "paragraph",
                segments: [
                    { kind: "text", value: "One thing I would emphasize is that " },
                    { kind: "bold", value: "Dual Enrollment courses aren't automatically easier or less rigorous than AP classes" },
                    { kind: "text", value: "." },
                ],
            },
            { kind: "paragraph", segments: [{ kind: "text", value: "Their difficulty depends on the institution, instructor, subject, and course content. Some provide an excellent opportunity to explore material unavailable at your High School." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "For example, I'm taking Georgia Tech Dual Enrollment math to study Linear Algebra and Multivariable Calculus, subjects that extend beyond much of the standard High School math sequence." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "Before choosing Dual Enrollment, I recommend checking how the credits apply toward graduation, whether colleges will accept them, and whether the course fits your longer-term academic goals." }] },
            { kind: "heading", value: "Summer Courses & Graduation Requirements" },
            {
                kind: "paragraph",
                segments: [
                    { kind: "text", value: "Another thing to consider is your school's " },
                    {
                        kind: "term",
                        value: "graduation credit requirements",
                        definition: [
                            { kind: "text", value: "The number and types of course credits students must complete to graduate from high school. Requirements vary by state, school district, and sometimes graduation cohort." },
                        ],
                    },
                    { kind: "text", value: "." },
                ],
            },
            { kind: "paragraph", segments: [{ kind: "text", value: "Most High Schools require students to complete a certain number of credits across subjects such as english, math, science, social studies, and electives." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "Some schools also offer Summer courses that can help students complete graduation requirements or make room for other classes during the regular school year." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "However, I would be careful about accelerating through foundational subjects such as math or world languages simply to move ahead." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "These subjects build upon concepts from previous courses, and rushing through them can create gaps that make future classes more difficult." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "If your school permits it, Summer courses may be useful for certain graduation requirements, such as Health, but I would discuss your plan with a counselor before making that decision." }] },
            { kind: "advice", value: "Choose a course schedule that demonstrates academic challenge while allowing you to genuinely learn the material and maintain balance with your other commitments." },
        ],
    },
    {
        id: "extracurriculars",
        number: "03",
        title: "Extracurriculars & Exploring Interests",
        description: "Clubs, projects, internships, research, depth vs. breadth",
        accentColor: "bg-amber-500",
        blocks: [
            { kind: "paragraph", segments: [{ kind: "text", value: "Extracurricular activities are something I would recommend exploring as early as possible, especially during Freshman and Sophomore year when you may have more flexibility to try different things." }] },
            {
                kind: "paragraph",
                segments: [
                    { kind: "text", value: "What defines an " },
                    {
                        kind: "term",
                        value: "extracurricular activity",
                        definition: [
                            { kind: "text", value: "An activity outside regular academic coursework, including clubs, sports, jobs, volunteering, research, creative projects, family responsibilities, and independent initiatives." },
                        ],
                    },
                    { kind: "text", value: " is actually very broad." },
                ],
            },
            { kind: "paragraph", segments: [{ kind: "text", value: "It can include school clubs, volunteering, athletics, music, employment, independent projects, research, internships, family responsibilities, and many other activities outside your regular coursework." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "For someone interested in Computer Science, examples might include developing applications, building websites, participating in programming competitions, conducting AI research, or volunteering to help others with technology." }] },
            {
                kind: "paragraph",
                segments: [
                    { kind: "text", value: "However, " },
                    { kind: "bold", value: "you don't need to be interested in Computer Science to build meaningful extracurricular experiences" },
                    { kind: "text", value: "." },
                ],
            },
            { kind: "paragraph", segments: [{ kind: "text", value: "A student interested in medicine might volunteer in community health programs or explore biological research. Someone interested in business might organize a school fundraiser or develop a small business. A student interested in writing might contribute to a school publication or start an independent writing project." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "The important part is finding something that genuinely interests you." }] },
            { kind: "heading", value: "Depth vs. Breadth" },
            { kind: "paragraph", segments: [{ kind: "text", value: "One mistake I would try to avoid is joining as many clubs as possible simply to have a long list of activities." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "I think it's much more valuable to explore different interests early on, then gradually focus on the activities you genuinely enjoy and want to continue pursuing." }] },
            {
                kind: "paragraph",
                segments: [
                    { kind: "text", value: "This is the difference between " },
                    {
                        kind: "term",
                        value: "depth and breadth",
                        definition: [
                            { kind: "text", value: "Breadth means exploring a variety of interests and activities. Depth means developing sustained involvement, responsibility, skill, or impact within selected activities. A strong experience can include both." },
                        ],
                    },
                    { kind: "text", value: "." },
                ],
            },
            { kind: "paragraph", segments: [{ kind: "text", value: "Breadth means exploring several different activities or interests. Depth means developing meaningful involvement, skills, responsibility, or accomplishments within those activities over time." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "Both have value, but joining ten clubs without contributing much to any of them may not communicate as much as consistently participating in a few organizations where you've made a meaningful contribution." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "For example, I've remained involved in Gladiator Technology, where I help support technology operations at my school. Over time, that commitment allowed me to take on greater responsibilities and eventually become Vice President." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "That progression is something I think students should look for in their own activities." }] },
            { kind: "heading", value: "Finding Opportunities Outside School" },
            { kind: "paragraph", segments: [{ kind: "text", value: "I would also encourage students to look beyond the clubs offered at their High School." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "Some of my most meaningful experiences came from pursuing interests independently, including AI/ML projects, research, and an internship." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "You don't necessarily need a formal internship to begin building experience in a subject." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "If you're interested in programming, try creating an application that solves a problem you or someone you know experiences." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "If you're interested in research, begin by learning about a topic, reading existing work, and identifying a question you want to investigate." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "If you're interested in business, consider developing a small product or organizing a project that addresses a need in your community." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "These experiences can help you discover whether an interest is something you genuinely want to pursue further." }] },
            { kind: "advice", value: "Explore early, find activities that interest you, and gradually work toward making meaningful contributions rather than simply collecting memberships." },
        ],
    },
    {
        id: "leadership",
        number: "04",
        title: "Leadership & Community Involvement",
        description: "Officer roles, independent initiatives, volunteering, impact",
        accentColor: "bg-purple-600",
        blocks: [
            { kind: "paragraph", segments: [{ kind: "text", value: "Leadership is another important part of High School, but I think students sometimes misunderstand what it means." }] },
            {
                kind: "paragraph",
                segments: [
                    { kind: "text", value: "Being President or Vice President of a club can demonstrate leadership, but " },
                    { kind: "bold", value: "holding a title alone doesn't necessarily mean you've made a meaningful contribution" },
                    { kind: "text", value: "." },
                ],
            },
            { kind: "paragraph", segments: [{ kind: "text", value: "Leadership is also about taking responsibility, organizing people, solving problems, and helping an organization improve." }] },
            { kind: "heading", value: "Earning Leadership Roles" },
            { kind: "paragraph", segments: [{ kind: "text", value: "If you join a club that interests you, I would recommend becoming an active member before immediately focusing on obtaining an officer position." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "Participate in events, volunteer for responsibilities, communicate with the club's officers and sponsors, and look for opportunities to contribute." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "Over time, this helps you understand how the organization works and builds relationships with the people involved." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "If leadership positions become available, apply for them when you feel prepared to take on the additional responsibility." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "From my experience, becoming involved consistently is one of the best ways to demonstrate that you genuinely care about an organization." }] },
            { kind: "heading", value: "Starting Your Own Initiative" },
            { kind: "paragraph", segments: [{ kind: "text", value: "Another option is creating something independently." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "This could mean starting a club, organizing a tutoring program, building a community resource, or developing a project that addresses a problem you've noticed." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "For example, I created PATH by Rohin because I wanted to share lessons from my High School experience with younger students who might be navigating similar decisions." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "The website also allows me to apply my programming and AI interests toward something that could be useful to others." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "However, I wouldn't recommend starting a club or initiative solely because you think the word \"Founder\" will look impressive on a college application." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "Start something because you see a need or have an idea you're genuinely interested in pursuing." }] },
            { kind: "heading", value: "Volunteering & Community Impact" },
            { kind: "paragraph", segments: [{ kind: "text", value: "I believe volunteering is something every student should consider, regardless of their intended major." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "There are opportunities through organizations such as National Beta Club, local nonprofits, libraries, schools, community events, and independent service projects." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "I would especially recommend finding opportunities where you can contribute skills you already have." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "For example, my involvement in Gladiator Technology allows me to use my technical knowledge to help students and staff at my school." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "I've also enjoyed teaching programming and tutoring SAT Math because those experiences allow me to share what I've learned with other students." }] },
            {
                kind: "paragraph",
                segments: [
                    { kind: "text", value: "When thinking about " },
                    {
                        kind: "term",
                        value: "community impact",
                        definition: [
                            { kind: "text", value: "The contribution an activity makes to other people or a community. Impact can involve solving a problem, providing a service, improving access, helping others learn, or sustaining a useful initiative." },
                        ],
                    },
                    { kind: "text", value: ", don't focus only on how many volunteer hours you've accumulated." },
                ],
            },
            { kind: "paragraph", segments: [{ kind: "text", value: "Consider who benefited from your work, what responsibilities you took on, and whether your involvement created something useful." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "A single event can still be meaningful, but consistent involvement often gives you more opportunities to develop relationships, understand problems, and contribute over time." }] },
            { kind: "advice", value: "Look for opportunities to become someone others can depend on, whether through a formal leadership position, independent project, or consistent volunteering." },
        ],
    },
    {
        id: "sat-act",
        number: "05",
        title: "SAT & ACT Preparation",
        description: "Testing timelines, study strategies, scores, superscoring",
        accentColor: "bg-emerald-600",
        blocks: [
            {
                kind: "paragraph",
                segments: [
                    { kind: "text", value: "Although some colleges offer " },
                    {
                        kind: "term",
                        value: "test-optional admissions",
                        definition: [
                            { kind: "text", value: "An admissions policy under which applicants may choose whether to submit SAT or ACT scores. Policies vary by institution and admission cycle, and test-optional does not necessarily mean scores are ignored when submitted." },
                        ],
                    },
                    { kind: "text", value: ", others require standardized test scores. These policies vary by institution and application year, so I recommend checking each college's official admissions website before deciding whether to submit scores." },
                ],
            },
            { kind: "paragraph", segments: [{ kind: "text", value: "For colleges that consider standardized testing, the SAT and ACT can provide another way to demonstrate academic preparation." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "Personally, I've only taken the SAT, so most of my recommendations are based on my experience preparing for that exam." }] },
            { kind: "heading", value: "When Should You Start Preparing?" },
            { kind: "paragraph", segments: [{ kind: "text", value: "I believe it's helpful to become familiar with the SAT or ACT earlier rather than waiting until Senior year." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "However, that doesn't mean you need to begin intensive test preparation in 9th grade." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "Freshman and Sophomore year can be useful for strengthening foundational math, reading, grammar, and problem-solving skills." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "By Sophomore or early Junior year, I would recommend taking a diagnostic practice test to understand your strengths and weaknesses." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "This can help you decide which exam suits you better and how much preparation you may need." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "Ideally, I would aim to complete most standardized testing during Junior year or the Summer before Senior year, leaving time for a retake if necessary." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "That way, you aren't trying to balance your first SAT attempt with college applications and demanding Senior-year coursework." }] },
            { kind: "heading", value: "What SAT Score Should You Aim For?" },
            {
                kind: "paragraph",
                segments: [
                    { kind: "text", value: "One thing I would emphasize is that " },
                    { kind: "bold", value: "there isn't a universal SAT score that guarantees admission to a competitive college" },
                    { kind: "text", value: "." },
                ],
            },
            { kind: "paragraph", segments: [{ kind: "text", value: "Personally, I think aiming for the 1400s or 1500s can be a useful goal for students considering highly selective colleges, depending on their academic profile and target schools." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "However, the score you should aim for depends on the colleges you're considering and their admitted-student score ranges." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "I also wouldn't assume that every score above 1500 is viewed identically." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "A difference between two scores may matter more at some institutions than others, and admissions decisions involve much more than standardized testing alone." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "For STEM-related majors, strong math preparation can be particularly relevant, although colleges evaluate applicants using their own criteria." }] },
            { kind: "heading", value: "How I Recommend Studying" },
            { kind: "paragraph", segments: [{ kind: "text", value: "I would begin by taking an official practice test under realistic conditions." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "Afterward, review your mistakes rather than immediately taking another full test." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "Try to identify whether each mistake came from:" }] },
            {
                kind: "list",
                items: [
                    "Not understanding the underlying concept.",
                    "Misreading the question.",
                    "Running out of time.",
                    "Making a calculation or careless error.",
                ],
            },
            { kind: "paragraph", segments: [{ kind: "text", value: "Once you identify patterns, spend more time practicing those specific areas." }] },
            {
                kind: "paragraph",
                segments: [
                    { kind: "text", value: "For math, I recommend making sure you understand " },
                    { kind: "italic", value: "why" },
                    { kind: "text", value: " a solution works instead of memorizing steps for a particular type of question." },
                ],
            },
            { kind: "paragraph", segments: [{ kind: "text", value: "For Reading and Writing, focus on understanding the reasoning behind correct answers and recognizing the types of questions you consistently miss." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "I also recommend spacing practice across multiple weeks rather than trying to complete all your preparation in a short period." }] },
            { kind: "heading", value: "Retakes & Superscoring" },
            {
                kind: "paragraph",
                segments: [
                    { kind: "text", value: "Some colleges use " },
                    {
                        kind: "term",
                        value: "superscoring",
                        definition: [
                            { kind: "text", value: "A testing policy in which a college considers the highest eligible section scores across multiple test dates. Not every college superscores, and reporting requirements differ." },
                        ],
                    },
                    { kind: "text", value: ", which allows them to consider your highest section scores across multiple test dates." },
                ],
            },
            { kind: "paragraph", segments: [{ kind: "text", value: "For example, if you score higher in Math on one SAT attempt and higher in Reading and Writing on another, a college that superscores may combine those section scores." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "However, not every college follows the same testing policy." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "Before deciding how many times to take an exam, check whether your target colleges superscore, require all scores, or have other reporting rules." }] },
            { kind: "advice", value: "Prepare consistently, focus on understanding your mistakes, and try to complete testing early enough that you have flexibility during Senior year." },
        ],
    },
    {
        id: "balance",
        number: "06",
        title: "Balance & Time Management",
        description: "Study habits, schedules, burnout, maintaining perspective",
        accentColor: "bg-rose-600",
        blocks: [
            { kind: "paragraph", segments: [{ kind: "text", value: "Something I wish I had understood earlier is that building a strong High School experience isn't just about doing more." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "It's about learning how to manage your responsibilities while still having enough time to genuinely enjoy what you're doing." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "As you begin taking more challenging classes, participating in clubs, pursuing leadership positions, and working on independent projects, your schedule can become demanding." }] },
            { kind: "heading", value: "Managing Your Time" },
            { kind: "paragraph", segments: [{ kind: "text", value: "I recommend keeping track of major assignments, exams, meetings, and deadlines in a calendar or planner." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "At the beginning of each week, look at what's coming up and identify the tasks that require the most preparation." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "For larger assignments or projects, break the work into smaller steps instead of leaving everything until the deadline." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "One strategy I've found important is recognizing the difference between spending time on something and making meaningful progress." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "For example, spending several hours rereading material may be less effective than spending a shorter period actively practicing difficult concepts." }] },
            { kind: "heading", value: "Avoiding Burnout" },
            { kind: "paragraph", segments: [{ kind: "text", value: "I would also recommend being realistic about how many activities you can manage." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "Taking challenging classes, participating in multiple organizations, and pursuing outside opportunities can be rewarding, but there is a point where adding more commitments may reduce the quality of everything you're doing." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "Make time for sleep, exercise, friends, family, and interests that aren't connected to college applications." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "If your schedule becomes overwhelming, it's okay to reconsider your commitments or ask for help." }] },
            { kind: "heading", value: "Remember That Your Path Is Your Own" },
            { kind: "paragraph", segments: [{ kind: "text", value: "It's easy to compare yourself with students who seem to be taking more AP classes, earning more awards, or participating in more activities." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "However, students have different interests, responsibilities, and opportunities." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "I wouldn't recommend building your High School experience around trying to copy someone else's accomplishments." }] },
            { kind: "paragraph", segments: [{ kind: "text", value: "Instead, focus on finding a balance between challenging yourself, exploring your interests, contributing to your community, and maintaining your wellbeing." }] },
            { kind: "advice", value: "High School should prepare you for college, but it should also be a time when you discover what you enjoy, develop meaningful relationships, and grow as a person." },
        ],
    },
];