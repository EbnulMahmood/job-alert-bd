import { useState } from 'react'
import { ChevronDown, ChevronUp, ExternalLink, CheckCircle } from 'lucide-react'

interface Topic {
  name: string
  checked?: boolean
}

interface Section {
  title: string
  topics: Topic[]
}

interface CompanyInfo {
  name: string
  interviewProcess: string
  focusAreas: string[]
  tips: string
  duration?: string
}

const technicalTopics: Section[] = [
  {
    title: 'C# / .NET Core',
    topics: [
      { name: 'LINQ (queries, methods, deferred execution)' },
      { name: 'Async/Await (Task, ValueTask, cancellation)' },
      { name: 'Generics and Constraints' },
      { name: 'Delegates, Events, Lambda expressions' },
      { name: 'Dependency Injection' },
      { name: 'Middleware and Request Pipeline' },
      { name: 'Configuration and Options Pattern' },
    ],
  },
  {
    title: 'Entity Framework Core',
    topics: [
      { name: 'Code First vs Database First' },
      { name: 'Migrations' },
      { name: 'LINQ to Entities' },
      { name: 'Eager vs Lazy Loading' },
      { name: 'Change Tracking' },
      { name: 'Raw SQL queries' },
    ],
  },
  {
    title: 'SQL Server',
    topics: [
      { name: 'JOINs (INNER, LEFT, RIGHT, FULL)' },
      { name: 'Indexes (Clustered, Non-clustered)' },
      { name: 'Stored Procedures' },
      { name: 'Query Optimization' },
      { name: 'Transactions and ACID' },
      { name: 'CTEs and Window Functions' },
    ],
  },
  {
    title: 'Design Patterns & Architecture',
    topics: [
      { name: 'SOLID Principles' },
      { name: 'Repository Pattern' },
      { name: 'Unit of Work' },
      { name: 'Factory Pattern' },
      { name: 'Clean Architecture' },
      { name: 'Microservices basics' },
    ],
  },
  {
    title: 'Data Structures & Algorithms',
    topics: [
      { name: 'Arrays, Strings, HashMaps' },
      { name: 'Linked Lists, Stacks, Queues' },
      { name: 'Trees (Binary, BST)' },
      { name: 'Graphs (BFS, DFS)' },
      { name: 'Sorting algorithms' },
      { name: 'Big O notation' },
    ],
  },
]

const companyInfo: CompanyInfo[] = [
  {
    name: 'Cefalo',
    interviewProcess: 'MCQ test (27 questions + 2 problems) → Technical Discussion',
    focusAreas: ['EF Core', '.NET Core', 'Previous project experience', 'Clean Code'],
    tips: 'Prepare portfolio of projects, focus on code quality and European work style',
    duration: '5 weeks',
  },
  {
    name: 'Kaz Software',
    interviewProcess: 'Written Test → Technical Interview → HR Round',
    focusAreas: ['Full-stack (C#, Angular/React)', 'Azure/AWS', 'System Design'],
    tips: 'Practice system design, demonstrate problem-solving skills',
  },
  {
    name: 'SELISE',
    interviewProcess: 'Live Coding → Peer Collaboration → Technical Interview',
    focusAreas: ['Enterprise solutions', '.NET', 'Java', 'JavaScript'],
    tips: 'Understand large-scale systems, practice collaborative coding',
  },
  {
    name: 'Enosis Solutions',
    interviewProcess: 'Written Test (algorithms) → Coding Test → Interview',
    focusAreas: ['OOP concepts', 'C#', 'SQL', 'Testing'],
    tips: 'Practice LeetCode easy-medium problems',
    duration: '~28 days',
  },
  {
    name: 'Therap BD',
    interviewProcess: 'Online Test → Technical Rounds (DSA, DBMS, SQL) → HR',
    focusAreas: ['Java/Java EE (C#/Python welcome)', 'OOP', 'Database queries'],
    tips: 'Strong OOP fundamentals, practice SQL queries',
    duration: '~28 days',
  },
  {
    name: 'Samsung R&D',
    interviewProcess: 'Online Aptitude Test → Coding Test (DSA heavy) → Multiple Technical Rounds → HR',
    focusAreas: ['DSA', 'System Design', 'C/C++', 'AI/ML'],
    tips: 'Strong DSA is essential, competitive programming background helps. Highest salary in BD tech.',
  },
  {
    name: 'BJIT',
    interviewProcess: 'Written Test (programming + aptitude) → Technical Interview → HR',
    focusAreas: ['.NET/Java', 'Web API', 'React/Angular', 'SQL', 'Agile/Documentation'],
    tips: 'Japanese client culture - quality and documentation emphasized. Diverse tech stack exposure.',
    duration: '~3 weeks',
  },
  {
    name: 'Brain Station 23',
    interviewProcess: 'Written Test (MCQ + Coding) → Technical Interview → HR',
    focusAreas: ['.NET/Java/Node.js', 'React/Angular', 'SQL', 'System Design'],
    tips: 'Largest local company (700+ engineers). Good entry point for freshers. Frequent hiring.',
    duration: '~2 weeks',
  },
  {
    name: 'Bangladesh Bank',
    interviewProcess: 'Preliminary MCQ → Written Exam → Practical Test → Viva → Medical',
    focusAreas: ['General IT knowledge', 'Programming basics (C/C++)', 'DBMS', 'Current affairs'],
    tips: 'BCS-style preparation. Lifetime job security + government benefits. Focus on fundamentals.',
  },
]

