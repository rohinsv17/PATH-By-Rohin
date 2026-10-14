// A segment of text within a paragraph or a definition
export type Segment =
    | { kind: "text"; value: string }
    | { kind: "link"; value: string; url: string }
    | { kind: "term"; value: string; definition: Segment[] };

// A block within a section, either a paragraph or an image placeholder
export type Block =
    | { kind: "paragraph"; segments: Segment[] }
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

// Intro paragraph shown above the accordion
export const introText =
    "Based on my experience, High School serves as an opportunity to gain new experience, find your future interests, and demonstrate your skills and admirable qualities through in-school and extra-curricular activities. Top colleges, in STEM or in general, look for students that are \"all-rounders\" - meaning that they have used their opportunities to not just succeed academically, but also explore and commit to developing leadership, following passions, and making a difference in their local communities. Here's how this breaks down in-depth:";

// Accordion sections, in the order they appear in the source document
export const adviceSections: AdviceSection[] = [
    {
        id: "grades",
        number: "01",
        title: "Grades",
        description: "Build a strong academic foundation.",
        accentColor: "bg-[#DC701B]",
        blocks: [
            {
                kind: "paragraph",
                segments: [
                    { kind: "text", value: "Unless you have taken advanced courses at a High School level in Middle School (e.g. Algebra 1, Algebra 2, courses that give High School credit), your grades from Middle School, and even Freshman year aren't given serious consideration, with the former not being part of your High School " },
                    {
                        kind: "term",
                        value: "transcript",
                        definition: [
                            { kind: "text", value: "A document that High Schools provide that lists the classes you have taken in High School (or Middle School) that provide High School Credit, as well as your grades and overall Grade Point Average (GPA). For instance, my school lists our GPA's on a 100-point scale, while others may use a 4.0 or 5.0 scale." },
                        ],
                    },
                    { kind: "text", value: " at all." },
                ],
            },
            {
                kind: "paragraph",
                segments: [
                    { kind: "text", value: "What I mean by this is that even if a few grades aren't the best, improving your grades overall vastly by the end of High School provides an excellent picture. Continuing with this thought, a " },
                    {
                        kind: "term",
                        value: "perfect",
                        definition: [
                            { kind: "text", value: "One caveat on this, however, is that maintaining a high GPA to your best ability is still important throughout High School. However, keeping that as a perfect GPA of 4.0+ is not at all required." },
                        ],
                    },
                    { kind: "text", value: " GPA isn't what colleges prioritize. For instance, a student with a 4.0 GPA may have taken very easy classes, while a student with a 3.7 GPA may have taken very difficult classes consistently. This brings me to the next factor that combines with this, Course Rigor." },
                ],
            },
        ],
    },
    {
        id: "course-rigor",
        number: "02",
        title: "Course Choice & Rigor",
        description: "Challenge yourself with the right courses.",
        accentColor: "bg-blue-600",
        blocks: [
            {
                kind: "paragraph",
                segments: [
                    { kind: "text", value: "While the classes offered differ from school to school, most schools offer advanced courses with preceding titles (e.g. Honors, Accelerated, Advanced, AP, IB). The following chart demonstrates the hierarchy of classes that are offered in my own school." },
                ],
            },
            { kind: "image" },
            {
                kind: "paragraph",
                segments: [
                    { kind: "text", value: "The amount of these rigor courses that you take show to colleges that you are challenging yourself with your classwork and not just taking easy classes to get a high GPA. With this, colleges also judge your coursework based on the " },
                    {
                        kind: "term",
                        value: "opportunities",
                        definition: [
                            { kind: "text", value: "For instance, if your school offers only 2 AP classes, taking those 2 classes already maximizes your course rigor relative to your school and peers. If your school offers 20 AP classes, but you only choose to take 5, while your peers take 9 or 10+, it would not be seen as challenging yourself relative to the opportunity." },
                        ],
                    },
                    { kind: "text", value: " available in your school." },
                ],
            },
            {
                kind: "paragraph",
                segments: [
                    { kind: "text", value: "Additionally, Dual Enrollment courses offer the ability to take college classes online while in High School, and are typically much easier than taking the actual college version. However, these courses are often seen as less rigorous, unless in special circumstances where a course is offered that isn't available at your High School." },
                ],
            },
            {
                kind: "paragraph",
                segments: [
                    { kind: "text", value: "Usually, High Schools have a requirement for credits in certain subjects across all of your High School credit classes, so keep that in mind when choosing your classes as well. Also keep in mind that taking essential classes in a pathway (Math, Language, etc.) can result in you learning way less information less effectively than taking the one offered at your school, so save " },
                    {
                        kind: "term",
                        value: "Summer classes",
                        definition: [
                            { kind: "text", value: "Some Schools offer online Summer classes that are similar to Dual Enrollment but accelerated much more. I am unsure of the policy in other schools, so check your own school for more information." },
                        ],
                    },
                    { kind: "text", value: " for certain Graduation requirement classes such as Health if needed." },
                ],
            },
        ],
    },
    {
        id: "extracurriculars",
        number: "03",
        title: "Extracurriculars, Leadership, Clubs",
        description: "Explore, get involved, and make a difference.",
        accentColor: "bg-amber-500",
        blocks: [
            {
                kind: "paragraph",
                segments: [
                    { kind: "text", value: "Your extracurricular activities are something that you should get a jumpstart on as soon as possible, especially when High School classes and Summer are less busy in 9th and 10th grade. What defines an extracurricular is very broad, but some typical examples for my Computer Science interest include Internships, Developing Applications/Programs that help your local community, Research Papers, Volunteering, or Club Leadership. I believe that everyone, regardless of their major should find volunteering opportunities, whether being through a club such as National Beta Club, with a local business, or even within your School. I also recommend joining School clubs that speak to you early on, and possibly even starting your own, so that you can get involved. Finding the right clubs for your passions and sticking with them throughout High School demonstrates commitment, and shows colleges that you're willing to get involved outside of just academics. If a club offers leadership roles, you should apply for the chance to demonstrate your ability to handle larger responsibilities and help out within a group that you care about. These roles are often a gateway to further opportunities within your School and allow you to know your Club sponsors, teachers, and peers much better." },
                ],
            },
        ],
    },
    {
        id: "sat-act",
        number: "04",
        title: "SAT & ACT",
        description: "Prepare early. Create more options.",
        accentColor: "bg-emerald-600",
        blocks: [
            {
                kind: "paragraph",
                segments: [
                    { kind: "text", value: "Even though some colleges don't require an " },
                    {
                        kind: "term",
                        value: "SAT",
                        definition: [
                            { kind: "text", value: "The SAT is administered by CollegeBoard, who also handles AP classes, and has a maximum score of 1600. The test is comprised of 2 modules across a Math section and a Reading & Writing section. For more information, look for resources online or visit their website " },
                            { kind: "link", value: "here", url: "https://satsuite.collegeboard.org/sat" },
                            { kind: "text", value: "." },
                        ],
                    },
                    { kind: "text", value: " or " },
                    {
                        kind: "term",
                        value: "ACT",
                        definition: [
                            { kind: "text", value: "The ACT is administered by the ACT Corp, separate from CollegeBoard, and has a maximum score of 36. The test is comprised of English, Math, and Reading sections, as well as optional Science and Writing sections. For more information, look for resources online or visit their website " },
                            { kind: "link", value: "here", url: "https://www.act.org/" },
                            { kind: "text", value: "." },
                        ],
                    },
                    { kind: "text", value: " score, most competitive students aim for higher scores in both exams. Just like GPA, your score on either of these exams are a general expectation in admissions. I believe that it's never too early to start preparing for these exams and getting them out of the way, even as early as 9th or 10th grade. Personally, I've only taken the SAT so my recommendation is to aim for 1400s-1500s. Unless you get a 1600, any score above 1500 are usually viewed the same. For STEM majors that involve math, colleges will usually pay more attention to the Math score on these exams." },
                ],
            },
        ],
    },
];