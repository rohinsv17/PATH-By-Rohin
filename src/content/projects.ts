// Shape of a single project entry
export interface Project {
    title: string;
    description: string[];
    link?: string;
    demoLink?: string;
    images: string[];
}

// Projects with descriptions and links
const projects: Project[] = [
    {
        title: "Retrieval-Augmented Generation (RAG) Pipeline",
        description: [
            "As an AI/ML Intern at Ejyle Technologies, I worked alongside professional engineers to develop a commercial-grade Retrieval-Augmented Generation system for retrieving relevant information from documents and providing grounded LLM responses.",
            "I utilized Ollama for LLM-model integration, Qdrant Vector DB for dense and sparse information retrieval, BGE-Large for document embeddings, OpenTelemetry (OTel) & OpenInference with Arize Phoenix for observability, and evaluation using RAGAS.",
            "I later applied the RAG pipeline to build Ask PATH, the AI chatbot within this platform. Ask PATH uses RAG to retrieve information from verified high school and college resources to provide students with source-grounded answers and my own personal guidance.",
        ],
        link: "https://github.com/rohinsv17/RAG-Pipeline",
        demoLink: "/chatbot",
        images: ["/file.svg", "/globe.svg", "/window.svg"],
    },
    {
        title: "Meme Stock Sentiment Classifier",
        description: [
            "I developed an AI-powered stock sentiment analysis application that uses Natural Language Processing to classify online sentiment as positive, negative, or neutral in relation to the stock market.",
            "The project began during the InspiritAI Scholars program, in which I was mentored by MIT and Stanford graduates on Machine Learning concepts and applications. The model we engineered within the program uses Google’s BERT model for the language base.",
            "I later extended it independently by building a React/TypeScript frontend hosting the model through Hugging Face Spaces, and using FastAPI to connect the frontend to the model. This project taught me how to engineer a machine learning model and turn it into an interactive application built around a practical use case.",
        ],
        link: "https://github.com/your-username/project-one",
        demoLink: "/sentiment-analysis",
        images: ["/window.svg", "/file.svg", "/globe.svg"],
    },
    {
        title: "FBLA Chapter Website",
        description: [
            "As an Officer and Webmaster for Johns Creek High School FBLA, I helped develop and maintain our chapter website in collaboration with two other webmasters, the officer team, and faculty advisors.",
            "The site is built using the Astro web framework, JavaScript, and CSS, and serves as a central resource for chapter information and activities.",
            "This role gave me opportunities to apply my web-development skills to a platform used by my school community, while also contributing as part of the chapter's leadership team.",
        ],
        link: "https://github.com/JohnsCreekFBLA/johnscreekfbla.github.io",
        demoLink: "https://johnscreekfbla.github.io",
        images: ["/file.svg", "/globe.svg", "/window.svg"],
    },
    {
        title: "Career Realms Game",
        description: [
            "As an Officer and Webmaster for Johns Creek High School FBLA, I helped develop and maintain our chapter website in collaboration with two other webmasters, the officer team, and faculty advisors.",
            "The site is built using the Astro web framework, JavaScript, and CSS, and serves as a central resource for chapter information and activities.",
            "This role gave me opportunities to apply my web-development skills to a platform used by my school community, while also contributing as part of the chapter's leadership team.",
        ],
        demoLink: "https://www.roblox.com/games/95986830682529/Career-Realms",
        images: ["/file.svg", "/globe.svg", "/window.svg"],
    },
];

export default projects;