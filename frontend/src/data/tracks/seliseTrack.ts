import type { CompanyTrack } from '../learningTypes'

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
    {
      id: 'selise-day-1',
      day: 1,
      title: 'Enterprise Architecture',
      description: 'Large-scale system design',
      duration: '2 hours',
      resources: [
        { type: 'article', title: 'Microservices Architecture - Microsoft', url: 'https://learn.microsoft.com/en-us/dotnet/architecture/microservices/' },
        { type: 'video', title: 'Domain Driven Design - Amichai Mantinband', url: 'https://www.youtube.com/watch?v=fO2T5tRlBS8' },
        { type: 'article', title: 'DDD Reference - Eric Evans', url: 'https://www.domainlanguage.com/ddd/reference/' },
      ],
      tasks: [
        'Study microservices patterns: API Gateway, Service Discovery, Circuit Breaker',
        'Understand DDD basics: Bounded Contexts, Aggregates, Entities, Value Objects',
        'Design a sample enterprise system with at least 3 bounded contexts',
        'Compare event-driven vs request-driven communication between services',
      ],
      quiz: [
        {
          question: 'In Domain-Driven Design, what defines the boundary within which a particular domain model is valid?',
          options: [
            'Aggregate Root',
            'Bounded Context',
            'Entity',
            'Value Object',
          ],
          correctAnswer: 1,
        },
        {
          question: 'Which pattern prevents cascading failures in a microservices architecture?',
          options: [
            'Repository Pattern',
            'Observer Pattern',
            'Circuit Breaker Pattern',
            'Factory Pattern',
          ],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 'selise-day-2',
      day: 2,
      title: 'Live Coding Practice',
      description: 'Code under pressure',
      duration: '2 hours',
      resources: [
        { type: 'practice', title: 'LeetCode - Top Interview Questions', url: 'https://leetcode.com/problem-list/top-interview-questions/' },
        { type: 'video', title: 'How to Approach Live Coding Interviews', url: 'https://www.youtube.com/watch?v=DIR_rxusO8Q' },
        { type: 'practice', title: 'Exercism C# Track', url: 'https://exercism.org/tracks/csharp' },
      ],
      tasks: [
        'Practice 3 timed coding problems (20 minutes each, think aloud)',
        'Record yourself explaining your thought process while solving problems',
        'Practice writing clean, readable code under time pressure (no shortcuts)',
        'Solve a medium-level problem while narrating your approach step by step',
      ],
    },
    {
      id: 'selise-day-3',
      day: 3,
      title: '.NET Core Advanced',
      description: 'Advanced .NET features',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'ASP.NET Core Middleware', url: 'https://learn.microsoft.com/en-us/aspnet/core/fundamentals/middleware/' },
        { type: 'article', title: 'Background Tasks with Hosted Services', url: 'https://learn.microsoft.com/en-us/aspnet/core/fundamentals/host/hosted-services' },
        { type: 'video', title: '.NET Dependency Injection Deep Dive - Nick Chapsas', url: 'https://www.youtube.com/watch?v=Hhpq7oYcpGE' },
      ],
      tasks: [
        'Build custom middleware for logging, exception handling, and request timing',
        'Implement a background service using IHostedService and BackgroundService',
        'Practice advanced DI patterns: keyed services, decorator pattern, factory pattern',
        'Understand the request pipeline and how middleware ordering affects behavior',
      ],
      quiz: [
        {
          question: 'In ASP.NET Core, what determines the order in which middleware components process requests?',
          options: [
            'Alphabetical order of class names',
            'The order they are added in the Configure/Program pipeline',
            'Their namespace hierarchy',
            'The order of their constructor parameters',
          ],
          correctAnswer: 1,
        },
        {
          question: 'Which interface should you implement for long-running background tasks in ASP.NET Core?',
          options: [
            'IMiddleware',
            'IActionFilter',
            'IHostedService',
            'IServiceProvider',
          ],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 'selise-day-4',
      day: 4,
      title: 'Clean Code Principles',
      description: 'Code quality',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'SOLID Principles - DigitalOcean', url: 'https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design' },
        { type: 'video', title: 'SOLID Principles in C# - Raw Coding', url: 'https://www.youtube.com/watch?v=glgMOyU9OOA' },
        { type: 'article', title: 'Refactoring Guru - Design Patterns', url: 'https://refactoring.guru/design-patterns' },
      ],
      tasks: [
        'Review each SOLID principle with C# examples and identify violations',
        'Refactor a sample codebase: extract methods, rename variables, reduce complexity',
        'Practice design patterns commonly used in enterprise: Strategy, Observer, Mediator',
        'Write code that follows DRY, KISS, and YAGNI principles',
      ],
    },
    {
      id: 'selise-day-5',
      day: 5,
      title: 'API Design',
      description: 'RESTful API best practices',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'RESTful API Design Best Practices - Microsoft', url: 'https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design' },
        { type: 'video', title: 'REST API Best Practices - Amichai Mantinband', url: 'https://www.youtube.com/watch?v=_gQaygjm_hg' },
        { type: 'article', title: 'API Versioning in ASP.NET Core', url: 'https://learn.microsoft.com/en-us/aspnet/core/web-api/advanced/conventions' },
      ],
      tasks: [
        'Design API endpoints following REST conventions (proper HTTP methods, status codes)',
        'Implement API versioning strategies (URL path, query string, header-based)',
        'Add pagination, filtering, and sorting to collection endpoints',
        'Document APIs using Swagger/OpenAPI with proper response models',
      ],
      quiz: [
        {
          question: 'Which HTTP status code should be returned when a resource is successfully created?',
          options: [
            '200 OK',
            '201 Created',
            '204 No Content',
            '202 Accepted',
          ],
          correctAnswer: 1,
        },
        {
          question: 'Which HTTP method is idempotent and used to replace an entire resource?',
          options: [
            'POST',
            'PATCH',
            'PUT',
            'DELETE',
          ],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 'selise-day-6',
      day: 6,
      title: 'Database Design',
      description: 'Schema design',
      duration: '1.5 hours',
      resources: [
        { type: 'practice', title: 'SQLZoo Interactive Tutorial', url: 'https://sqlzoo.net/' },
        { type: 'article', title: 'Database Normalization - Microsoft', url: 'https://learn.microsoft.com/en-us/office/troubleshoot/access/database-normalization-description' },
        { type: 'article', title: 'SQL Server Index Architecture', url: 'https://learn.microsoft.com/en-us/sql/relational-databases/sql-server-index-design-guide' },
      ],
      tasks: [
        'Normalize a sample schema to 3NF and discuss when denormalization is appropriate',
        'Design indexes for common query patterns and analyze execution plans',
        'Practice writing complex queries with CTEs, window functions, and subqueries',
        'Implement Entity Framework Core migrations with proper relationships',
      ],
    },
    {
      id: 'selise-day-7',
      day: 7,
      title: 'Collaborative Coding',
      description: 'Pair programming practice',
      duration: '2 hours',
      resources: [
        { type: 'article', title: 'Pair Programming Guide - Martin Fowler', url: 'https://martinfowler.com/articles/on-pair-programming.html' },
        { type: 'practice', title: 'CodeSignal - Practice Challenges', url: 'https://codesignal.com/' },
        { type: 'video', title: 'Effective Pair Programming Tips', url: 'https://www.youtube.com/watch?v=YhV4TaZaB84' },
      ],
      tasks: [
        'Practice pair programming with a friend (alternate driver/navigator roles)',
        'Focus on clear communication: explain your reasoning before writing code',
        'Solve a system design problem collaboratively using whiteboard or draw.io',
        'Practice code review: review a GitHub PR and provide constructive feedback',
      ],
      quiz: [
        {
          question: 'In pair programming, what is the role of the "navigator"?',
          options: [
            'Writes the code while the other watches',
            'Reviews code after it is written',
            'Thinks strategically and guides the driver while reviewing each line',
            'Tests the code after the driver finishes',
          ],
          correctAnswer: 2,
        },
        {
          question: 'Which practice is most valued during collaborative coding at SELISE?',
          options: [
            'Writing code as fast as possible',
            'Working silently and independently',
            'Clear communication and explaining your thought process',
            'Using the most advanced language features',
          ],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 'selise-day-8',
      day: 8,
      title: 'Problem Solving',
      description: 'Algorithm practice',
      duration: '2 hours',
      resources: [
        { type: 'practice', title: 'LeetCode Medium Problems', url: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM&page=1' },
        { type: 'practice', title: 'NeetCode Roadmap', url: 'https://neetcode.io/roadmap' },
        { type: 'video', title: 'Algorithms and Data Structures - freeCodeCamp', url: 'https://www.youtube.com/watch?v=8hly31xKli0' },
      ],
      tasks: [
        'Solve 3 medium LeetCode problems focusing on arrays, strings, and hash maps',
        'Explain your approach clearly before coding (practice verbalizing the algorithm)',
        'Implement solutions with proper time and space complexity analysis',
        'Practice edge case handling and write test cases for your solutions',
      ],
    },
    {
      id: 'selise-day-9',
      day: 9,
      title: 'Project Discussion Prep',
      description: 'Discuss past projects',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'STAR Interview Method', url: 'https://www.themuse.com/advice/star-interview-method' },
        { type: 'article', title: 'How to Present Your Projects in Interviews', url: 'https://www.freecodecamp.org/news/how-to-talk-about-your-projects-in-a-developer-interview/' },
        { type: 'video', title: 'Tech Interview Tips - TechLead', url: 'https://www.youtube.com/watch?v=1t1_a702D6w' },
      ],
      tasks: [
        'Prepare 2-3 project stories using STAR method (Situation, Task, Action, Result)',
        'Document key technical decisions and trade-offs from your best projects',
        'Practice explaining your architecture choices to a non-technical audience',
        'Prepare answers for: "What was the biggest challenge?" and "What would you do differently?"',
      ],
      quiz: [
        {
          question: 'What does the "A" in the STAR interview method stand for?',
          options: [
            'Assessment',
            'Action',
            'Analysis',
            'Approach',
          ],
          correctAnswer: 1,
        },
        {
          question: 'When discussing past projects in an interview, what should you focus on most?',
          options: [
            'The technologies and frameworks you used',
            'How many team members were involved',
            'Your specific contributions, decisions, and their impact',
            'The company you built it for',
          ],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 'selise-day-10',
      day: 10,
      title: 'Final Preparation',
      description: 'Apply and prepare',
      duration: '2 hours',
      resources: [
        { type: 'article', title: 'SELISE Careers', url: 'https://selise.ch/career/' },
        { type: 'practice', title: 'Pramp - Free Mock Interviews', url: 'https://www.pramp.com/' },
        { type: 'article', title: 'Questions to Ask Your Interviewer', url: 'https://www.themuse.com/advice/51-interview-questions-you-should-be-asking' },
      ],
      tasks: [
        'Review all weak areas from the 10-day preparation and do targeted practice',
        'Conduct a full mock interview: live coding + project discussion + Q&A',
        'Prepare 3-4 thoughtful questions about SELISE culture and Swiss work environment',
        'Submit your application to SELISE and tailor your resume for enterprise .NET roles!',
      ],
    },
  ],
}
