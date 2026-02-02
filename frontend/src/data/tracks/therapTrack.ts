import type { CompanyTrack } from '../learningTypes'

export const therapTrack: CompanyTrack = {
  companyName: 'Therap BD',
  companyType: 'private',
  description:
    'US healthcare SaaS - Java primary but C#/Python accepted, strong OOP/DBMS/SQL focus',
  totalDays: 12,
  interviewTips: [
    'Java is the primary language at Therap, but C# and Python are also accepted during interviews - be prepared to answer OOP questions in your chosen language',
    'DBMS and SQL are extremely important - expect deep questions on normalization, indexing, transactions, and complex query writing',
    'The hiring process is thorough: Online Test (MCQ + coding) followed by multiple Technical Rounds (DSA, DBMS, SQL) and finally HR',
    'Therap works in the US healthcare domain - understanding HIPAA basics and healthcare data sensitivity can give you an edge',
    'Strong OOP fundamentals are non-negotiable - be ready to explain inheritance, polymorphism, abstraction, and encapsulation with real-world examples',
    'Expect scenario-based questions where you design class hierarchies or database schemas from scratch during technical rounds',
  ],
  topics: [
    {
      id: 'therap-day-1',
      day: 1,
      title: 'OOP Mastery (Java + C# Parallel)',
      description:
        'Deep dive into Object-Oriented Programming concepts with side-by-side Java and C# examples. Cover encapsulation, inheritance, polymorphism, and abstraction thoroughly.',
      duration: '1.5 hours',
      resources: [
        {
          type: 'article',
          title: 'OOP Concepts in Java - Baeldung',
          url: 'https://www.baeldung.com/java-oop',
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
        'Implement encapsulation examples in both Java and C# side by side',
        'Write inheritance hierarchies demonstrating method overriding in both languages',
        'Create interface-based polymorphism examples showing how Java interfaces differ from C# interfaces',
        'Practice explaining the four pillars of OOP with real-world analogies',
      ],
      quiz: [
        {
          question:
            'In Java, which keyword is used to prevent a class from being inherited?',
          options: ['static', 'sealed', 'final', 'abstract'],
          correctAnswer: 2,
        },
        {
          question:
            'What is the C# equivalent of Java\'s "extends" keyword for class inheritance?',
          options: [
            'implements',
            ': (colon)',
            'extends',
            'inherits',
          ],
          correctAnswer: 1,
        },
        {
          question:
            'Which OOP principle is violated when a subclass overrides a method and changes its fundamental behavior?',
          options: [
            'Single Responsibility Principle',
            'Open/Closed Principle',
            'Liskov Substitution Principle',
            'Dependency Inversion Principle',
          ],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 'therap-day-2',
      day: 2,
      title: 'Java Fundamentals for C# Developers',
      description:
        'Bridge the gap between C# and Java knowledge. Focus on syntax differences, collections framework, exception handling, and Java-specific features like checked exceptions.',
      duration: '1.5 hours',
      resources: [
        {
          type: 'article',
          title: 'Java Collections Framework - Baeldung',
          url: 'https://www.baeldung.com/java-collections',
        },
        {
          type: 'article',
          title: 'Java vs C# Comparison - GeeksforGeeks',
          url: 'https://www.geeksforgeeks.org/java-vs-c-sharp/',
        },
        {
          type: 'practice',
          title: 'Java Practice Problems - HackerRank',
          url: 'https://www.hackerrank.com/domains/java',
        },
      ],
      tasks: [
        'Compare Java ArrayList/HashMap with C# List/Dictionary - write equivalent code in both',
        'Practice Java exception handling with checked vs unchecked exceptions',
        'Implement a small project (e.g., student registry) in Java if you primarily code in C#',
      ],
      quiz: [
        {
          question:
            'Which Java collection is the equivalent of C#\'s Dictionary<TKey, TValue>?',
          options: [
            'TreeMap',
            'HashMap',
            'Hashtable',
            'LinkedHashMap',
          ],
          correctAnswer: 1,
        },
        {
          question:
            'What is a key difference between Java and C# regarding exceptions?',
          options: [
            'Java does not support try-catch blocks',
            'C# has checked exceptions while Java does not',
            'Java has checked exceptions that must be declared or caught',
            'Both languages handle exceptions identically',
          ],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 'therap-day-3',
      day: 3,
      title: 'DBMS Theory (ER Diagrams, Normalization, ACID)',
      description:
        'Master database management system theory. Focus on Entity-Relationship modeling, normalization forms (1NF through BCNF), ACID properties, and transaction management.',
      duration: '1.5 hours',
      resources: [
        {
          type: 'article',
          title: 'DBMS Tutorial - GeeksforGeeks',
          url: 'https://www.geeksforgeeks.org/dbms/',
        },
        {
          type: 'article',
          title: 'Normalization in DBMS - GeeksforGeeks',
          url: 'https://www.geeksforgeeks.org/normal-forms-in-dbms/',
        },
        {
          type: 'article',
          title: 'ACID Properties - GeeksforGeeks',
          url: 'https://www.geeksforgeeks.org/acid-properties-in-dbms/',
        },
      ],
      tasks: [
        'Draw ER diagrams for a hospital management system (relevant to Therap healthcare domain)',
        'Practice normalizing a denormalized table through 1NF, 2NF, 3NF, and BCNF with step-by-step reasoning',
        'Explain ACID properties with real-world banking transaction examples',
        'Study transaction isolation levels and understand problems like dirty reads, phantom reads, and non-repeatable reads',
      ],
      quiz: [
        {
          question: 'Which normal form eliminates transitive dependencies?',
          options: [
            'First Normal Form (1NF)',
            'Second Normal Form (2NF)',
            'Third Normal Form (3NF)',
            'Boyce-Codd Normal Form (BCNF)',
          ],
          correctAnswer: 2,
        },
        {
          question:
            'In an ER diagram, a weak entity is represented by:',
          options: [
            'A single rectangle',
            'A double rectangle',
            'A diamond shape',
            'An oval shape',
          ],
          correctAnswer: 1,
        },
        {
          question:
            'Which ACID property ensures that a transaction brings the database from one valid state to another?',
          options: [
            'Atomicity',
            'Consistency',
            'Isolation',
            'Durability',
          ],
          correctAnswer: 1,
        },
      ],
    },
    {
      id: 'therap-day-4',
      day: 4,
      title: 'SQL Mastery Part 1 (JOINs, Subqueries, GROUP BY)',
      description:
        'Master core SQL operations. Practice all types of JOINs, correlated and non-correlated subqueries, GROUP BY with HAVING, and aggregate functions.',
      duration: '1.5 hours',
      resources: [
        {
          type: 'practice',
          title: 'SQLZoo Interactive Tutorial',
          url: 'https://sqlzoo.net/wiki/SQL_Tutorial',
        },
        {
          type: 'article',
          title: 'SQL Joins - GeeksforGeeks',
          url: 'https://www.geeksforgeeks.org/sql-join-set-1-inner-left-right-and-full-joins/',
        },
        {
          type: 'practice',
          title: 'LeetCode SQL Problems',
          url: 'https://leetcode.com/problemset/database/',
        },
      ],
      tasks: [
        'Write queries using INNER, LEFT, RIGHT, and FULL OUTER JOINs on a sample employee-department schema',
        'Practice correlated subqueries - find employees earning more than their department average',
        'Master GROUP BY with HAVING clause - aggregate data and filter groups',
        'Solve 5 SQL problems on LeetCode (Easy to Medium difficulty)',
      ],
      quiz: [
        {
          question:
            'Which JOIN type returns all rows from both tables, with NULLs where there is no match?',
          options: [
            'INNER JOIN',
            'LEFT JOIN',
            'RIGHT JOIN',
            'FULL OUTER JOIN',
          ],
          correctAnswer: 3,
        },
        {
          question:
            'What is the difference between WHERE and HAVING in SQL?',
          options: [
            'There is no difference - they are interchangeable',
            'WHERE filters rows before grouping, HAVING filters groups after aggregation',
            'HAVING filters rows before grouping, WHERE filters groups after aggregation',
            'WHERE is used only with JOINs, HAVING is used only with subqueries',
          ],
          correctAnswer: 1,
        },
      ],
    },
    {
      id: 'therap-day-5',
      day: 5,
      title: 'SQL Mastery Part 2 (Window Functions, CTEs, Stored Procedures)',
      description:
        'Advanced SQL techniques including window functions (ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD), Common Table Expressions, and stored procedure fundamentals.',
      duration: '1.5 hours',
      resources: [
        {
          type: 'article',
          title: 'SQL Window Functions - GeeksforGeeks',
          url: 'https://www.geeksforgeeks.org/window-functions-in-sql/',
        },
        {
          type: 'practice',
          title: 'SQLZoo Window Functions',
          url: 'https://sqlzoo.net/wiki/Window_functions',
        },
        {
          type: 'article',
          title: 'SQL CTEs - Microsoft Learn',
          url: 'https://learn.microsoft.com/en-us/sql/t-sql/queries/with-common-table-expression-transact-sql',
        },
      ],
      tasks: [
        'Practice ROW_NUMBER, RANK, and DENSE_RANK to understand their differences with sample data',
        'Use LAG and LEAD functions to compare consecutive rows (e.g., month-over-month revenue)',
        'Write recursive CTEs for hierarchical data like organizational charts',
        'Create a stored procedure with input/output parameters for a common business operation',
      ],
    },
    {
      id: 'therap-day-6',
      day: 6,
      title: 'DSA: Arrays, Strings, Hashing',
      description:
        'Core data structures and algorithms. Focus on array manipulation, string processing, and hash-based problem solving - the most common categories in online coding tests.',
      duration: '1.5 hours',
      resources: [
        {
          type: 'practice',
          title: 'LeetCode Arrays',
          url: 'https://leetcode.com/tag/array/',
        },
        {
          type: 'article',
          title: 'Hashing in Data Structure - GeeksforGeeks',
          url: 'https://www.geeksforgeeks.org/hashing-data-structure/',
        },
        {
          type: 'practice',
          title: 'LeetCode Hash Table',
          url: 'https://leetcode.com/tag/hash-table/',
        },
      ],
      tasks: [
        'Solve Two Sum, Best Time to Buy and Sell Stock, and Maximum Subarray on LeetCode',
        'Practice string problems: reverse string, valid palindrome, longest substring without repeating characters',
        'Implement frequency counting with HashMaps - find duplicates, group anagrams',
        'Master the two-pointer and sliding window techniques with at least 3 problems each',
      ],
    },
    {
      id: 'therap-day-7',
      day: 7,
      title: 'DSA: Linked Lists, Stacks, Queues',
      description:
        'Linear data structures mastery. Implement from scratch and solve classic problems involving linked lists, stacks, and queues.',
      duration: '1 hour',
      resources: [
        {
          type: 'practice',
          title: 'LeetCode Linked List',
          url: 'https://leetcode.com/tag/linked-list/',
        },
        {
          type: 'article',
          title: 'Stack Data Structure - GeeksforGeeks',
          url: 'https://www.geeksforgeeks.org/stack-data-structure/',
        },
        {
          type: 'practice',
          title: 'LeetCode Stack Problems',
          url: 'https://leetcode.com/tag/stack/',
        },
      ],
      tasks: [
        'Implement a singly linked list with insert, delete, and reverse operations from scratch',
        'Solve classic linked list problems: detect cycle, find middle node, merge two sorted lists',
        'Implement a stack using arrays and solve valid parentheses, min stack problems',
        'Implement a queue and solve BFS-related problems using queue',
      ],
      quiz: [
        {
          question:
            'What is the time complexity of inserting an element at the beginning of a singly linked list?',
          options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
          correctAnswer: 0,
        },
        {
          question:
            'Which data structure is used for Breadth-First Search (BFS) traversal?',
          options: ['Stack', 'Queue', 'Priority Queue', 'Deque'],
          correctAnswer: 1,
        },
      ],
    },
    {
      id: 'therap-day-8',
      day: 8,
      title: 'DSA: Trees & Graphs (BFS, DFS, BST)',
      description:
        'Non-linear data structures. Master binary tree traversals, BST operations, and graph traversal algorithms (BFS and DFS).',
      duration: '1.5 hours',
      resources: [
        {
          type: 'practice',
          title: 'LeetCode Tree Problems',
          url: 'https://leetcode.com/tag/tree/',
        },
        {
          type: 'article',
          title: 'Graph Traversals - GeeksforGeeks',
          url: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/',
        },
        {
          type: 'practice',
          title: 'LeetCode Graph Problems',
          url: 'https://leetcode.com/tag/graph/',
        },
      ],
      tasks: [
        'Implement inorder, preorder, and postorder traversals both recursively and iteratively',
        'Solve BST problems: validate BST, find kth smallest, insert and delete nodes',
        'Implement BFS and DFS for graph traversal using adjacency list representation',
        'Solve at least 2 graph problems: number of islands, detect cycle in directed graph',
      ],
    },
    {
      id: 'therap-day-9',
      day: 9,
      title: 'OOP Design Patterns (Factory, Singleton, Observer, Strategy)',
      description:
        'Learn and implement the most commonly asked design patterns in Therap interviews. Understand when and why to use each pattern.',
      duration: '1.5 hours',
      resources: [
        {
          type: 'article',
          title: 'Design Patterns in Java - Baeldung',
          url: 'https://www.baeldung.com/java-creational-design-patterns',
        },
        {
          type: 'article',
          title: 'Design Patterns - GeeksforGeeks',
          url: 'https://www.geeksforgeeks.org/software-design-patterns/',
        },
        {
          type: 'article',
          title: 'C# Design Patterns - Microsoft Learn',
          url: 'https://learn.microsoft.com/en-us/dotnet/fundamentals/runtime-libraries/system-idisposable',
        },
      ],
      tasks: [
        'Implement Factory Pattern: create a notification system that sends Email, SMS, or Push notifications',
        'Implement thread-safe Singleton Pattern in both Java and C# and explain why lazy initialization matters',
        'Implement Observer Pattern: create a stock price notification system',
        'Implement Strategy Pattern: create a payment processing system with different payment methods',
      ],
      quiz: [
        {
          question:
            'Which design pattern ensures a class has only one instance and provides a global access point to it?',
          options: [
            'Factory Pattern',
            'Singleton Pattern',
            'Observer Pattern',
            'Strategy Pattern',
          ],
          correctAnswer: 1,
        },
        {
          question:
            'The Observer Pattern is best described as:',
          options: [
            'Creating objects without specifying the exact class',
            'Defining a family of algorithms and making them interchangeable',
            'A one-to-many dependency where state changes notify all dependents',
            'Providing a simplified interface to a complex subsystem',
          ],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 'therap-day-10',
      day: 10,
      title: 'Web Fundamentals & REST APIs',
      description:
        'HTTP protocol, REST API design principles, request/response lifecycle, status codes, and authentication basics. Understanding web fundamentals is essential for any SaaS company.',
      duration: '1 hour',
      resources: [
        {
          type: 'article',
          title: 'HTTP Overview - MDN',
          url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview',
        },
        {
          type: 'article',
          title: 'RESTful API Design - Microsoft Learn',
          url: 'https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design',
        },
        {
          type: 'article',
          title: 'REST API Tutorial - GeeksforGeeks',
          url: 'https://www.geeksforgeeks.org/rest-api-introduction/',
        },
      ],
      tasks: [
        'Study HTTP methods (GET, POST, PUT, PATCH, DELETE) and when to use each',
        'Understand HTTP status codes: 2xx (success), 3xx (redirect), 4xx (client error), 5xx (server error)',
        'Design a RESTful API for a healthcare patient management system with proper endpoints and resources',
        'Study authentication methods: session-based, token-based (JWT), and OAuth2 basics',
      ],
    },
    {
      id: 'therap-day-11',
      day: 11,
      title: 'Testing & Code Quality (JUnit / xUnit)',
      description:
        'Learn unit testing fundamentals with JUnit (Java) and xUnit (C#). Understand test-driven development, mocking, and writing maintainable test suites.',
      duration: '1 hour',
      resources: [
        {
          type: 'article',
          title: 'JUnit 5 User Guide - Baeldung',
          url: 'https://www.baeldung.com/junit-5',
        },
        {
          type: 'article',
          title: 'Unit Testing in C# - Microsoft Learn',
          url: 'https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-dotnet-test',
        },
      ],
      tasks: [
        'Write JUnit/xUnit tests for a simple Calculator class covering edge cases',
        'Practice using mocking frameworks (Mockito for Java or Moq for C#) to isolate unit tests',
        'Understand the AAA pattern (Arrange, Act, Assert) and apply it consistently',
      ],
    },
    {
      id: 'therap-day-12',
      day: 12,
      title: 'Mock Test & Application',
      description:
        'Simulate the full Therap hiring process: timed MCQ test, coding problems, and a mock technical interview. Review all weak areas and prepare your application.',
      duration: '1.5 hours',
      resources: [
        {
          type: 'practice',
          title: 'LeetCode Mock Assessment',
          url: 'https://leetcode.com/assessment/',
        },
        {
          type: 'article',
          title: 'Therap BD Careers',
          url: 'https://therapbd.com/careers',
        },
        {
          type: 'practice',
          title: 'SQLZoo Quick Quiz',
          url: 'https://sqlzoo.net/wiki/SELECT_Quiz',
        },
      ],
      tasks: [
        'Take a timed mock test: 20 MCQs on OOP, DBMS, SQL, and DSA (30 minutes)',
        'Solve 2 coding problems under time pressure (45 minutes total)',
        'Conduct a mock technical interview with a friend covering DBMS and OOP topics',
        'Update your resume, apply to Therap BD, and prepare questions for the interviewer',
      ],
    },
  ],
}
