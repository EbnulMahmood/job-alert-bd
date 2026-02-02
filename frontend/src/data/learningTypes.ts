/**
 * Type definitions for Daily Learning Content
 */

export interface SolutionApproach {
  name: string
  timeComplexity: string
  spaceComplexity: string
  explanation: string
  pseudocode: string
}

export interface PracticeProblem {
  id: string
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  description: string
  hints: string[]
  approaches: SolutionApproach[]
  sampleInput: string
  sampleOutput: string
  relatedTopics: string[]
  companiesAsked?: string[]
}

export interface CodeExample {
  title: string
  language: 'csharp' | 'sql' | 'typescript' | 'javascript' | 'python'
  code: string
  explanation: string
  output?: string
  keyPoints: string[]
}

export interface InterviewQuestion {
  question: string
  answer: string
  followUp: string[]
}

export interface DetailedTask {
  title: string
  description: string
  expectedOutcome: string
  estimatedTime: string
  type: 'practice' | 'reading' | 'coding' | 'quiz'
  difficulty?: 'easy' | 'medium' | 'hard'
}

export interface LearningTopic {
  id: string
  day: number
  title: string
  description: string
  duration: string // e.g., "30 min", "1 hour"
  resources: {
    type: 'article' | 'video' | 'practice' | 'project'
    title: string
    url: string
  }[]
  tasks: (string | DetailedTask)[]
  quiz?: {
    question: string
    options: string[]
    correctAnswer: number
    explanation?: string
    codeSnippet?: string
    difficulty?: 'easy' | 'medium' | 'hard'
  }[]
  // New enriched content fields
  detailedExplanation?: string
  codeExamples?: CodeExample[]
  practiceProblems?: PracticeProblem[]
  keyConcepts?: string[]
  commonMistakes?: string[]
  interviewQuestions?: InterviewQuestion[]
}

export interface CompanyTrack {
  companyName: string
  companyType: 'private' | 'government'
  description: string
  totalDays: number
  topics: LearningTopic[]
  interviewTips: string[]
}
