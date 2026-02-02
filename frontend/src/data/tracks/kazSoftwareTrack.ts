import type { CompanyTrack } from '../learningTypes'

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
    {
      id: 'kaz-day-1',
      day: 1,
      title: 'C# Advanced Features',
      description: 'Review C# 10/11 features',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'What\'s new in C# 11 - Microsoft Docs', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-11' },
        { type: 'video', title: 'C# Advanced Topics - Mosh Hamedani', url: 'https://www.youtube.com/watch?v=gfkTfcpWqAY' },
        { type: 'article', title: 'Pattern Matching in C#', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/functional/pattern-matching' },
      ],
      tasks: [
        'Study records, pattern matching, and raw string literals',
        'Practice nullable reference types with a small project',
        'Implement examples using global using directives and file-scoped namespaces',
        'Write code using list patterns and required members',
      ],
      quiz: [
        {
          question: 'Which C# feature allows you to define immutable reference types with value-based equality?',
          options: [
            'Structs',
            'Records',
            'Static classes',
            'Sealed classes',
          ],
          correctAnswer: 1,
        },
        {
          question: 'What does the "required" modifier in C# 11 do?',
          options: [
            'Makes a method abstract',
            'Forces derived classes to override a property',
            'Ensures a property must be set during object initialization',
            'Makes a field readonly',
          ],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 'kaz-day-2',
      day: 2,
      title: '.NET Core Web API',
      description: 'API development',
      duration: '2 hours',
      resources: [
        { type: 'article', title: 'Create a Web API with ASP.NET Core', url: 'https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api' },
        { type: 'video', title: 'ASP.NET Core Web API Tutorial', url: 'https://www.youtube.com/watch?v=fmvcAzHpsk8' },
        { type: 'article', title: 'JWT Authentication in ASP.NET Core', url: 'https://learn.microsoft.com/en-us/aspnet/core/security/authentication/' },
      ],
      tasks: [
        'Build a REST API with full CRUD operations',
        'Implement JWT-based authentication and authorization',
        'Add model validation with data annotations and FluentValidation',
        'Configure middleware pipeline (CORS, error handling, logging)',
      ],
    },
    {
      id: 'kaz-day-3',
      day: 3,
      title: 'React/Angular Basics',
      description: 'Frontend framework basics',
      duration: '2 hours',
      resources: [
        { type: 'article', title: 'React Official Tutorial', url: 'https://react.dev/learn' },
        { type: 'video', title: 'Angular Crash Course - Traversy Media', url: 'https://www.youtube.com/watch?v=3dHNOWTI7H8' },
        { type: 'article', title: 'Angular Official Getting Started', url: 'https://angular.dev/tutorials/learn-angular' },
      ],
      tasks: [
        'Create functional React components with hooks (useState, useEffect)',
        'Build an Angular component with services and dependency injection',
        'Implement state management (React Context or NgRx basics)',
        'Build a simple form with validation in your preferred framework',
      ],
      quiz: [
        {
          question: 'In React, which hook is used to perform side effects in function components?',
          options: [
            'useState',
            'useContext',
            'useEffect',
            'useReducer',
          ],
          correctAnswer: 2,
        },
        {
          question: 'In Angular, what decorator marks a class as available for dependency injection?',
          options: [
            '@Component',
            '@Injectable',
            '@NgModule',
            '@Directive',
          ],
          correctAnswer: 1,
        },
      ],
    },
    {
      id: 'kaz-day-4',
      day: 4,
      title: 'TypeScript Essentials',
      description: 'TypeScript for frontend',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html' },
        { type: 'video', title: 'TypeScript Full Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=30LWjhZzg50' },
        { type: 'practice', title: 'TypeScript Exercises', url: 'https://typescript-exercises.github.io/' },
      ],
      tasks: [
        'Practice types, interfaces, and type aliases',
        'Implement generics with constraints for reusable utility functions',
        'Use union types, intersection types, and discriminated unions',
        'Write utility types (Partial, Pick, Omit, Record) in practice scenarios',
      ],
    },
    {
      id: 'kaz-day-5',
      day: 5,
      title: 'Azure/AWS Basics',
      description: 'Cloud fundamentals',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'Deploy ASP.NET Core to Azure App Service', url: 'https://learn.microsoft.com/en-us/azure/app-service/quickstart-dotnetcore' },
        { type: 'video', title: 'AWS for Beginners - freeCodeCamp', url: 'https://www.youtube.com/watch?v=ulprqHHWlng' },
        { type: 'article', title: 'Azure Blob Storage Overview', url: 'https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction' },
      ],
      tasks: [
        'Deploy a .NET API to Azure App Service or AWS Elastic Beanstalk',
        'Use blob storage (Azure Blob or AWS S3) for file uploads',
        'Set up application settings and connection strings in cloud config',
        'Understand basics of Azure SQL Database or AWS RDS',
      ],
      quiz: [
        {
          question: 'Which Azure service is primarily used for hosting web applications and APIs?',
          options: [
            'Azure Functions',
            'Azure App Service',
            'Azure Blob Storage',
            'Azure Service Bus',
          ],
          correctAnswer: 1,
        },
        {
          question: 'Which AWS service is the equivalent of Azure Blob Storage for object storage?',
          options: [
            'AWS EC2',
            'AWS Lambda',
            'Amazon S3',
            'Amazon RDS',
          ],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 'kaz-day-6',
      day: 6,
      title: 'SQL Server',
      description: 'Database skills',
      duration: '1.5 hours',
      resources: [
        { type: 'practice', title: 'SQLZoo Interactive Tutorial', url: 'https://sqlzoo.net/' },
        { type: 'article', title: 'SQL Server Query Performance Tuning', url: 'https://learn.microsoft.com/en-us/sql/relational-databases/performance/query-processing-architecture-guide' },
        { type: 'practice', title: 'HackerRank SQL Challenges', url: 'https://www.hackerrank.com/domains/sql' },
      ],
      tasks: [
        'Write complex queries with JOINs, subqueries, and CTEs',
        'Practice performance tuning with indexes and execution plans',
        'Implement stored procedures and user-defined functions',
        'Understand transaction isolation levels and deadlock prevention',
      ],
    },
    {
      id: 'kaz-day-7',
      day: 7,
      title: 'System Design Basics',
      description: 'Architecture patterns',
      duration: '2 hours',
      resources: [
        { type: 'video', title: 'System Design for Beginners - Gaurav Sen', url: 'https://www.youtube.com/watch?v=xpDnVSmNFX0' },
        { type: 'article', title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer' },
        { type: 'article', title: 'Microservices Architecture - Microsoft', url: 'https://learn.microsoft.com/en-us/dotnet/architecture/microservices/' },
      ],
      tasks: [
        'Design a URL shortener system (discuss database, caching, API)',
        'Design a simple e-commerce system with trade-off discussions',
        'Understand load balancing, caching strategies, and CDN usage',
        'Study microservices vs monolith trade-offs with real examples',
      ],
      quiz: [
        {
          question: 'Which caching strategy updates the cache only when data is requested and not found?',
          options: [
            'Write-through cache',
            'Write-behind cache',
            'Cache-aside (Lazy Loading)',
            'Read-through cache',
          ],
          correctAnswer: 2,
        },
        {
          question: 'What is the primary purpose of a load balancer in system design?',
          options: [
            'Encrypt network traffic',
            'Store session data',
            'Distribute incoming traffic across multiple servers',
            'Compress response data',
          ],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 'kaz-day-8',
      day: 8,
      title: 'Testing',
      description: 'Unit and integration testing',
      duration: '1.5 hours',
      resources: [
        { type: 'article', title: 'Unit Testing in .NET with xUnit', url: 'https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-dotnet-test' },
        { type: 'video', title: 'Unit Testing in C# - Nick Chapsas', url: 'https://www.youtube.com/watch?v=aq3e_z-MHVc' },
        { type: 'article', title: 'Integration Testing in ASP.NET Core', url: 'https://learn.microsoft.com/en-us/aspnet/core/test/integration-tests' },
      ],
      tasks: [
        'Write xUnit tests with Arrange-Act-Assert pattern',
        'Mock dependencies using Moq or NSubstitute',
        'Set up integration tests with WebApplicationFactory',
        'Aim for 80%+ code coverage on a sample service class',
      ],
    },
    {
      id: 'kaz-day-9',
      day: 9,
      title: 'DSA Practice',
      description: 'Problem solving',
      duration: '2 hours',
      resources: [
        { type: 'practice', title: 'LeetCode - Top Interview Questions', url: 'https://leetcode.com/problem-list/top-interview-questions/' },
        { type: 'practice', title: 'NeetCode Roadmap', url: 'https://neetcode.io/roadmap' },
        { type: 'video', title: 'Data Structures Easy to Advanced - freeCodeCamp', url: 'https://www.youtube.com/watch?v=RBSGKlAvoiM' },
      ],
      tasks: [
        'Solve 3 easy and 2 medium LeetCode problems (arrays, strings, hash maps)',
        'Practice explaining solutions out loud as if in an interview',
        'Implement common patterns: two pointers, sliding window, BFS/DFS',
        'Time yourself - aim for 15 min per easy, 25 min per medium problem',
      ],
      quiz: [
        {
          question: 'What is the time complexity of looking up a value in a hash map (average case)?',
          options: [
            'O(n)',
            'O(log n)',
            'O(1)',
            'O(n log n)',
          ],
          correctAnswer: 2,
        },
        {
          question: 'Which algorithm technique is best suited for finding the longest substring without repeating characters?',
          options: [
            'Dynamic Programming',
            'Divide and Conquer',
            'Sliding Window',
            'Greedy',
          ],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 'kaz-day-10',
      day: 10,
      title: 'Mock Interview',
      description: 'Final preparation',
      duration: '2 hours',
      resources: [
        { type: 'article', title: 'Kaz Software Careers', url: 'https://kaz.com.bd/career' },
        { type: 'practice', title: 'Pramp - Free Mock Interviews', url: 'https://www.pramp.com/' },
        { type: 'article', title: 'STAR Method for Behavioral Questions', url: 'https://www.themuse.com/advice/star-interview-method' },
      ],
      tasks: [
        'Conduct a full technical mock interview (45 min coding + 15 min Q&A)',
        'Review all weak areas identified during the 10-day preparation',
        'Prepare 3-4 questions to ask the interviewer about Kaz Software',
        'Apply to Kaz Software and tailor resume for full-stack roles!',
      ],
    },
  ],
}
