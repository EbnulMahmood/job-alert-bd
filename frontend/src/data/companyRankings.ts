export type CompanyType = 'private' | 'government' | 'mnc'

export interface SalaryRange {
  junior: string
  mid: string
  senior: string
}

export interface CompanyRanking {
  id: string
  name: string
  type: CompanyType
  origin: string
  foundedYear?: number
  employeeCount: string
  website: string
  overallScore: number
  salaryRange: SalaryRange
  techStack: string[]
  workCulture: string
  interviewProcess: string
  benefits: string[]
  pros: string[]
  cons: string[]
}

export const companyRankings: CompanyRanking[] = [
  {
    id: 'samsung-rd',
    name: 'Samsung R&D',
    type: 'mnc',
    origin: 'South Korea',
    foundedYear: 2010,
    employeeCount: '500-1000',
    website: 'https://www.samsung.com/bd/about-us/careers/',
    overallScore: 4.5,
    salaryRange: { junior: '50K-80K', mid: '90K-150K', senior: '160K-250K+' },
    techStack: ['C/C++', 'Java', 'Python', 'Android', 'Tizen', 'AI/ML'],
    workCulture: 'MNC corporate culture with structured processes. Strong R&D focus with opportunities to work on cutting-edge technology. Korean work culture elements - dedication and discipline valued. Good exposure to global teams and projects.',
    interviewProcess: 'Online Aptitude Test → Coding Test (DSA heavy) → Multiple Technical Rounds → HR Round',
    benefits: ['Competitive Salary', 'Health Insurance', 'Annual Bonus', 'Transport', 'Cafeteria', 'Training Programs', 'Global Mobility'],
    pros: ['Highest salary range in BD tech', 'Global brand on resume', 'Cutting-edge R&D work', 'Structured career growth'],
    cons: ['Very competitive hiring', 'Korean work culture pressure', 'Long work hours possible', 'Bureaucratic processes'],
  },
  {
    id: 'cefalo',
    name: 'Cefalo',
    type: 'private',
    origin: 'Norway',
    foundedYear: 2001,
    employeeCount: '200-300',
    website: 'https://career.cefalo.com/',
    overallScore: 4.3,
    salaryRange: { junior: '40K-60K', mid: '70K-120K', senior: '130K-200K+' },
    techStack: ['.NET Core', 'C#', 'EF Core', 'React', 'Azure', 'Docker'],
    workCulture: 'European work culture with excellent work-life balance. Flat hierarchy, collaborative environment. Focus on clean code and quality over speed. Remote/hybrid options available. Regular team activities and annual retreats to Norway.',
    interviewProcess: 'MCQ Test (27 questions + 2 coding problems) → Technical Discussion → HR Round',
    benefits: ['Work-Life Balance', 'Health Insurance', 'Annual Retreat (Norway)', 'Remote/Hybrid', 'Learning Budget', 'Festival Bonus'],
    pros: ['Best work-life balance', 'European management style', 'Strong .NET focus', 'Quality-oriented culture'],
    cons: ['Salary lower than MNCs', 'Smaller team sizes', 'Limited project variety', 'Slow promotion cycle'],
  },
  {
    id: 'selise',
    name: 'SELISE',
    type: 'private',
    origin: 'Switzerland',
    foundedYear: 2008,
    employeeCount: '400-600',
    website: 'https://selise.ch/career/',
    overallScore: 4.2,
    salaryRange: { junior: '35K-55K', mid: '65K-110K', senior: '120K-180K+' },
    techStack: ['.NET Core', 'C#', 'Angular', 'React', 'Azure', 'Microservices'],
    workCulture: 'Swiss precision meets Bangladeshi innovation. Enterprise-level project exposure. Strong focus on agile practices and collaborative coding. Regular knowledge sharing sessions. Modern office environment.',
    interviewProcess: 'Live Coding Session → Peer Collaboration Test → Technical Interview → HR',
    benefits: ['Health Insurance', 'Festival Bonus', 'Training Programs', 'Modern Office', 'Team Events', 'Career Growth Path'],
    pros: ['Enterprise project exposure', 'Swiss company culture', 'Good for .NET developers', 'Strong engineering practices'],
    cons: ['Live coding pressure in interview', 'Can be demanding', 'Project-dependent workload', 'Limited remote options'],
  },
  {
    id: 'kaz-software',
    name: 'Kaz Software',
    type: 'private',
    origin: 'Bangladesh',
    foundedYear: 2004,
    employeeCount: '100-200',
    website: 'https://kazsoftware.hire.trakstar.com/',
    overallScore: 4.1,
    salaryRange: { junior: '30K-50K', mid: '60K-100K', senior: '110K-170K+' },
    techStack: ['.NET Core', 'C#', 'Angular', 'React', 'AWS', 'Azure', 'Python'],
    workCulture: 'Award-winning company with a family-like atmosphere. Multiple international awards for workplace culture. Strong mentorship for juniors. Diverse project portfolio across different industries.',
    interviewProcess: 'Written Test (technical + aptitude) → Technical Interview → HR Round',
    benefits: ['Award-winning Culture', 'Health Insurance', 'Festival Bonus', 'Learning Opportunities', 'Flexible Hours', 'Team Outings'],
    pros: ['Multiple workplace awards', 'Great for career starters', 'Diverse projects', 'Supportive mentorship'],
    cons: ['Salary below top companies', 'Smaller team', 'Less brand recognition globally', 'Limited remote work'],
  },
  {
    id: 'therap-bd',
    name: 'Therap BD',
    type: 'private',
    origin: 'USA/Bangladesh',
    foundedYear: 2003,
    employeeCount: '200-400',
    website: 'https://therap.hire.trakstar.com/',
    overallScore: 4.0,
    salaryRange: { junior: '35K-55K', mid: '65K-110K', senior: '120K-180K' },
    techStack: ['Java', 'Java EE', 'Spring', 'PostgreSQL', 'JavaScript', 'AWS'],
    workCulture: 'US healthcare SaaS product company. Stable and structured work environment. Focus on quality due to healthcare compliance requirements. Good for developers who prefer product-based work over service-based.',
    interviewProcess: 'Online Test (MCQ + Coding) → Technical Rounds (DSA, DBMS, SQL) → HR',
    benefits: ['US Product Company', 'Health Insurance', 'Stable Job', 'Festival Bonus', 'Provident Fund', 'Training'],
    pros: ['Product company stability', 'US healthcare domain exposure', 'Strong technical standards', 'Good work-life balance'],
    cons: ['Primarily Java (not .NET)', 'Slower technology adoption', 'Niche domain (healthcare)', 'Thorough but long hiring process'],
  },
  {
    id: 'enosis-solutions',
    name: 'Enosis Solutions',
    type: 'private',
    origin: 'Bangladesh',
    foundedYear: 2006,
    employeeCount: '200-400',
    website: 'https://enosisbd.pinpointhq.com/',
    overallScore: 3.9,
    salaryRange: { junior: '30K-50K', mid: '55K-95K', senior: '100K-160K' },
    techStack: ['C#', '.NET Core', 'Angular', 'React', 'SQL Server', 'Azure'],
    workCulture: 'US client-focused with a strong emphasis on technical excellence. Regular coding challenges and knowledge-sharing sessions. Values OOP expertise and clean code practices.',
    interviewProcess: 'Written Test (algorithms + OOP MCQ) → Coding Test → Technical Interview → HR',
    benefits: ['US Client Projects', 'Health Insurance', 'Festival Bonus', 'Training Budget', 'Team Events'],
    pros: ['Strong technical culture', 'US client exposure', 'Good for .NET developers', 'Algorithm-focused hiring'],
    cons: ['Client-dependent workload', 'Medium salary range', 'Can be stressful during deadlines', 'Less brand recognition'],
  },
  {
    id: 'brain-station-23',
    name: 'Brain Station 23',
    type: 'private',
    origin: 'Bangladesh',
    foundedYear: 2006,
    employeeCount: '700-1000+',
    website: 'https://brainstation-23.com/career-verse/',
    overallScore: 3.8,
    salaryRange: { junior: '25K-45K', mid: '50K-90K', senior: '100K-160K' },
    techStack: ['.NET Core', 'Java', 'Node.js', 'React', 'Angular', 'Python', 'Flutter'],
    workCulture: 'Largest local software company with diverse project types. Fast-paced environment with frequent hiring. Good entry point for fresh graduates. Multiple technology stacks and project teams.',
    interviewProcess: 'Written Test (MCQ + Coding) → Technical Interview → HR',
    benefits: ['Large Company Stability', 'Diverse Projects', 'Festival Bonus', 'Health Insurance', 'Career Growth', 'Training'],
    pros: ['Largest local company', 'Frequent hiring', 'Diverse tech exposure', 'Good for freshers'],
    cons: ['Lower starting salary', 'Variable project quality', 'Large company bureaucracy', 'High turnover in some teams'],
  },
  {
    id: 'bjit',
    name: 'BJIT',
    type: 'private',
    origin: 'Japan',
    foundedYear: 2001,
    employeeCount: '300-500',
    website: 'https://bjitgroup.com/career',
    overallScore: 3.7,
    salaryRange: { junior: '25K-45K', mid: '50K-90K', senior: '95K-150K' },
    techStack: ['.NET', 'Java', 'Python', 'React', 'Angular', 'AWS', 'IoT'],
    workCulture: 'Japanese client-oriented with emphasis on quality and documentation. Structured processes with clear deliverables. Global team exposure with offices in multiple countries. Good for developers interested in Japanese work culture.',
    interviewProcess: 'Written Test (programming + aptitude) → Technical Interview → HR Interview',
    benefits: ['Japanese Client Projects', 'Health Insurance', 'Festival Bonus', 'Global Exposure', 'Training Programs'],
    pros: ['Japanese client exposure', 'Global company presence', 'Diverse tech stacks', 'Structured career path'],
    cons: ['Japanese work culture pressure', 'Documentation heavy', 'Medium salary range', 'Less creative freedom'],
  },
  {
    id: 'bangladesh-bank',
    name: 'Bangladesh Bank',
    type: 'government',
    origin: 'Bangladesh',
    foundedYear: 1971,
    employeeCount: '5000+',
    website: 'https://erecruitment.bb.org.bd/',
    overallScore: 3.5,
    salaryRange: { junior: '22K-35K (Grade 9)', mid: '40K-60K (Grade 6-7)', senior: '70K-120K (Grade 4-5)' },
    techStack: ['Oracle', 'Java', 'C/C++', 'SQL', 'Networking', 'Cyber Security'],
    workCulture: 'Government institution with structured hierarchy and fixed working hours. Job security is the highest advantage. BCS-cadre equivalent position. Benefits include pension, housing, and government perks.',
    interviewProcess: 'Preliminary MCQ → Written Exam → Practical Test → Viva → Medical',
    benefits: ['Job Security', 'Pension', 'Government Housing', 'Medical Benefits', 'Festival Bonus', 'Provident Fund', 'Government Perks'],
    pros: ['Lifetime job security', 'Government benefits package', 'Respected position', 'Fixed working hours', 'Housing facility'],
    cons: ['Lower salary than private sector', 'Slow career growth', 'BCS-style exam required', 'Less technical work', 'Bureaucratic environment'],
  },
  {
    id: 'a2i',
    name: 'a2i (Aspire to Innovate)',
    type: 'government',
    origin: 'Bangladesh',
    foundedYear: 2007,
    employeeCount: '200-500',
    website: 'https://a2i.gov.bd/',
    overallScore: 3.4,
    salaryRange: { junior: '25K-40K', mid: '45K-70K', senior: '75K-120K' },
    techStack: ['Java', 'Python', 'PHP', 'React', 'Node.js', 'PostgreSQL'],
    workCulture: 'Government innovation hub under ICT Division. More dynamic than traditional government roles. Focus on Digital Bangladesh initiatives. Contract-based positions alongside permanent roles.',
    interviewProcess: 'Written Test → Technical Interview → Board Interview',
    benefits: ['Government Benefits', 'Digital Bangladesh Projects', 'Training Opportunities', 'Festival Bonus', 'National Impact'],
    pros: ['National-level impact', 'Digital transformation projects', 'More innovative than typical govt', 'Good for civic-minded developers'],
    cons: ['Government salary scale', 'Contract positions common', 'Bureaucratic approvals', 'Limited tech stack choices', 'Political influence possible'],
  },
]

export const getCompanyById = (id: string): CompanyRanking | undefined => {
  return companyRankings.find(c => c.id === id)
}

export const getCompaniesSortedByScore = (): CompanyRanking[] => {
  return [...companyRankings].sort((a, b) => b.overallScore - a.overallScore)
}

export const getCompanyTypeLabel = (type: CompanyType): string => {
  return { private: 'Private', government: 'Government', mnc: 'MNC' }[type]
}
