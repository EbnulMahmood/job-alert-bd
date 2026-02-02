import type { CompanyTrack } from '../learningTypes'

export const bjitTrack: CompanyTrack = {
  companyName: 'BJIT',
  companyType: 'private',
  description:
    'Japanese client-focused - Diverse tech stack (.NET, Java, Python), quality and process emphasis',
  totalDays: 12,
  interviewTips: [
    'Interview process: Written Test (programming + aptitude) → Technical Interview → HR. Prepare for a diverse range of technical questions.',
    'BJIT works with multiple tech stacks (.NET, Java, Python, React) - showing breadth across technologies is valued over deep specialization in one.',
    'Japanese client culture emphasizes quality, attention to detail, and thorough documentation. Highlight these traits in your interview.',
    'Communication skills are critical - BJIT values candidates who can articulate ideas clearly and work effectively in cross-cultural teams.',
    'Agile methodology (Scrum) is practiced across projects. Be prepared to discuss sprint planning, retrospectives, and daily standups.',
    'Expect aptitude questions alongside programming in the written test - practice logical reasoning and problem-solving speed.',
  ],
  topics: [
    {
      id: 'bjit-day-1',
      day: 1,
      title: 'C# / .NET Core Fundamentals',
      description:
        'Review core C# and .NET fundamentals - the primary backend stack at BJIT',
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
          type: 'video',
          title: 'C# for Beginners - dotnet',
          url: 'https://www.youtube.com/watch?v=BM4CHBmAPh4',
        },
      ],
      tasks: [
        'Review value types vs reference types, boxing/unboxing',
        'Practice collections: List<T>, Dictionary<TKey,TValue>, HashSet<T>',
        'Write examples using LINQ queries (method syntax and query syntax)',
        'Understand async/await and Task-based asynchronous pattern',
      ],
      quiz: [
        {
          question:
            'What is the difference between "string" and "String" in C#?',
          options: [
            '"string" is a value type while "String" is a reference type',
            'They are identical - "string" is an alias for System.String',
            '"String" supports more methods than "string"',
            '"string" is mutable while "String" is immutable',
          ],
          correctAnswer: 1,
        },
        {
          question: 'What is the default access modifier for a class in C#?',
          options: [
            'public',
            'private',
            'internal',
            'protected',
          ],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 'bjit-day-2',
      day: 2,
      title: 'ASP.NET Core Web API Development',
      description:
        'Build RESTful APIs with ASP.NET Core - the standard backend framework used in BJIT projects',
      duration: '1.5 hours',
      resources: [
        {
          type: 'article',
          title: 'Create a Web API - Microsoft Learn',
          url: 'https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api',
        },
        {
          type: 'article',
          title: 'Dependency Injection in ASP.NET Core',
          url: 'https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection',
        },
        {
          type: 'article',
          title: 'Middleware in ASP.NET Core',
          url: 'https://learn.microsoft.com/en-us/aspnet/core/fundamentals/middleware/',
        },
      ],
      tasks: [
        'Create a CRUD Web API with proper routing and HTTP methods',
        'Implement dependency injection for service and repository layers',
        'Add request validation using data annotations and FluentValidation',
        'Configure middleware pipeline and understand request/response flow',
      ],
    },
    {
      id: 'bjit-day-3',
      day: 3,
      title: 'React Fundamentals',
      description:
        'Learn React component architecture, hooks, and state management used in BJIT frontend projects',
      duration: '1.5 hours',
      resources: [
        {
          type: 'article',
          title: 'React Official Tutorial',
          url: 'https://react.dev/learn',
        },
        {
          type: 'article',
          title: 'React Hooks Reference',
          url: 'https://react.dev/reference/react/hooks',
        },
        {
          type: 'video',
          title: 'React Crash Course',
          url: 'https://www.youtube.com/watch?v=LDB4uaJ87e0',
        },
      ],
      tasks: [
        'Build functional components using JSX and props',
        'Implement useState and useEffect hooks for state and side effects',
        'Create a form with controlled inputs and validation',
        'Practice lifting state up and component composition patterns',
      ],
      quiz: [
        {
          question: 'What is the purpose of the useEffect hook in React?',
          options: [
            'To define state variables in a component',
            'To perform side effects like data fetching and subscriptions',
            'To memoize expensive calculations',
            'To create context providers',
          ],
          correctAnswer: 1,
        },
        {
          question:
            'What happens if you pass an empty dependency array [] to useEffect?',
          options: [
            'The effect runs on every render',
            'The effect never runs',
            'The effect runs only once after the initial render',
            'The effect runs only when the component unmounts',
          ],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 'bjit-day-4',
      day: 4,
      title: 'TypeScript Essentials',
      description:
        'Master TypeScript fundamentals for type-safe frontend development in React projects',
      duration: '1 hour',
      resources: [
        {
          type: 'article',
          title: 'TypeScript Handbook',
          url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
        },
        {
          type: 'article',
          title: 'TypeScript with React - React Docs',
          url: 'https://react.dev/learn/typescript',
        },
        {
          type: 'practice',
          title: 'TypeScript Exercises',
          url: 'https://typescript-exercises.github.io/',
        },
      ],
      tasks: [
        'Define interfaces and types for component props and API responses',
        'Use generics for reusable utility functions and components',
        'Practice union types, intersection types, and type guards',
        'Type a React component with proper event handlers and refs',
      ],
    },
    {
      id: 'bjit-day-5',
      day: 5,
      title: 'SQL & Database Design',
      description:
        'Strengthen SQL skills and database design knowledge for the BJIT written test',
      duration: '1.5 hours',
      resources: [
        {
          type: 'practice',
          title: 'SQLZoo Interactive Tutorials',
          url: 'https://sqlzoo.net/',
        },
        {
          type: 'article',
          title: 'Database Normalization - Microsoft Learn',
          url: 'https://learn.microsoft.com/en-us/office/troubleshoot/access/database-normalization-description',
        },
        {
          type: 'practice',
          title: 'LeetCode SQL Problems',
          url: 'https://leetcode.com/problemset/database/',
        },
      ],
      tasks: [
        'Practice INNER, LEFT, RIGHT, and FULL OUTER JOINs with multi-table queries',
        'Write subqueries and Common Table Expressions (CTEs)',
        'Design a normalized schema (3NF) for a project management system',
        'Solve 5 SQL problems on LeetCode or SQLZoo',
      ],
      quiz: [
        {
          question: 'What is the primary purpose of database normalization?',
          options: [
            'To speed up all query operations',
            'To reduce data redundancy and improve data integrity',
            'To add more indexes to tables',
            'To combine all data into a single table',
          ],
          correctAnswer: 1,
        },
        {
          question: 'What does a LEFT JOIN return?',
          options: [
            'Only rows that have matching values in both tables',
            'All rows from the right table and matched rows from the left',
            'All rows from the left table and matched rows from the right, with NULL for non-matches',
            'All rows from both tables regardless of matches',
          ],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 'bjit-day-6',
      day: 6,
      title: 'OOP & Design Patterns',
      description:
        'Review OOP fundamentals and essential design patterns for writing maintainable code',
      duration: '1.5 hours',
      resources: [
        {
          type: 'article',
          title: 'OOP Concepts - Microsoft Learn',
          url: 'https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/object-oriented/',
        },
        {
          type: 'article',
          title: 'Design Patterns Catalog - Refactoring.Guru',
          url: 'https://refactoring.guru/design-patterns/catalog',
        },
        {
          type: 'article',
          title: 'SOLID Principles - DigitalOcean',
          url: 'https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design',
        },
      ],
      tasks: [
        'Implement the four pillars of OOP with C# examples',
        'Practice Repository pattern and Unit of Work pattern',
        'Implement Strategy and Factory patterns for a real-world scenario',
        'Review SOLID principles and identify violations in sample code',
      ],
    },
    {
      id: 'bjit-day-7',
      day: 7,
      title: 'Java Fundamentals for C# Developers',
      description:
        'Learn Java basics by mapping concepts from C# - BJIT uses Java in several projects',
      duration: '1 hour',
      resources: [
        {
          type: 'article',
          title: 'Java Tutorial - W3Schools',
          url: 'https://www.w3schools.com/java/',
        },
        {
          type: 'article',
          title: 'Java vs C# Comparison - Microsoft Learn',
          url: 'https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/tips-for-java-developers',
        },
        {
          type: 'practice',
          title: 'Java Practice - HackerRank',
          url: 'https://www.hackerrank.com/domains/java',
        },
      ],
      tasks: [
        'Compare C# properties with Java getters/setters',
        'Understand Java collections framework vs C# collections',
        'Write a simple Java CRUD application using Spring Boot basics',
      ],
      quiz: [
        {
          question:
            'What is the Java equivalent of C# properties (get; set;)?',
          options: [
            'Java has the same property syntax as C#',
            'Java uses getter and setter methods by convention',
            'Java uses the "property" keyword',
            'Java does not support encapsulation',
          ],
          correctAnswer: 1,
        },
        {
          question:
            'How does exception handling differ between Java and C#?',
          options: [
            'Java does not support try-catch blocks',
            'C# has checked exceptions while Java does not',
            'Java has checked exceptions that must be declared or caught; C# does not have checked exceptions',
            'There is no difference in exception handling',
          ],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 'bjit-day-8',
      day: 8,
      title: 'Agile & Software Process',
      description:
        'Understand Scrum methodology and documentation practices valued in BJIT Japanese client projects',
      duration: '1 hour',
      resources: [
        {
          type: 'article',
          title: 'Scrum Guide',
          url: 'https://scrumguides.org/scrum-guide.html',
        },
        {
          type: 'article',
          title: 'Agile Manifesto',
          url: 'https://agilemanifesto.org/',
        },
        {
          type: 'video',
          title: 'Scrum in Under 10 Minutes',
          url: 'https://www.youtube.com/watch?v=XU0llRltyFM',
        },
      ],
      tasks: [
        'Understand Scrum roles: Product Owner, Scrum Master, Development Team',
        'Learn sprint ceremonies: planning, daily standup, review, retrospective',
        'Practice writing user stories with acceptance criteria',
        'Study technical documentation best practices for client deliverables',
      ],
    },
    {
      id: 'bjit-day-9',
      day: 9,
      title: 'DSA Practice: Arrays, Strings & Sorting',
      description:
        'Solve data structure and algorithm problems commonly asked in BJIT written tests',
      duration: '1.5 hours',
      resources: [
        {
          type: 'practice',
          title: 'LeetCode - Array Problems',
          url: 'https://leetcode.com/tag/array/',
        },
        {
          type: 'practice',
          title: 'LeetCode - String Problems',
          url: 'https://leetcode.com/tag/string/',
        },
        {
          type: 'article',
          title: 'Sorting Algorithms Visualized',
          url: 'https://visualgo.net/en/sorting',
        },
      ],
      tasks: [
        'Solve Two Sum, Maximum Subarray, and Merge Sorted Array',
        'Practice string problems: reverse string, valid palindrome, anagram check',
        'Implement QuickSort and MergeSort from scratch',
        'Understand time and space complexity for each algorithm (Big O notation)',
      ],
    },
    {
      id: 'bjit-day-10',
      day: 10,
      title: 'System Design Basics',
      description:
        'Learn fundamental system design concepts for senior-level technical discussions',
      duration: '1.5 hours',
      resources: [
        {
          type: 'article',
          title: 'System Design Primer - GitHub',
          url: 'https://github.com/donnemartin/system-design-primer',
        },
        {
          type: 'video',
          title: 'System Design for Beginners',
          url: 'https://www.youtube.com/watch?v=MbjObHmDbZo',
        },
        {
          type: 'article',
          title: 'Caching Strategies - AWS',
          url: 'https://aws.amazon.com/caching/best-practices/',
        },
      ],
      tasks: [
        'Understand load balancing, caching, and database sharding concepts',
        'Design a URL shortener system with components and data flow',
        'Learn about API rate limiting and authentication strategies',
        'Study microservices vs monolith architecture trade-offs',
      ],
      quiz: [
        {
          question: 'What is the primary benefit of horizontal scaling over vertical scaling?',
          options: [
            'It is always cheaper',
            'It provides higher single-machine performance',
            'It allows adding more machines to distribute load, offering better fault tolerance',
            'It requires no code changes',
          ],
          correctAnswer: 2,
        },
        {
          question: 'What is the purpose of a CDN (Content Delivery Network)?',
          options: [
            'To host the application database closer to users',
            'To serve static content from servers geographically closer to users, reducing latency',
            'To replace load balancers in distributed systems',
            'To encrypt all network traffic automatically',
          ],
          correctAnswer: 1,
        },
      ],
    },
    {
      id: 'bjit-day-11',
      day: 11,
      title: 'Testing & DevOps Fundamentals',
      description:
        'Learn unit testing with xUnit, containerization with Docker, and CI/CD basics',
      duration: '1.5 hours',
      resources: [
        {
          type: 'article',
          title: 'Unit Testing in .NET - Microsoft Learn',
          url: 'https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-dotnet-test',
        },
        {
          type: 'article',
          title: 'Docker for .NET Developers - Microsoft Learn',
          url: 'https://learn.microsoft.com/en-us/dotnet/core/docker/introduction',
        },
        {
          type: 'article',
          title: 'GitHub Actions for .NET',
          url: 'https://learn.microsoft.com/en-us/dotnet/devops/github-actions-overview',
        },
      ],
      tasks: [
        'Write unit tests for a service class using xUnit and Moq',
        'Create a Dockerfile for a .NET Core Web API application',
        'Set up a docker-compose file with API and database containers',
        'Understand CI/CD pipeline stages: build, test, deploy',
      ],
    },
    {
      id: 'bjit-day-12',
      day: 12,
      title: 'Mock Interview & Application',
      description:
        'Simulate the BJIT interview process and prepare your application materials',
      duration: '1.5 hours',
      resources: [
        {
          type: 'practice',
          title: 'LeetCode - Easy Problems',
          url: 'https://leetcode.com/problemset/all/?difficulty=EASY',
        },
        {
          type: 'article',
          title: 'Common Interview Questions - InterviewBit',
          url: 'https://www.interviewbit.com/c-sharp-interview-questions/',
        },
        {
          type: 'article',
          title: 'BJIT Group Careers',
          url: 'https://www.bjitgroup.com/career',
        },
      ],
      tasks: [
        'Take a timed programming + aptitude mock test (45 minutes)',
        'Solve 2 coding problems and 5 aptitude questions within the time limit',
        'Practice explaining your projects and technology choices for the technical interview',
        'Update resume highlighting diverse tech stack experience, and apply to BJIT',
      ],
    },
  ],
}
