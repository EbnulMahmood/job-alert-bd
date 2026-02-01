/**
 * Daily Learning Content for Company-Specific Interview Preparation
 * Each company has a 30-day learning track with topics specific to their interview process
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

// Private Company Tracks
export const cefaloTrack: CompanyTrack = {
  companyName: 'Cefalo',
  companyType: 'private',
  description: 'Norwegian company - Focus on .NET Core, EF Core, and clean code practices',
  totalDays: 30,
  interviewTips: [
    'Prepare a portfolio of clean, well-documented projects',
    'Focus on European work culture - work-life balance matters',
    'Expect MCQ test (27 questions + 2 problems)',
    'Technical discussion on previous project experience',
  ],
  topics: [
    {
      id: 'cefalo-day-1',
      day: 1,
      title: 'C# Fundamentals Review',
      description: 'Review core C# concepts that Cefalo interviews focus on',
      duration: '1 hour',
      resources: [
        { type: 'article', title: 'C# Fundamentals - Microsoft Docs', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/' },
        { type: 'video', title: 'C# Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=GhQdlIFylQ8' },
      ],
      tasks: [
        'Review value types vs reference types',
        'Practice boxing/unboxing examples',
        'Write 3 examples using different collection types',
      ],
    },
    {
      id: 'cefalo-day-2',
      day: 2,
      title: 'LINQ Mastery',
      description: 'Deep dive into LINQ - heavily tested at Cefalo',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'LINQ Tutorial', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/linq/' },
        { type: 'practice', title: 'LINQPad', url: 'https://www.linqpad.net/' },
      ],
      tasks: [
        'Practice 10 LINQ query syntax examples',
        'Convert query syntax to method syntax',
        'Implement custom IEnumerable extension methods',
      ],
      quiz: [
        {
          question: 'What is deferred execution in LINQ?',
          options: [
            'Query executes immediately when defined',
            'Query executes when results are enumerated',
            'Query never executes',
            'Query executes in a separate thread',
          ],
          correctAnswer: 1,
        },
      ],
    },
    {
      id: 'cefalo-day-3',
      day: 3,
      title: 'Async/Await Deep Dive',
      description: 'Asynchronous programming patterns used in Cefalo projects',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'Async Programming', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/' },
        { type: 'video', title: 'Async Await in C#', url: 'https://www.youtube.com/watch?v=2moh18sh5p4' },
      ],
      tasks: [
        'Understand Task vs ValueTask',
        'Practice cancellation token usage',
        'Implement async file I/O operations',
      ],
    },
    {
      id: 'cefalo-day-4',
      day: 4,
      title: 'Entity Framework Core Basics',
      description: 'EF Core fundamentals - core skill for Cefalo',
      duration: '2 hours',
      resources: [
        { type: 'article', title: 'EF Core Getting Started', url: 'https://learn.microsoft.com/en-us/ef/core/get-started/overview/first-app' },
      ],
      tasks: [
        'Set up a Code First project',
        'Create models with relationships',
        'Run migrations',
      ],
    },
    {
      id: 'cefalo-day-5',
      day: 5,
      title: 'EF Core Advanced Queries',
      description: 'Complex queries and performance optimization',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'EF Core Querying', url: 'https://learn.microsoft.com/en-us/ef/core/querying/' },
      ],
      tasks: [
        'Practice eager vs lazy loading',
        'Write complex LINQ queries with joins',
        'Understand query execution plans',
      ],
    },
    {
      id: 'cefalo-day-6',
      day: 6,
      title: 'ASP.NET Core Web API',
      description: 'Building RESTful APIs - common Cefalo project type',
      duration: '2 hours',
      resources: [
        { type: 'article', title: 'Web API Tutorial', url: 'https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api' },
      ],
      tasks: [
        'Create a CRUD API',
        'Implement proper HTTP status codes',
        'Add input validation',
      ],
    },
    {
      id: 'cefalo-day-7',
      day: 7,
      title: 'Dependency Injection',
      description: 'DI patterns in ASP.NET Core',
      duration: '1 hour',
      resources: [
        { type: 'article', title: 'DI in ASP.NET Core', url: 'https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection' },
      ],
      tasks: [
        'Understand Singleton vs Scoped vs Transient',
        'Register and inject services',
        'Create custom middleware',
      ],
    },
    // Days 8-14: Design Patterns & Architecture
    {
      id: 'cefalo-day-8',
      day: 8,
      title: 'SOLID Principles',
      description: 'Clean code principles emphasized at Cefalo',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'SOLID Principles', url: 'https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design' },
      ],
      tasks: [
        'Review each SOLID principle with examples',
        'Refactor code violating SRP',
        'Apply OCP to existing code',
      ],
    },
    {
      id: 'cefalo-day-9',
      day: 9,
      title: 'Repository Pattern',
      description: 'Data access pattern commonly used at Cefalo',
      duration: '1 hour',
      resources: [
        { type: 'article', title: 'Repository Pattern', url: 'https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design' },
      ],
      tasks: [
        'Implement generic repository',
        'Add Unit of Work pattern',
        'Write unit tests for repository',
      ],
    },
    {
      id: 'cefalo-day-10',
      day: 10,
      title: 'Clean Architecture',
      description: 'Project structure patterns',
      duration: '2 hours',
      resources: [
        { type: 'video', title: 'Clean Architecture', url: 'https://www.youtube.com/watch?v=dK4Yb6-LxAk' },
      ],
      tasks: [
        'Understand layer separation',
        'Create a sample clean architecture project',
        'Implement domain-driven folder structure',
      ],
    },
    // Days 11-15: Testing
    {
      id: 'cefalo-day-11',
      day: 11,
      title: 'Unit Testing with xUnit',
      description: 'Testing practices valued at Cefalo',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'xUnit Testing', url: 'https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-dotnet-test' },
      ],
      tasks: [
        'Set up xUnit project',
        'Write tests for service layer',
        'Use Moq for mocking',
      ],
    },
    {
      id: 'cefalo-day-12',
      day: 12,
      title: 'Integration Testing',
      description: 'API integration testing',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'Integration Testing', url: 'https://learn.microsoft.com/en-us/aspnet/core/test/integration-tests' },
      ],
      tasks: [
        'Set up WebApplicationFactory',
        'Test API endpoints',
        'Use in-memory database for tests',
      ],
    },
    // Days 13-20: SQL & Database
    {
      id: 'cefalo-day-13',
      day: 13,
      title: 'SQL Fundamentals',
      description: 'SQL skills for Cefalo MCQ test',
      duration: '1 hour',
      resources: [
        { type: 'practice', title: 'SQLZoo', url: 'https://sqlzoo.net/' },
      ],
      tasks: [
        'Practice SELECT with WHERE, ORDER BY',
        'Master GROUP BY and HAVING',
        'Write subqueries',
      ],
    },
    {
      id: 'cefalo-day-14',
      day: 14,
      title: 'SQL Joins',
      description: 'All types of joins - common interview topic',
      duration: '1 hour',
      resources: [
        { type: 'practice', title: 'SQL Joins Practice', url: 'https://www.w3schools.com/sql/sql_join.asp' },
      ],
      tasks: [
        'Practice INNER, LEFT, RIGHT, FULL joins',
        'Write self-joins',
        'Combine multiple joins',
      ],
    },
    {
      id: 'cefalo-day-15',
      day: 15,
      title: 'SQL Performance',
      description: 'Query optimization for interviews',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'SQL Index Guide', url: 'https://use-the-index-luke.com/' },
      ],
      tasks: [
        'Understand clustered vs non-clustered indexes',
        'Read execution plans',
        'Optimize slow queries',
      ],
    },
    // Days 16-22: DSA for MCQ
    {
      id: 'cefalo-day-16',
      day: 16,
      title: 'Arrays and Strings',
      description: 'Common DSA topics in Cefalo MCQ',
      duration: '1.5 hours',
      resources: [
        { type: 'practice', title: 'LeetCode Arrays', url: 'https://leetcode.com/tag/array/' },
      ],
      tasks: [
        'Solve 5 easy array problems',
        'Practice string manipulation',
        'Implement two-pointer technique',
      ],
    },
    {
      id: 'cefalo-day-17',
      day: 17,
      title: 'HashMaps and Sets',
      description: 'Dictionary usage patterns',
      duration: '1 hour',
      resources: [
        { type: 'practice', title: 'HashMap Problems', url: 'https://leetcode.com/tag/hash-table/' },
      ],
      tasks: [
        'Solve Two Sum problem',
        'Practice frequency counting',
        'Implement LRU cache concept',
      ],
    },
    {
      id: 'cefalo-day-18',
      day: 18,
      title: 'Linked Lists',
      description: 'LinkedList operations',
      duration: '1 hour',
      resources: [
        { type: 'practice', title: 'LinkedList Problems', url: 'https://leetcode.com/tag/linked-list/' },
      ],
      tasks: [
        'Implement singly linked list',
        'Reverse a linked list',
        'Detect cycle in linked list',
      ],
    },
    {
      id: 'cefalo-day-19',
      day: 19,
      title: 'Trees Basics',
      description: 'Binary tree traversals',
      duration: '1.5 hours',
      resources: [
        { type: 'practice', title: 'Tree Problems', url: 'https://leetcode.com/tag/tree/' },
      ],
      tasks: [
        'Implement inorder, preorder, postorder traversal',
        'Practice BFS and DFS',
        'Solve tree height problem',
      ],
    },
    {
      id: 'cefalo-day-20',
      day: 20,
      title: 'Sorting Algorithms',
      description: 'Common sorting for MCQ',
      duration: '1 hour',
      resources: [
        { type: 'article', title: 'Sorting Visualizations', url: 'https://visualgo.net/en/sorting' },
      ],
      tasks: [
        'Implement QuickSort and MergeSort',
        'Understand time complexities',
        'Practice sorting-related problems',
      ],
    },
    // Days 21-25: Project & Portfolio
    {
      id: 'cefalo-day-21',
      day: 21,
      title: 'Portfolio Project - Day 1',
      description: 'Start building a demo project for portfolio',
      duration: '2 hours',
      resources: [
        { type: 'project', title: 'Project Ideas', url: 'https://github.com/practical-tutorials/project-based-learning' },
      ],
      tasks: [
        'Choose a project (e.g., Task Management API)',
        'Set up solution with Clean Architecture',
        'Create domain models',
      ],
    },
    {
      id: 'cefalo-day-22',
      day: 22,
      title: 'Portfolio Project - Day 2',
      description: 'Implement core features',
      duration: '2 hours',
      resources: [],
      tasks: [
        'Implement repository layer',
        'Create API endpoints',
        'Add authentication',
      ],
    },
    {
      id: 'cefalo-day-23',
      day: 23,
      title: 'Portfolio Project - Day 3',
      description: 'Add tests and documentation',
      duration: '2 hours',
      resources: [],
      tasks: [
        'Write unit tests (80%+ coverage)',
        'Add Swagger documentation',
        'Create README with setup instructions',
      ],
    },
    {
      id: 'cefalo-day-24',
      day: 24,
      title: 'Git Best Practices',
      description: 'Version control skills',
      duration: '1 hour',
      resources: [
        { type: 'article', title: 'Git Guide', url: 'https://www.atlassian.com/git/tutorials' },
      ],
      tasks: [
        'Practice branching strategies',
        'Write meaningful commit messages',
        'Learn git rebase vs merge',
      ],
    },
    {
      id: 'cefalo-day-25',
      day: 25,
      title: 'Docker Basics',
      description: 'Containerization basics',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'Docker for .NET', url: 'https://learn.microsoft.com/en-us/dotnet/core/docker/introduction' },
      ],
      tasks: [
        'Write Dockerfile for .NET app',
        'Create docker-compose setup',
        'Run containerized application',
      ],
    },
    // Days 26-30: Mock Interviews & Review
    {
      id: 'cefalo-day-26',
      day: 26,
      title: 'MCQ Practice - C#/.NET',
      description: 'Practice MCQ questions similar to Cefalo test',
      duration: '1 hour',
      resources: [
        { type: 'practice', title: 'C# Quiz', url: 'https://www.sanfoundry.com/csharp-mcqs-fundamentals/' },
      ],
      tasks: [
        'Take 50 C# MCQ questions',
        'Review wrong answers',
        'Note down weak areas',
      ],
    },
    {
      id: 'cefalo-day-27',
      day: 27,
      title: 'MCQ Practice - SQL',
      description: 'SQL MCQ practice',
      duration: '1 hour',
      resources: [
        { type: 'practice', title: 'SQL Quiz', url: 'https://www.w3schools.com/sql/sql_quiz.asp' },
      ],
      tasks: [
        'Take SQL MCQ test',
        'Practice complex query questions',
        'Review JOIN and subquery questions',
      ],
    },
    {
      id: 'cefalo-day-28',
      day: 28,
      title: 'Coding Problem Practice',
      description: 'Practice the 2 coding problems in Cefalo test',
      duration: '2 hours',
      resources: [
        { type: 'practice', title: 'LeetCode', url: 'https://leetcode.com/problemset/all/?difficulty=EASY&page=1' },
      ],
      tasks: [
        'Solve 3 easy LeetCode problems',
        'Practice writing clean, readable code',
        'Time yourself (30 min per problem)',
      ],
    },
    {
      id: 'cefalo-day-29',
      day: 29,
      title: 'Mock Technical Discussion',
      description: 'Prepare for technical discussion round',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'Common Interview Questions', url: 'https://www.interviewbit.com/c-sharp-interview-questions/' },
      ],
      tasks: [
        'Prepare to explain your projects',
        'Practice explaining technical decisions',
        'Review architecture patterns',
      ],
    },
    {
      id: 'cefalo-day-30',
      day: 30,
      title: 'Final Review & Application',
      description: 'Final preparation and apply!',
      duration: '2 hours',
      resources: [
        { type: 'article', title: 'Cefalo Careers', url: 'https://career.cefalo.com/' },
      ],
      tasks: [
        'Review all weak areas',
        'Update resume and LinkedIn',
        'Apply to Cefalo!',
        'Prepare questions to ask interviewer',
      ],
    },
  ],
}

export const bangladeshBankTrack: CompanyTrack = {
  companyName: 'Bangladesh Bank',
  companyType: 'government',
  description: 'Central bank - Focus on BCS-style MCQ, IT fundamentals, and current affairs',
  totalDays: 30,
  interviewTips: [
    'Preliminary MCQ → Written Exam → Practical Test → Viva',
    'Focus on general IT knowledge and fundamentals',
    'Current affairs on banking and technology are important',
    'Prepare like BCS examination',
  ],
  topics: [
    {
      id: 'bb-day-1',
      day: 1,
      title: 'Computer Fundamentals',
      description: 'Basic computer concepts for MCQ',
      duration: '1 hour',
      resources: [
        { type: 'article', title: 'Computer Basics', url: 'https://www.tutorialspoint.com/computer_fundamentals/index.htm' },
      ],
      tasks: [
        'Review generations of computers',
        'Study input/output devices',
        'Learn about memory types (RAM, ROM, Cache)',
      ],
    },
    {
      id: 'bb-day-2',
      day: 2,
      title: 'Number Systems',
      description: 'Binary, Octal, Decimal, Hexadecimal conversions',
      duration: '1.5 hours',
      resources: [
        { type: 'practice', title: 'Number System Practice', url: 'https://www.rapidtables.com/convert/number/index.html' },
      ],
      tasks: [
        'Practice binary to decimal conversion',
        'Learn hexadecimal arithmetic',
        'Solve 20 conversion problems',
      ],
    },
    {
      id: 'bb-day-3',
      day: 3,
      title: 'Operating Systems',
      description: 'OS concepts for bank IT exam',
      duration: '1 hour',
      resources: [
        { type: 'article', title: 'OS Concepts', url: 'https://www.geeksforgeeks.org/operating-systems/' },
      ],
      tasks: [
        'Study process management',
        'Learn about memory management',
        'Understand file systems',
      ],
    },
    {
      id: 'bb-day-4',
      day: 4,
      title: 'Database Concepts',
      description: 'DBMS fundamentals',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'DBMS Tutorial', url: 'https://www.geeksforgeeks.org/dbms/' },
      ],
      tasks: [
        'Study normalization (1NF, 2NF, 3NF)',
        'Learn about ACID properties',
        'Understand ER diagrams',
      ],
    },
    {
      id: 'bb-day-5',
      day: 5,
      title: 'SQL Basics',
      description: 'SQL for practical test',
      duration: '1 hour',
      resources: [
        { type: 'practice', title: 'SQL Tutorial', url: 'https://www.w3schools.com/sql/' },
      ],
      tasks: [
        'Practice SELECT, INSERT, UPDATE, DELETE',
        'Learn JOIN operations',
        'Study aggregate functions',
      ],
    },
    {
      id: 'bb-day-6',
      day: 6,
      title: 'Networking Basics',
      description: 'Computer networks fundamentals',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'Networking', url: 'https://www.geeksforgeeks.org/basics-computer-networking/' },
      ],
      tasks: [
        'Study OSI and TCP/IP models',
        'Learn about IP addressing',
        'Understand network devices',
      ],
    },
    {
      id: 'bb-day-7',
      day: 7,
      title: 'Cyber Security Basics',
      description: 'Security concepts for banking',
      duration: '1 hour',
      resources: [
        { type: 'article', title: 'Cyber Security', url: 'https://www.geeksforgeeks.org/cyber-security-types-and-importance/' },
      ],
      tasks: [
        'Study encryption types',
        'Learn about firewalls',
        'Understand common cyber threats',
      ],
    },
    {
      id: 'bb-day-8',
      day: 8,
      title: 'Programming Basics - C',
      description: 'C programming fundamentals',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'C Programming', url: 'https://www.learn-c.org/' },
      ],
      tasks: [
        'Review data types and operators',
        'Practice loops and conditions',
        'Write simple programs',
      ],
    },
    {
      id: 'bb-day-9',
      day: 9,
      title: 'Data Structures',
      description: 'Basic data structures',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'Data Structures', url: 'https://www.geeksforgeeks.org/data-structures/' },
      ],
      tasks: [
        'Study arrays and linked lists',
        'Learn stack and queue',
        'Understand trees basics',
      ],
    },
    {
      id: 'bb-day-10',
      day: 10,
      title: 'Algorithms',
      description: 'Basic algorithms',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'Algorithms', url: 'https://www.geeksforgeeks.org/fundamentals-of-algorithms/' },
      ],
      tasks: [
        'Study searching algorithms',
        'Learn sorting algorithms',
        'Understand time complexity',
      ],
    },
    // Days 11-15: Banking & IT in Banking
    {
      id: 'bb-day-11',
      day: 11,
      title: 'Banking Technology',
      description: 'IT in banking sector',
      duration: '1 hour',
      resources: [
        { type: 'article', title: 'Banking Technology', url: 'https://www.bb.org.bd/' },
      ],
      tasks: [
        'Study core banking systems',
        'Learn about RTGS, BEFTN, NPSB',
        'Understand mobile banking systems',
      ],
    },
    {
      id: 'bb-day-12',
      day: 12,
      title: 'Digital Bangladesh & e-Governance',
      description: 'Government IT initiatives',
      duration: '1 hour',
      resources: [
        { type: 'article', title: 'Digital Bangladesh', url: 'https://a2i.gov.bd/' },
      ],
      tasks: [
        'Study Vision 2041',
        'Learn about a2i initiatives',
        'Understand e-governance projects',
      ],
    },
    {
      id: 'bb-day-13',
      day: 13,
      title: 'Bangladesh Bank Functions',
      description: 'Central bank operations',
      duration: '1 hour',
      resources: [
        { type: 'article', title: 'BB Functions', url: 'https://www.bb.org.bd/aboutus/index.php' },
      ],
      tasks: [
        'Study BB organizational structure',
        'Learn about monetary policy',
        'Understand foreign exchange management',
      ],
    },
    // Days 14-20: MCQ Practice
    {
      id: 'bb-day-14',
      day: 14,
      title: 'Computer MCQ Practice - Set 1',
      description: 'Practice MCQ questions',
      duration: '1.5 hours',
      resources: [
        { type: 'practice', title: 'Computer MCQ', url: 'https://www.indiabix.com/computer-science/questions-and-answers/' },
      ],
      tasks: [
        'Solve 50 computer fundamentals MCQ',
        'Review wrong answers',
        'Note weak areas',
      ],
    },
    {
      id: 'bb-day-15',
      day: 15,
      title: 'Programming MCQ Practice',
      description: 'C/C++ MCQ practice',
      duration: '1.5 hours',
      resources: [
        { type: 'practice', title: 'C MCQ', url: 'https://www.sanfoundry.com/c-programming-questions-answers/' },
      ],
      tasks: [
        'Solve 50 C programming MCQ',
        'Practice output prediction questions',
        'Review pointer-related questions',
      ],
    },
    {
      id: 'bb-day-16',
      day: 16,
      title: 'DBMS & SQL MCQ Practice',
      description: 'Database MCQ practice',
      duration: '1.5 hours',
      resources: [
        { type: 'practice', title: 'DBMS MCQ', url: 'https://www.sanfoundry.com/database-management-system-questions-answers/' },
      ],
      tasks: [
        'Solve 50 DBMS MCQ',
        'Practice normalization questions',
        'Review SQL query questions',
      ],
    },
    {
      id: 'bb-day-17',
      day: 17,
      title: 'Networking MCQ Practice',
      description: 'Network MCQ practice',
      duration: '1.5 hours',
      resources: [
        { type: 'practice', title: 'Network MCQ', url: 'https://www.sanfoundry.com/computer-network-questions-answers/' },
      ],
      tasks: [
        'Solve 50 networking MCQ',
        'Practice OSI model questions',
        'Review protocol questions',
      ],
    },
    {
      id: 'bb-day-18',
      day: 18,
      title: 'Bangla & English',
      description: 'Language section preparation',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'BCS Preparation', url: 'https://www.bdjobs.com/bcs/' },
      ],
      tasks: [
        'Practice Bangla grammar',
        'Review English grammar rules',
        'Solve comprehension passages',
      ],
    },
    {
      id: 'bb-day-19',
      day: 19,
      title: 'General Knowledge - Bangladesh',
      description: 'Bangladesh affairs',
      duration: '1 hour',
      resources: [
        { type: 'article', title: 'Bangladesh GK', url: 'https://www.bdjobs.com/gk/' },
      ],
      tasks: [
        'Study Bangladesh history',
        'Learn about constitution',
        'Review recent developments',
      ],
    },
    {
      id: 'bb-day-20',
      day: 20,
      title: 'Current Affairs',
      description: 'Recent national and international news',
      duration: '1 hour',
      resources: [
        { type: 'article', title: 'Current Affairs', url: 'https://www.thedailystar.net/' },
      ],
      tasks: [
        'Read last 6 months banking news',
        'Study recent BB circulars',
        'Review technology news',
      ],
    },
    // Days 21-25: Written Exam Prep
    {
      id: 'bb-day-21',
      day: 21,
      title: 'Written Exam - Programming',
      description: 'Programming written test preparation',
      duration: '2 hours',
      resources: [
        { type: 'practice', title: 'Coding Practice', url: 'https://www.hackerrank.com/domains/c' },
      ],
      tasks: [
        'Write programs on paper',
        'Practice without IDE',
        'Solve 5 programming problems',
      ],
    },
    {
      id: 'bb-day-22',
      day: 22,
      title: 'Written Exam - SQL',
      description: 'SQL written test preparation',
      duration: '1.5 hours',
      resources: [
        { type: 'practice', title: 'SQL Practice', url: 'https://sqlzoo.net/' },
      ],
      tasks: [
        'Write complex queries on paper',
        'Practice JOIN queries',
        'Solve 10 SQL problems',
      ],
    },
    {
      id: 'bb-day-23',
      day: 23,
      title: 'Written Exam - Essay',
      description: 'Essay writing practice',
      duration: '1.5 hours',
      resources: [],
      tasks: [
        'Write essay on Digital Bangladesh',
        'Practice essay on Cyber Security',
        'Write about Banking Technology',
      ],
    },
    // Days 24-27: Practical Test
    {
      id: 'bb-day-24',
      day: 24,
      title: 'Practical - MS Office',
      description: 'Microsoft Office skills',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'MS Office Tutorial', url: 'https://support.microsoft.com/en-us/office' },
      ],
      tasks: [
        'Practice MS Word formatting',
        'Create Excel formulas and charts',
        'Make PowerPoint presentation',
      ],
    },
    {
      id: 'bb-day-25',
      day: 25,
      title: 'Practical - Database',
      description: 'Database practical skills',
      duration: '1.5 hours',
      resources: [],
      tasks: [
        'Create database and tables',
        'Write queries in SQL Server/MySQL',
        'Practice stored procedures',
      ],
    },
    {
      id: 'bb-day-26',
      day: 26,
      title: 'Practical - Programming',
      description: 'Programming practical skills',
      duration: '2 hours',
      resources: [],
      tasks: [
        'Write programs in C/C++',
        'Practice file handling',
        'Implement data structures',
      ],
    },
    // Days 27-30: Viva & Final Prep
    {
      id: 'bb-day-27',
      day: 27,
      title: 'Viva Preparation - Technical',
      description: 'Technical viva preparation',
      duration: '1.5 hours',
      resources: [],
      tasks: [
        'Review all technical concepts',
        'Prepare to explain projects',
        'Practice speaking about technology',
      ],
    },
    {
      id: 'bb-day-28',
      day: 28,
      title: 'Viva Preparation - General',
      description: 'General viva preparation',
      duration: '1.5 hours',
      resources: [],
      tasks: [
        'Prepare self introduction',
        'Why Bangladesh Bank?',
        'Prepare for HR questions',
      ],
    },
    {
      id: 'bb-day-29',
      day: 29,
      title: 'Full Mock Test',
      description: 'Complete mock examination',
      duration: '3 hours',
      resources: [],
      tasks: [
        'Take full-length MCQ test',
        'Practice written questions',
        'Time management practice',
      ],
    },
    {
      id: 'bb-day-30',
      day: 30,
      title: 'Final Review & Application',
      description: 'Final preparation',
      duration: '2 hours',
      resources: [
        { type: 'article', title: 'BB Recruitment', url: 'https://erecruitment.bb.org.bd/' },
      ],
      tasks: [
        'Review all weak areas',
        'Prepare documents',
        'Apply to Bangladesh Bank!',
        'Rest well before exam',
      ],
    },
  ],
}

// Simplified tracks for other companies (10 days each)
export const kazSoftwareTrack: CompanyTrack = {
  companyName: 'Kaz Software',
  companyType: 'private',
  description: 'Full-stack focus with C#, Angular/React, and Azure/AWS',
  totalDays: 10,
  interviewTips: [
    'Written Test → Technical Interview → HR Round',
    'Focus on full-stack development',
    'System design basics are important',
  ],
  topics: [
    { id: 'kaz-day-1', day: 1, title: 'C# Advanced Features', description: 'Review C# 10/11 features', duration: '1.5 hours', resources: [], tasks: ['Study records, pattern matching', 'Practice nullable reference types'] },
    { id: 'kaz-day-2', day: 2, title: '.NET Core Web API', description: 'API development', duration: '2 hours', resources: [], tasks: ['Build REST API', 'Implement authentication'] },
    { id: 'kaz-day-3', day: 3, title: 'React/Angular Basics', description: 'Frontend framework basics', duration: '2 hours', resources: [], tasks: ['Create components', 'State management'] },
    { id: 'kaz-day-4', day: 4, title: 'TypeScript Essentials', description: 'TypeScript for frontend', duration: '1.5 hours', resources: [], tasks: ['Types and interfaces', 'Generics'] },
    { id: 'kaz-day-5', day: 5, title: 'Azure/AWS Basics', description: 'Cloud fundamentals', duration: '1.5 hours', resources: [], tasks: ['Deploy to Azure App Service', 'Use blob storage'] },
    { id: 'kaz-day-6', day: 6, title: 'SQL Server', description: 'Database skills', duration: '1.5 hours', resources: [], tasks: ['Complex queries', 'Performance tuning'] },
    { id: 'kaz-day-7', day: 7, title: 'System Design Basics', description: 'Architecture patterns', duration: '2 hours', resources: [], tasks: ['Design a simple system', 'Discuss trade-offs'] },
    { id: 'kaz-day-8', day: 8, title: 'Testing', description: 'Unit and integration testing', duration: '1.5 hours', resources: [], tasks: ['Write xUnit tests', 'Mock dependencies'] },
    { id: 'kaz-day-9', day: 9, title: 'DSA Practice', description: 'Problem solving', duration: '2 hours', resources: [], tasks: ['Solve 5 LeetCode problems', 'Practice explaining solutions'] },
    { id: 'kaz-day-10', day: 10, title: 'Mock Interview', description: 'Final preparation', duration: '2 hours', resources: [], tasks: ['Technical mock interview', 'Apply to Kaz Software!'] },
  ],
}

export const seliseTrack: CompanyTrack = {
  companyName: 'SELISE',
  companyType: 'private',
  description: 'Swiss company - Enterprise solutions, live coding, peer collaboration',
  totalDays: 10,
  interviewTips: [
    'Live Coding → Peer Collaboration → Technical Interview',
    'Focus on enterprise-grade solutions',
    'Team collaboration skills matter',
  ],
  topics: [
    { id: 'selise-day-1', day: 1, title: 'Enterprise Architecture', description: 'Large-scale system design', duration: '2 hours', resources: [], tasks: ['Study microservices', 'Understand DDD basics'] },
    { id: 'selise-day-2', day: 2, title: 'Live Coding Practice', description: 'Code under pressure', duration: '2 hours', resources: [], tasks: ['Practice timed coding', 'Think aloud while coding'] },
    { id: 'selise-day-3', day: 3, title: '.NET Core Advanced', description: 'Advanced .NET features', duration: '1.5 hours', resources: [], tasks: ['Middleware', 'Background services'] },
    { id: 'selise-day-4', day: 4, title: 'Clean Code Principles', description: 'Code quality', duration: '1.5 hours', resources: [], tasks: ['SOLID review', 'Refactoring exercises'] },
    { id: 'selise-day-5', day: 5, title: 'API Design', description: 'RESTful API best practices', duration: '1.5 hours', resources: [], tasks: ['Design API endpoints', 'Versioning strategies'] },
    { id: 'selise-day-6', day: 6, title: 'Database Design', description: 'Schema design', duration: '1.5 hours', resources: [], tasks: ['Normalize schemas', 'Index optimization'] },
    { id: 'selise-day-7', day: 7, title: 'Collaborative Coding', description: 'Pair programming practice', duration: '2 hours', resources: [], tasks: ['Practice with a friend', 'Communication during coding'] },
    { id: 'selise-day-8', day: 8, title: 'Problem Solving', description: 'Algorithm practice', duration: '2 hours', resources: [], tasks: ['Solve medium LeetCode', 'Explain approach clearly'] },
    { id: 'selise-day-9', day: 9, title: 'Project Discussion Prep', description: 'Discuss past projects', duration: '1.5 hours', resources: [], tasks: ['Prepare project stories', 'Technical decisions'] },
    { id: 'selise-day-10', day: 10, title: 'Final Preparation', description: 'Apply and prepare', duration: '2 hours', resources: [], tasks: ['Review weak areas', 'Submit open application!'] },
  ],
}

export const samsungTrack: CompanyTrack = {
  companyName: 'Samsung R&D',
  companyType: 'private',
  description: 'MNC - Strong DSA focus, system design, competitive programming background helps',
  totalDays: 15,
  interviewTips: [
    'Multiple technical rounds',
    'Strong DSA is essential',
    'System design for senior roles',
    'Competitive programming experience is a plus',
  ],
  topics: [
    { id: 'samsung-day-1', day: 1, title: 'Arrays & Strings', description: 'Master array algorithms', duration: '2 hours', resources: [], tasks: ['Solve 10 array problems', 'Two pointer technique'] },
    { id: 'samsung-day-2', day: 2, title: 'Linked Lists', description: 'LinkedList operations', duration: '1.5 hours', resources: [], tasks: ['Reverse, detect cycle', 'Merge sorted lists'] },
    { id: 'samsung-day-3', day: 3, title: 'Stacks & Queues', description: 'Stack/Queue problems', duration: '1.5 hours', resources: [], tasks: ['Valid parentheses', 'Implement using arrays'] },
    { id: 'samsung-day-4', day: 4, title: 'Trees', description: 'Binary tree mastery', duration: '2 hours', resources: [], tasks: ['All traversals', 'BST operations'] },
    { id: 'samsung-day-5', day: 5, title: 'Graphs - BFS/DFS', description: 'Graph traversals', duration: '2 hours', resources: [], tasks: ['Implement BFS, DFS', 'Connected components'] },
    { id: 'samsung-day-6', day: 6, title: 'Graphs - Advanced', description: 'Shortest path, etc', duration: '2 hours', resources: [], tasks: ['Dijkstra algorithm', 'Topological sort'] },
    { id: 'samsung-day-7', day: 7, title: 'Dynamic Programming', description: 'DP fundamentals', duration: '2 hours', resources: [], tasks: ['Fibonacci, climbing stairs', 'Coin change'] },
    { id: 'samsung-day-8', day: 8, title: 'DP - Advanced', description: 'Complex DP problems', duration: '2 hours', resources: [], tasks: ['LCS, LIS', '2D DP problems'] },
    { id: 'samsung-day-9', day: 9, title: 'Backtracking', description: 'Backtracking algorithms', duration: '1.5 hours', resources: [], tasks: ['N-Queens', 'Sudoku solver'] },
    { id: 'samsung-day-10', day: 10, title: 'Sorting & Searching', description: 'Advanced sorting', duration: '1.5 hours', resources: [], tasks: ['QuickSort, MergeSort', 'Binary search variants'] },
    { id: 'samsung-day-11', day: 11, title: 'System Design Basics', description: 'Design fundamentals', duration: '2 hours', resources: [], tasks: ['URL shortener', 'Rate limiter'] },
    { id: 'samsung-day-12', day: 12, title: 'System Design Advanced', description: 'Distributed systems', duration: '2 hours', resources: [], tasks: ['Design Twitter feed', 'Caching strategies'] },
    { id: 'samsung-day-13', day: 13, title: 'LeetCode Marathon', description: 'Intensive practice', duration: '3 hours', resources: [], tasks: ['Solve 10 medium problems', 'Time yourself'] },
    { id: 'samsung-day-14', day: 14, title: 'Mock Technical Interview', description: 'Full mock interview', duration: '2 hours', resources: [], tasks: ['2 coding problems', '1 system design'] },
    { id: 'samsung-day-15', day: 15, title: 'Final Preparation', description: 'Review and apply', duration: '2 hours', resources: [], tasks: ['Review weak areas', 'Apply to Samsung R&D!'] },
  ],
}

// Export all tracks
export const allTracks: CompanyTrack[] = [
  cefaloTrack,
  bangladeshBankTrack,
  kazSoftwareTrack,
  seliseTrack,
  samsungTrack,
]

export const getTrackByCompany = (companyName: string): CompanyTrack | undefined => {
  return allTracks.find(track =>
    track.companyName.toLowerCase() === companyName.toLowerCase()
  )
}
