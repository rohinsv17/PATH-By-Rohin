// Shape of a single project entry
export interface Project {
    title: string;
    description: string[];
    tags: string[];
    link?: string;
    demoLink?: string;
    images: string[];
}

// Projects with descriptions and links
const projects: Project[] = [
    {
        title: "Retrieval-Augmented Generation (RAG) Pipeline",
        description: [
            "As an AI/ML Intern at Ejyle Technologies, I worked alongside professional engineers to develop a commercial-grade Retrieval-Augmented Generation system for retrieving relevant information from documents and providing grounded LLM responses. I utilized Ollama for LLM-model integration, Qdrant Vector DB for dense and sparse information retrieval, BGE-Large for document embeddings, OpenTelemetry (OTel) & OpenInference with Arize Phoenix for observability, and evaluation using RAGAS.",
            "I later applied the RAG pipeline to build Ask PATH, the AI chatbot within this platform. Ask PATH uses a lite version of the RAG to retrieve information from verified high school and college resources, providing students with source-grounded answers and my own personal guidance.",
        ],
        tags: ["Visual Studio Code", "Python", "Ollama", "Qdrant", "BGE-Large", "BGE-Reranker", "OpenTelemetry", "OpenInference", "Arize Phoenix", "RAGAS", "Hugging Face", "Docker"],
        link: "https://github.com/rohinsv17/RAG-Pipeline",
        demoLink: "/chatbot",
        images: ["/ragImage2.png", "/ragImage1.png"],
    },
    {
        title: "Solar System Small Bodies Diameter Estimation Research",
        description: [
            "I conducted Physics-Informed Machine Learning research to estimate the diameters of NEOWISE-derived Solar System small bodies. I worked with Stanford-graduate mentor, Kimmy C. De Alba, to have my research reviewed and to receive guidance for the accompanying paper. I investigated the error metrics of Random Forest, XGBoost, and Physics-based baseline models on diameter predictions. Furthermore, I used SHAP analysis to interpret the feature importance of the best performing model.",
            "The results and process was documented in the research paper, which is currently available as a preprint on GitHub, along with the computational notebook code. It is to be submitted to ArXiv as a preprint, and has been submitted for publication to the Journal of High School Science."
        ],
        tags: ["Google Colab", "Python", "Random Forest", "XGBoost", "Matplotlib", "SHAP"],
        link: "https://github.com/rohinsv17/ML-Research-Paper-Small-Body-Diameters",
        images: ["/smallBodyImage1.jpg"],
    },
    {
        title: "Stock Sentiment Classifier",
        description: [
            "I developed an AI-powered stock sentiment analysis application that uses Natural Language Processing to classify online sentiment as positive, negative, or neutral in relation to the stock market. The project began during the InspiritAI Scholars program, in which I was mentored by MIT and Stanford graduates on Machine Learning concepts and applications. The model we engineered within the program uses Google’s BERT model for the language base.",
            "I later extended it independently by building a React/TypeScript frontend hosting the model through Hugging Face Spaces, and using FastAPI to connect the frontend to the model. This project taught me how to engineer a machine learning model and turn it into an interactive application built around a practical use case.",
        ],
        tags: ["Google Colab", "Visual Studio Code", "Python", "BERT", "NLP", "FastAPI", "React", "TypeScript", "Hugging Face", "Docker"],
        link: "https://github.com/rohinsv17/stock-sentiment-analysis-model",
        demoLink: "/sentiment-analysis",
        images: ["/stockImage1.jpg"],
    },
    {
        title: "FBLA Chapter Website",
        description: [
            "As an Officer and Webmaster for Johns Creek High School FBLA, I helped develop and maintain our chapter website in collaboration with two other webmasters, the officer team, and faculty advisors. The site is built using the Astro web framework, JavaScript, and CSS, and serves as a central resource for chapter information and activities. This role gave me opportunities to apply my web-development skills to a platform used by my school community, while also contributing as part of the chapter's leadership team.",
        ],
        tags: ["Visual Studio Code", "Astro", "JavaScript", "CSS"],
        link: "https://github.com/JohnsCreekFBLA/johnscreekfbla.github.io",
        demoLink: "https://johnscreekfbla.github.io",
        images: ["/fblaWebImage1.png", "/fblaWebImage2.png"],
    },
    {
        title: "Career Realms Game",
        description: [
            "I co-developed an educational career-simulation game on Roblox that allows players to experience 3D minigames that represent Firefighter, Delivery, and Chef careers. This project was developed for the FBLA Computer Game & Simulation Programming Event using Roblox Studio and Lua/Luau scripting. We used Blender 3D modeling and Figma 2D design for asset creation. ",
            "NOTE: Due to recent age-verification policies of the Roblox platform, access to the game is restricted to age-verified 16+ accounts."
        ],
        tags: ["Roblox Studio", "Lua", "Luau", "Blender", "Figma"],
        demoLink: "https://www.roblox.com/games/95986830682529/Career-Realms",
        images: ["/crImage1.png", "/crImage2.png", "/crImage3.png"],
    },
];

export default projects;