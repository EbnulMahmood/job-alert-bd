/**
 * Type definitions for Daily Learning Content
 */

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
  tasks: string[]
  quiz?: {
    question: string
    options: string[]
    correctAnswer: number
  }[]
}

export interface CompanyTrack {
  companyName: string
  companyType: 'private' | 'government'
  description: string
  totalDays: number
  topics: LearningTopic[]
  interviewTips: string[]
}
