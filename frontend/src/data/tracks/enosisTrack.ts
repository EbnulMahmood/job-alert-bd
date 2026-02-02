import type { CompanyTrack } from '../learningTypes'

export const enosisTrack: CompanyTrack = {
  companyName: 'Enosis Solutions',
  companyType: 'private',
  description:
    'US client-focused - Strong OOP/algorithm testing, C#/.NET, SQL expertise required',
  totalDays: 12,
  interviewTips: [
    'Interview process: Written Test (algorithms + OOP MCQ) → Coding Test → Technical Interview → HR. Expect around 4 weeks end-to-end.',
    'OOP concepts are heavily tested - be ready to explain inheritance, polymorphism, and abstraction with real-world C# examples.',
    'Algorithm questions are typically easy to medium LeetCode difficulty. Focus on arrays, strings, and basic data structures.',
    'SQL is part of the written test - practice JOINs, subqueries, and aggregate functions thoroughly.',
    'SOLID principles come up frequently in the technical interview. Prepare concrete examples of applying each principle.',
    'Communication skills matter for US client-facing work. Practice explaining your thought process clearly while solving problems.',
  ],
  topics: [
    {
      id: 'enosis-day-1',
      day: 1,
      title: 'OOP Foundations in C#',
      description:
        'Master core OOP concepts: classes, inheritance, polymorphism, encapsulation, and abstraction with C# examples',
      duration: '1.5 hours',
      resources: [
        {
          type: 'article',
          title: 'Object-Oriented Programming - Microsoft Learn',
          url: 'https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/object-oriented/',
        },
        {
          type: 'article',
          title: 'Inheritance in C# - Microsoft Learn',
          url: 'https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/object-oriented/inheritance',
        },
        {
          type: 'video',
          title: 'OOP in C# - Full Course',
          url: 'https://www.youtube.com/watch?v=pTB0EiLXUC8',
        },
      ],
      tasks: [
        'Create a class hierarchy demonstrating inheritance and method overriding',
        'Implement polymorphism using abstract classes and interfaces',
        'Write examples showing encapsulation with properties and access modifiers',
        'Build a small console app using all four OOP pillars',
      ],
      quiz: [
        {
          question:
            'What is the difference between an abstract class and an interface in C#?',
          options: [
            'Abstract classes can have implementation, interfaces cannot (prior to C# 8)',
            'Interfaces can have constructors, abstract classes cannot',
            'Abstract classes support multiple inheritance, interfaces do not',
            'There is no difference in C#',
          ],
          correctAnswer: 0,
        },
        {
          question: 'Which keyword is used to prevent a class from being inherited in C#?',
          options: [
            'static',
            'abstract',
            'sealed',
            'readonly',
          ],
          correctAnswer: 2,
        },
        {
          question:
            'What is runtime polymorphism in C#?',
          options: [
            'Using method overloading with different parameter types',
            'Using generic type parameters',
            'Using operator overloading',
            'Using virtual/override methods resolved at runtime',
          ],
          correctAnswer: 3,
        },
      ],
    },
    {
      id: 'enosis-day-2',
      day: 2,
      title: 'SOLID Principles with C# Examples',
      description:
        'Deep dive into SOLID principles with practical C# implementations - a key focus area for Enosis interviews',
      duration: '1.5 hours',
      resources: [
        {
          type: 'article',
          title: 'SOLID Principles in C# - DotNetTutorials',
          url: 'https://dotnettutorials.net/lesson/solid-design-principles/',
        },
        {
          type: 'article',
          title: 'SOLID Principles - DigitalOcean',
          url: 'https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design',
        },
        {
          type: 'video',
          title: 'SOLID Principles in C# with Examples',
          url: 'https://www.youtube.com/watch?v=agkWYPUcLpg',
        },
      ],
      tasks: [
        'Refactor a class violating SRP into focused, single-responsibility classes',
        'Implement OCP using interfaces and strategy pattern',
        'Write code demonstrating LSP with a correct inheritance hierarchy',
        'Apply DIP by injecting dependencies through constructor injection',
      ],
      quiz: [
        {
          question:
            'Which SOLID principle states that a class should have only one reason to change?',
          options: [
            'Open/Closed Principle',
            'Single Responsibility Principle',
            'Liskov Substitution Principle',
            'Interface Segregation Principle',
          ],
          correctAnswer: 1,
        },
        {
          question:
            'What does the Dependency Inversion Principle recommend?',
          options: [
            'High-level modules should depend on low-level modules',
            'Classes should be open for modification',
            'Depend on abstractions, not concretions',
            'Use as few interfaces as possible',
          ],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 'enosis-day-3',
      day: 3,
      title: 'Design Patterns: Creational',
      description:
        'Study Factory Method, Singleton, and Builder patterns with C# implementations',
      duration: '1.5 hours',
      resources: [
        {
          type: 'article',
          title: 'Factory Method Pattern - Refactoring.Guru',
          url: 'https://refactoring.guru/design-patterns/factory-method',
        },
        {
          type: 'article',
          title: 'Singleton Pattern - Refactoring.Guru',
          url: 'https://refactoring.guru/design-patterns/singleton',
        },
        {
          type: 'article',
          title: 'Builder Pattern - Refactoring.Guru',
          url: 'https://refactoring.guru/design-patterns/builder',
        },
      ],
      tasks: [
        'Implement thread-safe Singleton using Lazy<T> in C#',
        'Build a Factory Method pattern for creating different notification types',
        'Create a Builder pattern for constructing complex configuration objects',
      ],
      quiz: [
        {
          question:
            'What problem does the Factory Method pattern solve?',
          options: [
            'Ensuring a class has only one instance',
            'Constructing complex objects step by step',
            'Creating objects without specifying the exact class to create',
            'Sharing objects to reduce memory usage',
          ],
          correctAnswer: 2,
        },
        {
          question:
            'Which is the recommended way to implement Singleton in C#?',
          options: [
            'Public constructor with static counter',
            'Lazy<T> with a private constructor',
            'Abstract factory with protected constructor',
            'Static class with no constructor',
          ],
          correctAnswer: 1,
        },
      ],
    },
    {
      id: 'enosis-day-4',
      day: 4,
      title: 'Design Patterns: Behavioral',
      description:
        'Learn Strategy, Observer, and Decorator patterns for flexible and maintainable code',
      duration: '1 hour',
      resources: [
        {
          type: 'article',
          title: 'Strategy Pattern - Refactoring.Guru',
          url: 'https://refactoring.guru/design-patterns/strategy',
        },
        {
          type: 'article',
          title: 'Observer Pattern - Refactoring.Guru',
          url: 'https://refactoring.guru/design-patterns/observer',
        },
        {
          type: 'article',
          title: 'Decorator Pattern - Refactoring.Guru',
          url: 'https://refactoring.guru/design-patterns/decorator',
        },
      ],
      tasks: [
        'Implement Strategy pattern for different sorting or payment processing strategies',
        'Build an Observer pattern using C# events and delegates',
        'Create a Decorator pattern to extend functionality of a logging service',
        'Compare when to use each pattern and document trade-offs',
      ],
    },
    {
      id: 'enosis-day-5',
      day: 5,
      title: 'C# Advanced Features',
      description:
        'Master generics, delegates, events, LINQ, and async/await - common topics in Enosis technical rounds',
      duration: '1.5 hours',
      resources: [
        {
          type: 'article',
          title: 'Generics in C# - Microsoft Learn',
          url: 'https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/generics',
        },
        {
          type: 'article',
          title: 'Asynchronous Programming - Microsoft Learn',
          url: 'https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/',
        },
        {
          type: 'practice',
          title: 'LINQ Tutorial - DotNetTutorials',
          url: 'https://dotnettutorials.net/lesson/introduction-to-linq/',
        },
      ],
      tasks: [
        'Create a generic repository class with constraints',
        'Write examples using delegates, Func<>, Action<>, and Predicate<>',
        'Solve 5 LINQ query challenges (filtering, grouping, projecting)',
        'Implement async/await with proper error handling and cancellation tokens',
      ],
      quiz: [
        {
          question: 'What is the purpose of the "where T : class" constraint in generics?',
          options: [
            'T must be a value type',
            'T must be a reference type',
            'T must have a parameterless constructor',
            'T must implement IDisposable',
          ],
          correctAnswer: 1,
        },
        {
          question: 'What happens when you await a Task that has already completed?',
          options: [
            'It throws an InvalidOperationException',
            'It blocks the current thread until the Task is restarted',
            'It returns the result synchronously without suspending',
            'It creates a new Task and runs it',
          ],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 'enosis-day-6',
      day: 6,
      title: 'SQL Deep Dive',
      description:
        'Master JOINs, subqueries, window functions, and advanced queries tested in the Enosis written exam',
      duration: '1.5 hours',
      resources: [
        {
          type: 'practice',
          title: 'SQLZoo Interactive Tutorials',
          url: 'https://sqlzoo.net/',
        },
        {
          type: 'article',
          title: 'Window Functions - PostgreSQL Tutorial',
          url: 'https://www.postgresqltutorial.com/postgresql-window-function/',
        },
        {
          type: 'practice',
          title: 'LeetCode SQL Problems',
          url: 'https://leetcode.com/problemset/database/',
        },
      ],
      tasks: [
        'Practice all JOIN types: INNER, LEFT, RIGHT, FULL OUTER, CROSS, and SELF joins',
        'Write correlated and non-correlated subqueries for complex data retrieval',
        'Use ROW_NUMBER(), RANK(), DENSE_RANK(), and PARTITION BY in window functions',
        'Solve 5 SQL problems on LeetCode (easy to medium)',
      ],
      quiz: [
        {
          question:
            'What is the difference between ROW_NUMBER() and RANK() window functions?',
          options: [
            'ROW_NUMBER() works only with ORDER BY, RANK() does not',
            'There is no difference; they are aliases',
            'RANK() assigns the same rank to ties and leaves gaps; ROW_NUMBER() always gives unique sequential numbers',
            'ROW_NUMBER() can only be used with PARTITION BY',
          ],
          correctAnswer: 2,
        },
        {
          question: 'What does a correlated subquery depend on?',
          options: [
            'It runs independently of the outer query',
            'It references columns from the outer query and runs once per outer row',
            'It always returns a single scalar value',
            'It can only be used in the WHERE clause',
          ],
          correctAnswer: 1,
        },
      ],
    },
    {
      id: 'enosis-day-7',
      day: 7,
      title: 'Database Design & Entity Framework Core',
      description:
        'Learn normalization, schema design, and EF Core for .NET applications',
      duration: '1.5 hours',
      resources: [
        {
          type: 'article',
          title: 'Database Normalization - Microsoft Learn',
          url: 'https://learn.microsoft.com/en-us/office/troubleshoot/access/database-normalization-description',
        },
        {
          type: 'article',
          title: 'EF Core Getting Started - Microsoft Learn',
          url: 'https://learn.microsoft.com/en-us/ef/core/get-started/overview/first-app',
        },
        {
          type: 'article',
          title: 'EF Core Relationships',
          url: 'https://learn.microsoft.com/en-us/ef/core/modeling/relationships',
        },
      ],
      tasks: [
        'Design a normalized database schema (3NF) for an e-commerce domain',
        'Implement Code First models with one-to-many and many-to-many relationships in EF Core',
        'Write migration scripts and seed data using EF Core migrations',
      ],
    },
    {
      id: 'enosis-day-8',
      day: 8,
      title: 'Algorithm Practice: Arrays & Strings',
      description:
        'Practice array and string algorithm problems using two pointer and sliding window techniques',
      duration: '1.5 hours',
      resources: [
        {
          type: 'practice',
          title: 'LeetCode - Two Pointers',
          url: 'https://leetcode.com/tag/two-pointers/',
        },
        {
          type: 'practice',
          title: 'LeetCode - Sliding Window',
          url: 'https://leetcode.com/tag/sliding-window/',
        },
        {
          type: 'article',
          title: 'Two Pointer Technique - GeeksforGeeks',
          url: 'https://www.geeksforgeeks.org/two-pointers-technique/',
        },
      ],
      tasks: [
        'Solve Two Sum and Three Sum using two pointer technique',
        'Implement sliding window for Maximum Subarray and Longest Substring Without Repeating Characters',
        'Practice string reversal, palindrome check, and anagram detection',
        'Time yourself: aim for 20-25 minutes per easy problem',
      ],
    },
    {
      id: 'enosis-day-9',
      day: 9,
      title: 'Algorithm Practice: Trees & Graphs',
      description:
        'Master tree traversals and graph search algorithms (BFS, DFS) commonly asked in Enosis coding tests',
      duration: '1.5 hours',
      resources: [
        {
          type: 'practice',
          title: 'LeetCode - Tree Problems',
          url: 'https://leetcode.com/tag/tree/',
        },
        {
          type: 'practice',
          title: 'LeetCode - Graph Problems',
          url: 'https://leetcode.com/tag/graph/',
        },
        {
          type: 'article',
          title: 'BFS and DFS Explained - GeeksforGeeks',
          url: 'https://www.geeksforgeeks.org/bfs-vs-dfs-binary-tree/',
        },
      ],
      tasks: [
        'Implement inorder, preorder, and postorder traversals iteratively and recursively',
        'Solve Maximum Depth of Binary Tree and Validate BST problems',
        'Implement BFS using a queue and DFS using recursion/stack for graph traversal',
        'Practice Number of Islands problem using DFS',
      ],
    },
    {
      id: 'enosis-day-10',
      day: 10,
      title: 'Unit Testing & TDD',
      description:
        'Learn xUnit testing framework and Test-Driven Development with Moq for mocking dependencies',
      duration: '1.5 hours',
      resources: [
        {
          type: 'article',
          title: 'Unit Testing in .NET - Microsoft Learn',
          url: 'https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-dotnet-test',
        },
        {
          type: 'article',
          title: 'Moq Quickstart - GitHub',
          url: 'https://github.com/devlooped/moq/wiki/Quickstart',
        },
        {
          type: 'video',
          title: 'TDD in C# - Nick Chapsas',
          url: 'https://www.youtube.com/watch?v=2Wp8en1I9oQ',
        },
      ],
      tasks: [
        'Set up an xUnit test project and write Arrange-Act-Assert style tests',
        'Use Moq to mock repository interfaces and test service layer logic',
        'Practice TDD: write a failing test first, then implement the code to make it pass',
        'Aim for at least 80% code coverage on a sample service class',
      ],
      quiz: [
        {
          question: 'What does the Arrange-Act-Assert pattern represent in unit testing?',
          options: [
            'Three separate test methods for each scenario',
            'Setup test data, execute the method under test, verify the result',
            'Write the test, run the test, deploy the code',
            'Create mocks, inject dependencies, call constructors',
          ],
          correctAnswer: 1,
        },
        {
          question: 'What is the primary purpose of mocking in unit tests?',
          options: [
            'To speed up test execution by caching results',
            'To test the database layer directly',
            'To isolate the unit under test by replacing its dependencies with controlled substitutes',
            'To generate test data automatically',
          ],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 'enosis-day-11',
      day: 11,
      title: '.NET Core Web API & Clean Architecture',
      description:
        'Build a RESTful API using ASP.NET Core following Clean Architecture principles',
      duration: '1.5 hours',
      resources: [
        {
          type: 'article',
          title: 'Create a Web API - Microsoft Learn',
          url: 'https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api',
        },
        {
          type: 'article',
          title: 'Clean Architecture in .NET - Jason Taylor',
          url: 'https://github.com/jasontaylordev/CleanArchitecture',
        },
        {
          type: 'video',
          title: 'Clean Architecture in ASP.NET Core',
          url: 'https://www.youtube.com/watch?v=dK4Yb6-LxAk',
        },
      ],
      tasks: [
        'Create a CRUD Web API with proper HTTP status codes and request validation',
        'Organize the project using Clean Architecture layers: Domain, Application, Infrastructure, API',
        'Implement dependency injection for services and repositories',
        'Add Swagger/OpenAPI documentation to the API',
      ],
    },
    {
      id: 'enosis-day-12',
      day: 12,
      title: 'Mock Interview & Application',
      description:
        'Simulate the full Enosis interview process and prepare your application',
      duration: '1.5 hours',
      resources: [
        {
          type: 'practice',
          title: 'LeetCode - Easy Problems',
          url: 'https://leetcode.com/problemset/all/?difficulty=EASY',
        },
        {
          type: 'article',
          title: 'C# Interview Questions - InterviewBit',
          url: 'https://www.interviewbit.com/c-sharp-interview-questions/',
        },
        {
          type: 'article',
          title: 'Enosis Solutions Careers',
          url: 'https://enosisbd.com/careers/',
        },
      ],
      tasks: [
        'Take a timed OOP + algorithm MCQ test (30 minutes, 20 questions)',
        'Solve 2 coding problems within 45 minutes (easy-medium difficulty)',
        'Practice explaining SOLID principles and design patterns verbally',
        'Update resume, review Enosis job openings, and submit your application',
      ],
    },
  ],
}
