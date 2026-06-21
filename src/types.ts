export interface FormData {
  // Step 1: Company Profile
  companyName: string;
  primaryGoal: string;
  companySize: string;
  contactEmail: string;

  // Step 2: Project Tech Specs
  projectTitle: string;
  projectDescription: string;
  technologies: string[]; // E.g., ['react', 'node', 'tailwind', 'postgres', 'gemini']
  expectedLaunchDate: string;

  // Step 3: Budget & Terms
  budgetTier: string;
  cloudProvider: string;
  agreeNda: boolean;
}

export interface ValidationErrors {
  companyName?: string;
  primaryGoal?: string;
  companySize?: string;
  contactEmail?: string;
  projectTitle?: string;
  projectDescription?: string;
  expectedLaunchDate?: string;
  budgetTier?: string;
  agreeNda?: string;
}

export interface FormStep {
  id: number;
  label: string;
  title: string;
  subtitle: string;
}

export const FORM_STEPS: FormStep[] = [
  {
    id: 1,
    label: "Company",
    title: "Company Profile",
    subtitle: "Tell us about your organization and structure so we can tailor the process.",
  },
  {
    id: 2,
    label: "Scope",
    title: "Project Scope & Specs",
    subtitle: "Provide full context regarding your applications technical requirements.",
  },
  {
    id: 3,
    label: "Terms",
    title: "Budget & Compliance",
    subtitle: "Set structural constraints, choose a package tier, and agree to terms.",
  },
  {
    id: 4,
    label: "Review",
    title: "Final Verification",
    subtitle: "Ensure all parameters are correct before submitting your proposal.",
  },
];

export const INITIAL_FORM_DATA: FormData = {
  companyName: "",
  primaryGoal: "",
  companySize: "11-50",
  contactEmail: "",
  projectTitle: "",
  projectDescription: "",
  technologies: [],
  expectedLaunchDate: "",
  budgetTier: "",
  cloudProvider: "gcp",
  agreeNda: false,
};
