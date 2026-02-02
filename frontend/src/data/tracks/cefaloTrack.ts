import type { CompanyTrack } from '../learningTypes'

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
      quiz: [
        {
          question: 'Which of the following is a value type in C#?',
          options: [
            'string',
            'object',
            'int',
            'class instance',
          ],
          correctAnswer: 2,
        },
        {
          question: 'What happens during boxing in C#?',
          options: [
            'A reference type is converted to a value type',
            'A value type is wrapped in an object and stored on the heap',
            'A variable is copied to a new memory location on the stack',
            'A class is converted to a struct',
          ],
          correctAnswer: 1,
        },
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
      quiz: [
        {
          question: 'What does the "await" keyword do in C#?',
          options: [
            'It blocks the current thread until the task completes',
            'It suspends the method and returns control to the caller until the awaited task completes',
            'It creates a new thread to run the task',
            'It cancels the current task',
          ],
          correctAnswer: 1,
        },
        {
          question: 'When should you use ValueTask instead of Task in C#?',
          options: [
            'When the operation always runs asynchronously',
            'When the result is frequently available synchronously to avoid heap allocation',
            'When you need to cancel the operation',
            'When multiple threads need to await the same result',
          ],
          correctAnswer: 1,
        },
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
      quiz: [
        {
          question: 'What is the difference between eager loading and lazy loading in EF Core?',
          options: [
            'Eager loading uses raw SQL; lazy loading uses LINQ',
            'Eager loading loads related data upfront with the query; lazy loading loads it on first access',
            'Eager loading is faster than lazy loading in all cases',
            'Lazy loading requires explicit Include() calls',
          ],
          correctAnswer: 1,
        },
        {
          question: 'Which method is used in EF Core to include related entities in a query?',
          options: [
            '.Join()',
            '.Include()',
            '.Attach()',
            '.Load()',
          ],
          correctAnswer: 1,
        },
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
      quiz: [
        {
          question: 'In ASP.NET Core, what is the lifetime of a Scoped service?',
          options: [
            'One instance for the entire application lifetime',
            'A new instance every time it is requested',
            'One instance per HTTP request',
            'One instance per thread',
          ],
          correctAnswer: 2,
        },
        {
          question: 'Which DI lifetime should be used for a DbContext in a typical web application?',
          options: [
            'Singleton',
            'Transient',
            'Scoped',
            'None - DbContext should not be registered in DI',
          ],
          correctAnswer: 2,
        },
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
      quiz: [
        {
          question: 'What does the Single Responsibility Principle (SRP) state?',
          options: [
            'A class should have only one method',
            'A class should have only one reason to change',
            'A class should only inherit from one base class',
            'A class should only implement one interface',
          ],
          correctAnswer: 1,
        },
        {
          question: 'Which SOLID principle states that software entities should be open for extension but closed for modification?',
          options: [
            'Single Responsibility Principle',
            'Liskov Substitution Principle',
            'Open/Closed Principle',
            'Interface Segregation Principle',
          ],
          correctAnswer: 2,
        },
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
      quiz: [
        {
          question: 'What is the primary purpose of mocking in unit tests?',
          options: [
            'To speed up test execution',
            'To isolate the unit under test by replacing its dependencies with controlled substitutes',
            'To test the database directly',
            'To generate random test data',
          ],
          correctAnswer: 1,
        },
        {
          question: 'In the Arrange-Act-Assert pattern, what happens in the "Arrange" phase?',
          options: [
            'The test assertions are evaluated',
            'The method under test is called',
            'Test preconditions and inputs are set up',
            'The test results are logged',
          ],
          correctAnswer: 2,
        },
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
      quiz: [
        {
          question: 'What is the difference between WHERE and HAVING in SQL?',
          options: [
            'There is no difference; they are interchangeable',
            'WHERE filters rows before grouping; HAVING filters groups after aggregation',
            'HAVING filters rows before grouping; WHERE filters after aggregation',
            'WHERE is used only with SELECT; HAVING is used only with INSERT',
          ],
          correctAnswer: 1,
        },
        {
          question: 'Which SQL clause is used to filter the results of aggregate functions like COUNT, SUM, AVG?',
          options: [
            'WHERE',
            'GROUP BY',
            'HAVING',
            'ORDER BY',
          ],
          correctAnswer: 2,
        },
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
      quiz: [
        {
          question: 'What is the time complexity of accessing an element by index in an array?',
          options: [
            'O(n)',
            'O(log n)',
            'O(1)',
            'O(n log n)',
          ],
          correctAnswer: 2,
        },
        {
          question: 'In the two-pointer technique, what is the typical initial setup for a sorted array?',
          options: [
            'Both pointers start at the beginning',
            'Both pointers start at the end',
            'One pointer starts at the beginning and the other at the end',
            'Pointers are placed at random positions',
          ],
          correctAnswer: 2,
        },
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
      quiz: [
        {
          question: 'What is the average time complexity of QuickSort?',
          options: [
            'O(n)',
            'O(n log n)',
            'O(n^2)',
            'O(log n)',
          ],
          correctAnswer: 1,
        },
        {
          question: 'Which sorting algorithm is stable and has O(n log n) worst-case time complexity?',
          options: [
            'QuickSort',
            'HeapSort',
            'MergeSort',
            'Selection Sort',
          ],
          correctAnswer: 2,
        },
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
      quiz: [
        {
          question: 'What is the default value of a bool variable in C#?',
          options: [
            'true',
            'false',
            'null',
            '0',
          ],
          correctAnswer: 1,
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
