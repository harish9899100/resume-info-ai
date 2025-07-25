import { ResumeData } from '@/types/resume';

// Mock AI resume parser - In production, this would connect to an AI service
export async function parseResumeFile(file: File): Promise<ResumeData> {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock extracted data based on common resume patterns
  const mockData: ResumeData = {
    personalInfo: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA"
    },
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Python",
      "SQL",
      "AWS",
      "Docker",
      "Git",
      "Agile"
    ],
    workExperience: [
      {
        title: "Senior Software Engineer",
        company: "Tech Solutions Inc.",
        duration: "2022 - Present",
        description: "Lead development of scalable web applications using React and Node.js. Mentored junior developers and improved system performance by 40%."
      },
      {
        title: "Software Engineer",
        company: "Digital Innovations LLC",
        duration: "2020 - 2022",
        description: "Developed and maintained full-stack applications. Collaborated with cross-functional teams to deliver high-quality software solutions."
      },
      {
        title: "Junior Developer",
        company: "StartUp Ventures",
        duration: "2019 - 2020",
        description: "Built responsive web interfaces and implemented RESTful APIs. Participated in code reviews and agile development processes."
      }
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "University of California, Berkeley",
        year: "2019"
      }
    ],
    certifications: [
      {
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        date: "2023"
      },
      {
        name: "Certified Scrum Master",
        issuer: "Scrum Alliance",
        date: "2022"
      }
    ],
    achievements: [
      "Led a team that increased application performance by 40%",
      "Implemented CI/CD pipeline reducing deployment time by 60%",
      "Mentored 5 junior developers",
      "Won company innovation award for developing automated testing framework"
    ]
  };

  return mockData;
}

// Helper function to extract text from PDF (would use pdf-parse or similar in production)
export async function extractTextFromPDF(file: File): Promise<string> {
  // Mock implementation
  return "Mock extracted text from PDF";
}

// Helper function to extract text from DOCX (would use mammoth.js or similar in production)
export async function extractTextFromDOCX(file: File): Promise<string> {
  // Mock implementation
  return "Mock extracted text from DOCX";
}