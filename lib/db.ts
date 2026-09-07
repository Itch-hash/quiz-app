export type QuizDifficulty = "beginner" | "intermediate" | "advanced";

export type QuizChoice = {
  id: string;
  text: string;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  choices: [QuizChoice, QuizChoice, QuizChoice, QuizChoice];
  correctChoiceId: string;
  explanation: string;
};

export type ResultsType = [
  {
    choiceID: string;
    questionID: string;
  },
];

export type QuizMetadata = {
  image: string;
  title: string;
  description: string;
  category: string;
  difficulty: QuizDifficulty;
  tags: string[];
  timeLimitSeconds: number;
  passingScore: number;
  createdAt: string;
  updatedAt: string;
};

export type Quiz = {
  id: string;
  slug: string;
  metadata: QuizMetadata;
  questions: QuizQuestion[];
};

export const quizes: Quiz[] = [
  {
    id: "quiz-web-basics",
    slug: "web-basics",
    metadata: {
      image: "/quiz-web-basics.png",
      title: "Web Basics",
      description: "A quick check on HTML, CSS, and browser fundamentals.",
      category: "Web Development",
      difficulty: "beginner",
      tags: ["html", "css", "browser"],
      timeLimitSeconds: 300,
      passingScore: 70,
      createdAt: "2026-08-28",
      updatedAt: "2026-08-28",
    },
    questions: [
      {
        id: "web-basics-q1",
        prompt: "Which HTML element is used for the largest heading?",
        choices: [
          { id: "a", text: "<heading>" },
          { id: "b", text: "<h1>" },
          { id: "c", text: "<head>" },
          { id: "d", text: "<title>" },
        ],
        correctChoiceId: "b",
        explanation: "<h1> represents the most important page heading.",
      },
      {
        id: "web-basics-q2",
        prompt: "Which CSS property changes the text color of an element?",
        choices: [
          { id: "a", text: "font-style" },
          { id: "b", text: "background-color" },
          { id: "c", text: "color" },
          { id: "d", text: "text-decoration" },
        ],
        correctChoiceId: "c",
        explanation: "The color property controls the foreground text color.",
      },
      {
        id: "web-basics-q3",
        prompt: "What does the browser use JavaScript for?",
        choices: [
          { id: "a", text: "Adding interactivity to pages" },
          { id: "b", text: "Replacing every image file" },
          { id: "c", text: "Setting the computer clock" },
          { id: "d", text: "Creating DNS records" },
        ],
        correctChoiceId: "a",
        explanation:
          "JavaScript commonly powers user interactions in the browser.",
      },
      {
        id: "web-basics-q4",
        prompt: "Which HTML attribute provides alternative text for an image?",
        choices: [
          { id: "a", text: "src" },
          { id: "b", text: "href" },
          { id: "c", text: "alt" },
          { id: "d", text: "title" },
        ],
        correctChoiceId: "c",
        explanation:
          "The alt attribute describes an image for accessibility and fallback text.",
      },
      {
        id: "web-basics-q5",
        prompt:
          "Which CSS layout system is designed for one-dimensional layouts?",
        choices: [
          { id: "a", text: "Flexbox" },
          { id: "b", text: "Grid" },
          { id: "c", text: "Float" },
          { id: "d", text: "Table" },
        ],
        correctChoiceId: "a",
        explanation:
          "Flexbox is best suited for arranging items in a row or column.",
      },
    ],
  },
  {
    id: "quiz-typescript-starter",
    slug: "typescript-starter",
    metadata: {
      image: "/quiz-typescript-starter.png",
      title: "TypeScript Starter",
      description: "Intro questions about types, interfaces, and safety.",
      category: "Programming",
      difficulty: "intermediate",
      tags: ["typescript", "javascript", "types"],
      timeLimitSeconds: 420,
      passingScore: 75,
      createdAt: "2026-08-28",
      updatedAt: "2026-08-28",
    },
    questions: [
      {
        id: "typescript-starter-q1",
        prompt: "What is the main purpose of TypeScript?",
        choices: [
          { id: "a", text: "To add static typing to JavaScript" },
          { id: "b", text: "To replace HTML in web apps" },
          { id: "c", text: "To compress image assets" },
          { id: "d", text: "To manage database migrations only" },
        ],
        correctChoiceId: "a",
        explanation: "TypeScript extends JavaScript with static type checking.",
      },
      {
        id: "typescript-starter-q2",
        prompt: "Which syntax defines a string variable type?",
        choices: [
          { id: "a", text: "let name: string" },
          { id: "b", text: "let string name" },
          { id: "c", text: "string let name" },
          { id: "d", text: "name type string" },
        ],
        correctChoiceId: "a",
        explanation: "Type annotations are written after the variable name.",
      },
      {
        id: "typescript-starter-q3",
        prompt: "What does an interface usually describe?",
        choices: [
          { id: "a", text: "A reusable object shape" },
          { id: "b", text: "A browser cache rule" },
          { id: "c", text: "A CSS animation timeline" },
          { id: "d", text: "A server port number" },
        ],
        correctChoiceId: "a",
        explanation: "Interfaces are often used to describe object contracts.",
      },
      {
        id: "typescript-starter-q4",
        prompt: "Which TypeScript type means a value can be any type?",
        choices: [
          { id: "a", text: "unknown" },
          { id: "b", text: "any" },
          { id: "c", text: "never" },
          { id: "d", text: "void" },
        ],
        correctChoiceId: "b",
        explanation: "The any type disables type checking for that value.",
      },
      {
        id: "typescript-starter-q5",
        prompt: "What does the never type usually represent?",
        choices: [
          { id: "a", text: "A value that is always a string" },
          { id: "b", text: "A value that can be null" },
          { id: "c", text: "A value that should not occur" },
          { id: "d", text: "A value returned by every function" },
        ],
        correctChoiceId: "c",
        explanation:
          "The never type represents values that cannot happen in a valid flow.",
      },
    ],
  },
  {
    id: "quiz-general-knowledge",
    slug: "general-knowledge",
    metadata: {
      image: "/quiz-general-knowledge.png",
      title: "General Knowledge",
      description: "A balanced mix of science, geography, and culture.",
      category: "Trivia",
      difficulty: "beginner",
      tags: ["trivia", "science", "geography"],
      timeLimitSeconds: 360,
      passingScore: 65,
      createdAt: "2026-08-28",
      updatedAt: "2026-08-28",
    },
    questions: [
      {
        id: "general-knowledge-q1",
        prompt: "Which planet is known as the Red Planet?",
        choices: [
          { id: "a", text: "Venus" },
          { id: "b", text: "Mars" },
          { id: "c", text: "Jupiter" },
          { id: "d", text: "Mercury" },
        ],
        correctChoiceId: "b",
        explanation:
          "Mars is often called the Red Planet because of its iron-rich surface.",
      },
      {
        id: "general-knowledge-q2",
        prompt: "What is the capital city of Japan?",
        choices: [
          { id: "a", text: "Kyoto" },
          { id: "b", text: "Osaka" },
          { id: "c", text: "Tokyo" },
          { id: "d", text: "Sapporo" },
        ],
        correctChoiceId: "c",
        explanation: "Tokyo is Japan's capital and largest metropolitan area.",
      },
      {
        id: "general-knowledge-q3",
        prompt: "Which gas do plants absorb during photosynthesis?",
        choices: [
          { id: "a", text: "Oxygen" },
          { id: "b", text: "Nitrogen" },
          { id: "c", text: "Carbon dioxide" },
          { id: "d", text: "Hydrogen" },
        ],
        correctChoiceId: "c",
        explanation:
          "Plants absorb carbon dioxide and release oxygen during photosynthesis.",
      },
      {
        id: "general-knowledge-q4",
        prompt: "How many continents are there on Earth?",
        choices: [
          { id: "a", text: "5" },
          { id: "b", text: "6" },
          { id: "c", text: "7" },
          { id: "d", text: "8" },
        ],
        correctChoiceId: "c",
        explanation:
          "The commonly taught model divides Earth into seven continents.",
      },
      {
        id: "general-knowledge-q5",
        prompt: "Which ocean is the largest on Earth?",
        choices: [
          { id: "a", text: "Atlantic Ocean" },
          { id: "b", text: "Indian Ocean" },
          { id: "c", text: "Arctic Ocean" },
          { id: "d", text: "Pacific Ocean" },
        ],
        correctChoiceId: "d",
        explanation:
          "The Pacific Ocean is the largest and deepest ocean on Earth.",
      },
    ],
  },
];

export default quizes;
