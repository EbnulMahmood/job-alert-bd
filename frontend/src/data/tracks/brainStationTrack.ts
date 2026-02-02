import type { CompanyTrack } from '../learningTypes'

export const brainStationTrack: CompanyTrack = {
  companyName: 'Brain Station 23',
  companyType: 'private',
  description:
    "Bangladesh's largest software company (700+ engineers) - Diverse projects, .NET/Java/JS stacks",
  totalDays: 12,
  interviewTips: [
    'Brain Station 23 is the largest local software company in Bangladesh with 700+ engineers - they hire frequently across multiple positions and experience levels',
    'They have diverse tech stacks across projects (.NET, Java, JavaScript/TypeScript, React, Angular) so demonstrating breadth of knowledge is valuable',
    'The interview process is: Written Test (MCQ + coding) followed by Technical Interview and HR round - prepare for a mix of theory and hands-on coding',
    'Great entry point for freshers and junior developers - they have structured training programs and mentorship opportunities',
    'For mid-level and senior positions, expect system design questions - be prepared to discuss scalability, database design, and architectural patterns',
    'Communication skills are highly valued at Brain Station 23 - practice explaining technical concepts clearly and concisely in both Bangla and English',
  ],
  topics: [
    {
      id: 'bs23-day-1',
      day: 1,
      title: 'C# and .NET Core Deep Dive',
      description:
        'Master C# language features and .NET Core fundamentals. Cover async/await, LINQ, generics, dependency injection, and the .NET Core middleware pipeline.',
      duration: '1.5 hours',
      resources: [
        {
          type: 'article',
          title: 'C# Fundamentals - Microsoft Learn',
          url: 'https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/',
        },
        {
          type: 'article',
          title: '.NET Core Overview - Microsoft Learn',
          url: 'https://learn.microsoft.com/en-us/dotnet/core/introduction',
        },
        {
          type: 'article',
          title: 'Async Programming in C# - Microsoft Learn',
          url: 'https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/',
        },
      ],
      tasks: [
        'Review C# value types vs reference types, nullable types, and pattern matching',
        'Practice LINQ queries: filtering, projection, grouping, and aggregation with method syntax',
        'Implement async/await examples - understand Task, ValueTask, and cancellation tokens',
        'Study dependency injection in .NET Core: Singleton, Scoped, and Transient lifetimes',
      ],
      quiz: [
        {
          question:
            'What is the default lifetime for services registered with AddScoped() in .NET Core?',
          options: [
            'One instance per application',
            'One instance per HTTP request',
            'New instance every time it is requested',
            'One instance per thread',
          ],
          correctAnswer: 1,
        },
        {
          question:
            'Which LINQ method is used to flatten a collection of collections into a single collection?',
          options: ['Select', 'SelectMany', 'Flatten', 'Aggregate'],
          correctAnswer: 1,
        },
      ],
    },
    {
      id: 'bs23-day-2',
      day: 2,
      title: 'ASP.NET Core Web API',
      description:
        'Build production-ready RESTful APIs with ASP.NET Core. Cover routing, model binding, validation, middleware, authentication, and Swagger documentation.',
      duration: '1.5 hours',
      resources: [
        {
          type: 'article',
          title: 'Web API Tutorial - Microsoft Learn',
          url: 'https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api',
        },
        {
          type: 'article',
          title: 'ASP.NET Core Middleware - Microsoft Learn',
          url: 'https://learn.microsoft.com/en-us/aspnet/core/fundamentals/middleware/',
        },
        {
          type: 'article',
          title: 'Model Validation - Microsoft Learn',
          url: 'https://learn.microsoft.com/en-us/aspnet/core/mvc/models/validation',
        },
      ],
      tasks: [
        'Build a complete CRUD Web API for an employee management system with proper HTTP verbs',
        'Implement request validation using Data Annotations and custom validation attributes',
        'Add JWT authentication and role-based authorization to your API endpoints',
        'Configure Swagger/OpenAPI documentation and test endpoints through the Swagger UI',
      ],
    },
    {
      id: 'bs23-day-3',
      day: 3,
      title: 'JavaScript / TypeScript Essentials',
      description:
        'Core JavaScript concepts and TypeScript type system. Cover closures, promises, async/await, ES6+ features, and TypeScript interfaces, generics, and utility types.',
      duration: '1.5 hours',
      resources: [
        {
          type: 'article',
          title: 'JavaScript Guide - MDN',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
        },
        {
          type: 'article',
          title: 'TypeScript Handbook',
          url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
        },
        {
          type: 'practice',
          title: 'TypeScript Exercises',
          url: 'https://typescript-exercises.github.io/',
        },
      ],
      tasks: [
        'Master closures, hoisting, and the event loop - explain each with code examples',
        'Practice Promise chaining and async/await error handling patterns',
        'Define TypeScript interfaces, types, generics, and utility types (Partial, Pick, Omit)',
        'Solve 5 JavaScript coding challenges focusing on array methods (map, filter, reduce)',
      ],
      quiz: [
        {
          question: 'What does the "this" keyword refer to inside an arrow function in JavaScript?',
          options: [
            'The global window object',
            'The object that called the function',
            'The lexically enclosing context (parent scope)',
            'undefined',
          ],
          correctAnswer: 2,
        },
        {
          question:
            'In TypeScript, what is the difference between "interface" and "type"?',
          options: [
            'Interfaces cannot extend other interfaces',
            'Types cannot represent object shapes',
            'Interfaces support declaration merging while types do not',
            'There is absolutely no difference between them',
          ],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 'bs23-day-4',
      day: 4,
      title: 'React / Frontend Fundamentals',
      description:
        'React component architecture, hooks, state management, and frontend best practices. Cover functional components, common hooks, context API, and basic performance optimization.',
      duration: '1.5 hours',
      resources: [
        {
          type: 'article',
          title: 'React Official Documentation',
          url: 'https://react.dev/learn',
        },
        {
          type: 'article',
          title: 'React Hooks Reference',
          url: 'https://react.dev/reference/react/hooks',
        },
        {
          type: 'article',
          title: 'React State Management - GeeksforGeeks',
          url: 'https://www.geeksforgeeks.org/reactjs-state-management/',
        },
      ],
      tasks: [
        'Build a task management app using functional components with useState, useEffect, and useRef',
        'Implement global state with Context API and useReducer as a Redux alternative',
        'Practice component composition patterns: children props, render props, and custom hooks',
        'Understand React rendering lifecycle and apply useMemo/useCallback for optimization',
      ],
    },
    {
      id: 'bs23-day-5',
      day: 5,
      title: 'SQL & Database Design',
      description:
        'Relational database design and advanced SQL. Cover normalization, ER diagrams, JOINs, subqueries, window functions, and query optimization.',
      duration: '1.5 hours',
      resources: [
        {
          type: 'practice',
          title: 'SQLZoo Interactive Tutorial',
          url: 'https://sqlzoo.net/wiki/SQL_Tutorial',
        },
        {
          type: 'article',
          title: 'Database Normalization - GeeksforGeeks',
          url: 'https://www.geeksforgeeks.org/normal-forms-in-dbms/',
        },
        {
          type: 'practice',
          title: 'LeetCode SQL Problems',
          url: 'https://leetcode.com/problemset/database/',
        },
      ],
      tasks: [
        'Design a normalized database schema (3NF) for an e-commerce system with proper relationships',
        'Write complex JOINs combining 3+ tables and practice all JOIN types',
        'Implement window functions: ROW_NUMBER, RANK, DENSE_RANK, and running totals with SUM() OVER',
        'Solve 5 SQL problems on LeetCode covering subqueries, GROUP BY, and HAVING',
      ],
      quiz: [
        {
          question:
            'Which type of JOIN returns rows only when there is a match in both tables?',
          options: [
            'LEFT JOIN',
            'RIGHT JOIN',
            'INNER JOIN',
            'CROSS JOIN',
          ],
          correctAnswer: 2,
        },
        {
          question:
            'What is the purpose of database indexing?',
          options: [
            'To encrypt sensitive data in the database',
            'To speed up data retrieval operations at the cost of additional storage and slower writes',
            'To automatically backup data at regular intervals',
            'To enforce referential integrity between tables',
          ],
          correctAnswer: 1,
        },
      ],
    },
    {
      id: 'bs23-day-6',
      day: 6,
      title: 'OOP & SOLID Principles',
      description:
        'Object-Oriented Programming fundamentals and SOLID design principles. Apply these concepts with practical C# and Java examples relevant to enterprise software development.',
      duration: '1 hour',
      resources: [
        {
          type: 'article',
          title: 'SOLID Principles - DigitalOcean',
          url: 'https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design',
        },
        {
          type: 'article',
          title: 'OOP in C# - Microsoft Learn',
          url: 'https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/object-oriented/',
        },
        {
          type: 'article',
          title: 'OOP Concepts - GeeksforGeeks',
          url: 'https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/',
        },
      ],
      tasks: [
        'Explain each SOLID principle with a real-world code example showing before (violation) and after (correct)',
        'Implement abstraction using interfaces and abstract classes for a payment processing system',
        'Practice explaining inheritance vs composition - when to use which and why',
        'Refactor a poorly designed class to follow the Single Responsibility Principle',
      ],
    },
    {
      id: 'bs23-day-7',
      day: 7,
      title: 'Design Patterns in Practice',
      description:
        'Learn the most commonly asked design patterns. Implement Repository, Factory, Strategy, Observer, and Singleton patterns with real-world use cases.',
      duration: '1.5 hours',
      resources: [
        {
          type: 'article',
          title: 'Design Patterns - Refactoring Guru',
          url: 'https://refactoring.guru/design-patterns',
        },
        {
          type: 'article',
          title: 'C# Design Patterns - GeeksforGeeks',
          url: 'https://www.geeksforgeeks.org/software-design-patterns/',
        },
        {
          type: 'article',
          title: 'Repository Pattern - Microsoft Learn',
          url: 'https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design',
        },
      ],
      tasks: [
        'Implement the Repository Pattern with Unit of Work for data access abstraction',
        'Build a notification system using Factory Pattern (Email, SMS, Push notification)',
        'Implement Strategy Pattern for a shipping cost calculator with different shipping providers',
        'Create a real-time event system using the Observer Pattern',
      ],
      quiz: [
        {
          question:
            'Which design pattern separates the data access logic from the business logic?',
          options: [
            'Factory Pattern',
            'Strategy Pattern',
            'Repository Pattern',
            'Observer Pattern',
          ],
          correctAnswer: 2,
        },
        {
          question:
            'The Strategy Pattern is most useful when:',
          options: [
            'You need to ensure only one instance of a class exists',
            'You want to define a family of interchangeable algorithms at runtime',
            'You need to notify multiple objects about state changes',
            'You want to create objects without specifying the exact class',
          ],
          correctAnswer: 1,
        },
      ],
    },
    {
      id: 'bs23-day-8',
      day: 8,
      title: 'DSA Core Problems (Arrays, Strings, Hash Maps)',
      description:
        'Fundamental data structures and algorithm problems. Focus on patterns that appear frequently in written coding tests: two pointers, sliding window, hash maps, and string manipulation.',
      duration: '1.5 hours',
      resources: [
        {
          type: 'practice',
          title: 'LeetCode Arrays',
          url: 'https://leetcode.com/tag/array/',
        },
        {
          type: 'practice',
          title: 'LeetCode Hash Table',
          url: 'https://leetcode.com/tag/hash-table/',
        },
        {
          type: 'article',
          title: 'Common Patterns - GeeksforGeeks',
          url: 'https://www.geeksforgeeks.org/top-50-array-coding-problems-for-interviews/',
        },
      ],
      tasks: [
        'Solve Two Sum, Three Sum, and Maximum Subarray (Kadane\'s algorithm) on LeetCode',
        'Practice string problems: valid anagram, longest common prefix, string to integer',
        'Master HashMap patterns: frequency counting, group anagrams, first non-repeating character',
        'Implement sliding window technique: maximum sum subarray of size k, longest substring without repeating characters',
      ],
    },
    {
      id: 'bs23-day-9',
      day: 9,
      title: 'DSA Advanced (Trees, Graphs, Basic DP)',
      description:
        'Advanced data structures including binary trees, BST operations, graph traversals (BFS/DFS), and introductory dynamic programming problems.',
      duration: '1.5 hours',
      resources: [
        {
          type: 'practice',
          title: 'LeetCode Tree Problems',
          url: 'https://leetcode.com/tag/tree/',
        },
        {
          type: 'practice',
          title: 'LeetCode Dynamic Programming',
          url: 'https://leetcode.com/tag/dynamic-programming/',
        },
        {
          type: 'article',
          title: 'Graph Algorithms - GeeksforGeeks',
          url: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/',
        },
      ],
      tasks: [
        'Implement binary tree traversals (inorder, preorder, postorder) and solve max depth, symmetric tree problems',
        'Practice BFS and DFS on graphs: number of islands, detect cycle, shortest path in unweighted graph',
        'Solve introductory DP problems: climbing stairs, fibonacci, coin change, 0/1 knapsack',
        'Understand memoization vs tabulation and when to apply each approach',
      ],
    },
    {
      id: 'bs23-day-10',
      day: 10,
      title: 'System Design Fundamentals',
      description:
        'Learn to design scalable systems. Cover load balancing, caching, database sharding, message queues, and microservices architecture - important for mid-level and above.',
      duration: '1.5 hours',
      resources: [
        {
          type: 'article',
          title: 'System Design Primer - GitHub',
          url: 'https://github.com/donnemartin/system-design-primer',
        },
        {
          type: 'article',
          title: 'Microservices Architecture - Microsoft Learn',
          url: 'https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/microservices',
        },
        {
          type: 'article',
          title: 'System Design Concepts - GeeksforGeeks',
          url: 'https://www.geeksforgeeks.org/system-design-tutorial/',
        },
      ],
      tasks: [
        'Design a URL shortener system covering database schema, API design, and scaling strategies',
        'Understand caching strategies (LRU, write-through, write-back) and when to use Redis vs in-memory cache',
        'Study load balancing algorithms (round robin, least connections, IP hash) and their trade-offs',
        'Design a basic notification service using message queues (Kafka/RabbitMQ concepts)',
      ],
      quiz: [
        {
          question:
            'Which caching strategy writes data to both the cache and database simultaneously?',
          options: [
            'Cache-aside (Lazy loading)',
            'Write-through',
            'Write-back (Write-behind)',
            'Read-through',
          ],
          correctAnswer: 1,
        },
        {
          question:
            'In a microservices architecture, which component acts as a single entry point for all client requests?',
          options: [
            'Load Balancer',
            'Service Registry',
            'API Gateway',
            'Message Broker',
          ],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 'bs23-day-11',
      day: 11,
      title: 'Testing, Docker & CI/CD',
      description:
        'DevOps and quality assurance fundamentals. Cover unit testing with xUnit/Jest, Docker containerization, and CI/CD pipeline concepts.',
      duration: '1 hour',
      resources: [
        {
          type: 'article',
          title: 'Unit Testing in .NET - Microsoft Learn',
          url: 'https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-dotnet-test',
        },
        {
          type: 'article',
          title: 'Docker for .NET - Microsoft Learn',
          url: 'https://learn.microsoft.com/en-us/dotnet/core/docker/introduction',
        },
        {
          type: 'article',
          title: 'CI/CD Concepts - GeeksforGeeks',
          url: 'https://www.geeksforgeeks.org/what-is-ci-cd/',
        },
      ],
      tasks: [
        'Write unit tests for a service layer using xUnit with Moq for mocking dependencies',
        'Create a Dockerfile for a .NET Core Web API and build/run the container locally',
        'Understand CI/CD pipeline stages: build, test, deploy - explain how GitHub Actions or GitLab CI works',
        'Practice writing a basic docker-compose.yml for a multi-service application (API + database)',
      ],
    },
    {
      id: 'bs23-day-12',
      day: 12,
      title: 'Mock Interview & Application',
      description:
        'Final preparation day. Simulate the complete Brain Station 23 hiring process with a mock written test, technical interview, and prepare your application materials.',
      duration: '1.5 hours',
      resources: [
        {
          type: 'practice',
          title: 'LeetCode Mock Assessment',
          url: 'https://leetcode.com/assessment/',
        },
        {
          type: 'article',
          title: 'Brain Station 23 Careers',
          url: 'https://brainstation-23.com/career/',
        },
        {
          type: 'practice',
          title: 'SQLZoo Quick Quiz',
          url: 'https://sqlzoo.net/wiki/SELECT_Quiz',
        },
      ],
      tasks: [
        'Take a timed mock written test: 15 MCQs on C#, JS, SQL, OOP + 2 coding problems (60 minutes)',
        'Do a mock technical interview with a friend covering system design and project experience',
        'Review all weak areas identified during the past 11 days and revise key concepts',
        'Update your resume highlighting relevant tech stack, apply to Brain Station 23, and prepare thoughtful questions for the interviewer',
      ],
    },
  ],
}