const resources = [
  { name: 'LeetCode', url: 'https://leetcode.com', description: 'DSA practice (Easy/Medium)' },
  { name: 'NeetCode 150', url: 'https://neetcode.io', description: 'Curated DSA problems' },
  { name: 'Microsoft Learn', url: 'https://learn.microsoft.com', description: 'Free .NET learning paths' },
  { name: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', description: 'System design concepts' },
  { name: 'Pramp', url: 'https://pramp.com', description: 'Free peer mock interviews' },
]

function PreparationGuide() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['C# / .NET Core']))
  const [expandedCompanies, setExpandedCompanies] = useState<Set<string>>(new Set())
  const [checkedTopics, setCheckedTopics] = useState<Set<string>>(new Set())

  const toggleSection = (title: string) => {
    const newSet = new Set(expandedSections)
    if (newSet.has(title)) {
      newSet.delete(title)
    } else {
      newSet.add(title)
    }
    setExpandedSections(newSet)
  }

  const toggleCompany = (name: string) => {
    const newSet = new Set(expandedCompanies)
    if (newSet.has(name)) {
      newSet.delete(name)
    } else {
      newSet.add(name)
    }
    setExpandedCompanies(newSet)
  }

  const toggleTopic = (topic: string) => {
    const newSet = new Set(checkedTopics)
    if (newSet.has(topic)) {
      newSet.delete(topic)
    } else {
      newSet.add(topic)
    }
    setCheckedTopics(newSet)
  }

  return (
    <div className="space-y-6">
      {/* Technical Topics */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Technical Topics Checklist</h2>
        <div className="space-y-3">
          {technicalTopics.map((section) => (
            <div key={section.title} className="card">
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex items-center justify-between"
              >
                <span className="font-medium text-gray-900">{section.title}</span>
                {expandedSections.has(section.title) ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {expandedSections.has(section.title) && (
                <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                  {section.topics.map((topic) => (
                    <label
                      key={topic.name}
                      className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={checkedTopics.has(topic.name)}
                        onChange={() => toggleTopic(topic.name)}
                        className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                      />
                      <span className={checkedTopics.has(topic.name) ? 'text-gray-400 line-through' : 'text-gray-700'}>
                        {topic.name}
                      </span>
                      {checkedTopics.has(topic.name) && (
                        <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                      )}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Company-Specific */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Company-Specific Preparation</h2>
        <div className="space-y-3">
          {companyInfo.map((company) => (
            <div key={company.name} className="card">
              <button
                onClick={() => toggleCompany(company.name)}
                className="w-full flex items-center justify-between"
              >
                <span className="font-medium text-gray-900">{company.name}</span>
                {expandedCompanies.has(company.name) ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {expandedCompanies.has(company.name) && (
                <div className="mt-3 pt-3 border-t border-gray-100 space-y-3">
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase">Interview Process</span>
                    <p className="text-sm text-gray-700 mt-1">{company.interviewProcess}</p>
                    {company.duration && (
                      <span className="text-xs text-gray-500">Duration: {company.duration}</span>
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase">Focus Areas</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {company.focusAreas.map((area) => (
                        <span key={area} className="badge badge-blue">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase">Tips</span>
                    <p className="text-sm text-gray-700 mt-1">{company.tips}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommended Resources</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {resources.map((resource) => (
            <a
              key={resource.name}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card hover:shadow-md transition-shadow flex items-center gap-3"
            >
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{resource.name}</h3>
                <p className="text-sm text-gray-500">{resource.description}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PreparationGuide
