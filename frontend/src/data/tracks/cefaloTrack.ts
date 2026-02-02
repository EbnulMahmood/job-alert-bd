import type { CompanyTrack } from '../learningTypes'
import { cefaloWeek1 } from './cefalo/week1'
import { cefaloWeek2 } from './cefalo/week2'

// Days 11-30: Will be enriched incrementally (currently basic content)
const cefaloWeek3to6 = [
  // Days 11-15: Testing & SQL
  {
    id: 'cefalo-day-11',
    day: 11,
    title: 'Unit Testing with xUnit',
    description: 'Testing practices valued at Cefalo',
    duration: '1.5 hours',
    resources: [
      { type: 'article' as const, title: 'xUnit Testing', url: 'https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-dotnet-test' },
    ],
    detailedExplanation: `Unit Testing হলো software development এর অপরিহার্য অংশ। xUnit হলো .NET এর most popular testing framework। Cefalo test coverage কে গুরুত্ব দেয়।

Arrange-Act-Assert (AAA) pattern: Arrange = setup test data ও dependencies, Act = call the method under test, Assert = verify the expected outcome। প্রতিটি test method এ এই তিনটি section clearly আলাদা থাকা উচিত।

[Fact] attribute simple test methods mark করে। [Theory] with [InlineData] parameterized tests এর জন্য - একই test logic বিভিন্ন inputs দিয়ে run করে। এটা code duplication কমায়।

Mocking (Moq library): Unit test এ external dependencies (database, API, file system) mock করা হয় যাতে test isolated থাকে। Mock<IRepository>() দিয়ে fake implementation তৈরি করা যায়। Setup() দিয়ে behavior define করুন, Verify() দিয়ে method call verify করুন।

Test naming convention: MethodName_Scenario_ExpectedBehavior। যেমন: CreateOrder_EmptyCart_ThrowsInvalidOperationException। এতে test fail হলে instantly বোঝা যায় কী ভুল।`,
    keyConcepts: [
      'AAA Pattern: Arrange (setup), Act (execute), Assert (verify) - keep them clearly separated',
      '[Fact] = single test, [Theory] + [InlineData] = parameterized test with multiple inputs',
      'Mock external dependencies (DB, API) to keep unit tests isolated and fast',
      'Test naming: MethodName_Scenario_ExpectedBehavior for clarity',
      'One assert per test (ideally) - test fails should point to exactly one issue',
    ],
    commonMistakes: [
      'Testing implementation details instead of behavior - tests break on refactoring',
      'Not mocking dependencies - tests become integration tests (slow, flaky)',
      'Multiple assertions testing different behaviors in one test method',
      'Not testing edge cases: null inputs, empty collections, boundary values',
      'Tests depending on execution order - each test should be independent',
    ],
    codeExamples: [
      {
        title: 'xUnit Tests with Moq',
        language: 'csharp' as const,
        code: `public class BookServiceTests
{
    private readonly Mock<IBookRepository> _mockRepo;
    private readonly Mock<IUnitOfWork> _mockUow;
    private readonly BookService _sut; // System Under Test

    public BookServiceTests()
    {
        _mockRepo = new Mock<IBookRepository>();
        _mockUow = new Mock<IUnitOfWork>();
        _sut = new BookService(_mockRepo.Object, _mockUow.Object);
    }

    [Fact]
    public async Task GetByIdAsync_ExistingBook_ReturnsBookDto()
    {
        // Arrange
        var book = new Book { Id = 1, Title = "Clean Code", Price = 29.99m };
        _mockRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(book);

        // Act
        var result = await _sut.GetByIdAsync(1);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Clean Code", result.Title);
    }

    [Fact]
    public async Task GetByIdAsync_NonExistingBook_ReturnsNull()
    {
        _mockRepo.Setup(r => r.GetByIdAsync(99)).ReturnsAsync((Book?)null);
        var result = await _sut.GetByIdAsync(99);
        Assert.Null(result);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-5)]
    public async Task UpdatePrice_InvalidPrice_ThrowsException(decimal price)
    {
        var book = new Book { Id = 1, Title = "Test", Price = 10m };
        _mockRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(book);

        await Assert.ThrowsAsync<DomainException>(
            () => _sut.UpdatePriceAsync(1, price));
    }
}`,
        explanation: 'Mock<IBookRepository> দিয়ে fake repository তৈরি। Setup() expected behavior define করে। Assert verify করে method correctly কাজ করছে। [Theory] multiple test cases একই logic দিয়ে run করে।',
        keyPoints: [
          'Constructor sets up mocks - each test gets fresh instances',
          '[Fact] for single scenarios, [Theory]+[InlineData] for parameterized tests',
          'Mock.Setup() defines what the fake returns; Assert verifies the result',
          'Assert.ThrowsAsync for testing exception scenarios',
        ],
      },
    ],
    tasks: [
      'Set up xUnit project with Moq',
      'Write tests for a service layer using AAA pattern',
      'Use [Theory] with [InlineData] for parameterized tests',
      'Achieve 80%+ code coverage on a service class',
    ],
    quiz: [
      {
        question: 'What is the primary purpose of mocking in unit tests?',
        options: ['To speed up test execution', 'To isolate the unit under test by replacing dependencies with controlled substitutes', 'To test the database directly', 'To generate random test data'],
        correctAnswer: 1,
        explanation: 'Mocking replaces real dependencies with fake implementations you control. This isolates the code under test from external concerns like databases.',
        difficulty: 'easy' as const,
      },
      {
        question: 'In AAA pattern, what happens in "Arrange"?',
        options: ['Test assertions are evaluated', 'Method under test is called', 'Test preconditions and inputs are set up', 'Test results are logged'],
        correctAnswer: 2,
        explanation: 'Arrange sets up test data, creates mocks, configures mock behavior, and prepares everything needed before the actual test action.',
        difficulty: 'easy' as const,
      },
      {
        question: 'What is the difference between [Fact] and [Theory] in xUnit?',
        options: ['No difference', '[Fact] runs once; [Theory] runs multiple times with different data', '[Fact] is for async; [Theory] is for sync', '[Theory] is deprecated'],
        correctAnswer: 1,
        explanation: '[Fact] is a test that always runs the same way. [Theory] is parameterized - it runs once for each set of [InlineData], enabling data-driven testing.',
        difficulty: 'medium' as const,
      },
    ],
    interviewQuestions: [
      {
        question: 'How do you approach unit testing in .NET? What patterns do you follow?',
        answer: `I follow the AAA (Arrange-Act-Assert) pattern with xUnit and Moq. Each test has three clear sections: setup, execution, and verification.

I mock all external dependencies (repositories, HTTP clients, email services) to keep tests isolated and fast. I use constructor injection, so dependencies are easily mockable.

For naming, I use MethodName_Scenario_ExpectedBehavior convention. Tests should read like specifications of behavior.

I aim for meaningful coverage (not just high numbers) - testing happy paths, edge cases, error handling, and boundary conditions. I avoid testing implementation details (like checking exact method call counts) and focus on testing behavior/outcomes.

For test organization, I mirror the source project structure and keep tests close to what they test.`,
        followUp: [
          'What is the difference between unit tests and integration tests?',
          'How do you test code that depends on DateTime.Now?',
          'What code coverage percentage do you aim for? Why?',
        ],
      },
    ],
  },
  {
    id: 'cefalo-day-12', day: 12, title: 'Integration Testing', description: 'API integration testing',
    duration: '1.5 hours',
    resources: [{ type: 'article' as const, title: 'Integration Testing', url: 'https://learn.microsoft.com/en-us/aspnet/core/test/integration-tests' }],
    tasks: ['Set up WebApplicationFactory', 'Test API endpoints end-to-end', 'Use in-memory database for tests'],
  },
  {
    id: 'cefalo-day-13', day: 13, title: 'SQL Fundamentals', description: 'SQL skills for Cefalo MCQ test',
    duration: '1 hour',
    resources: [{ type: 'practice' as const, title: 'SQLZoo', url: 'https://sqlzoo.net/' }],
    tasks: ['Practice SELECT with WHERE, ORDER BY', 'Master GROUP BY and HAVING', 'Write subqueries'],
    quiz: [
      { question: 'What is the difference between WHERE and HAVING?', options: ['No difference', 'WHERE filters rows before grouping; HAVING filters after aggregation', 'HAVING filters before grouping', 'WHERE is for SELECT only'], correctAnswer: 1, explanation: 'WHERE filters individual rows before GROUP BY. HAVING filters groups after aggregation (COUNT, SUM, AVG).', difficulty: 'easy' as const },
      { question: 'Which clause filters aggregate results?', options: ['WHERE', 'GROUP BY', 'HAVING', 'ORDER BY'], correctAnswer: 2, explanation: 'HAVING filters groups based on aggregate function results. WHERE cannot use aggregate functions.', difficulty: 'easy' as const },
    ],
  },
  {
    id: 'cefalo-day-14', day: 14, title: 'SQL Joins', description: 'All types of joins - common interview topic',
    duration: '1 hour',
    resources: [{ type: 'practice' as const, title: 'SQL Joins Practice', url: 'https://www.w3schools.com/sql/sql_join.asp' }],
    tasks: ['Practice INNER, LEFT, RIGHT, FULL joins', 'Write self-joins', 'Combine multiple joins'],
  },
  {
    id: 'cefalo-day-15', day: 15, title: 'SQL Performance', description: 'Query optimization for interviews',
    duration: '1.5 hours',
    resources: [{ type: 'article' as const, title: 'SQL Index Guide', url: 'https://use-the-index-luke.com/' }],
    tasks: ['Understand clustered vs non-clustered indexes', 'Read execution plans', 'Optimize slow queries'],
  },
  // Days 16-20: DSA
  {
    id: 'cefalo-day-16', day: 16, title: 'Arrays and Strings', description: 'Common DSA topics in Cefalo MCQ',
    duration: '1.5 hours',
    resources: [{ type: 'practice' as const, title: 'LeetCode Arrays', url: 'https://leetcode.com/tag/array/' }],
    tasks: ['Solve 5 easy array problems', 'Practice string manipulation', 'Implement two-pointer technique'],
    quiz: [
      { question: 'Time complexity of accessing array element by index?', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'], correctAnswer: 2, explanation: 'Array provides O(1) random access by computing memory address: base + index * elementSize.', difficulty: 'easy' as const },
    ],
  },
  {
    id: 'cefalo-day-17', day: 17, title: 'HashMaps and Sets', description: 'Dictionary usage patterns',
    duration: '1 hour',
    resources: [{ type: 'practice' as const, title: 'HashMap Problems', url: 'https://leetcode.com/tag/hash-table/' }],
    tasks: ['Solve Two Sum problem', 'Practice frequency counting', 'Implement LRU cache concept'],
  },
  {
    id: 'cefalo-day-18', day: 18, title: 'Linked Lists', description: 'LinkedList operations',
    duration: '1 hour',
    resources: [{ type: 'practice' as const, title: 'LinkedList Problems', url: 'https://leetcode.com/tag/linked-list/' }],
    tasks: ['Implement singly linked list', 'Reverse a linked list', 'Detect cycle in linked list'],
  },
  {
    id: 'cefalo-day-19', day: 19, title: 'Trees Basics', description: 'Binary tree traversals',
    duration: '1.5 hours',
    resources: [{ type: 'practice' as const, title: 'Tree Problems', url: 'https://leetcode.com/tag/tree/' }],
    tasks: ['Implement inorder, preorder, postorder traversal', 'Practice BFS and DFS', 'Solve tree height problem'],
  },
  {
    id: 'cefalo-day-20', day: 20, title: 'Sorting Algorithms', description: 'Common sorting for MCQ',
    duration: '1 hour',
    resources: [{ type: 'article' as const, title: 'Sorting Visualizations', url: 'https://visualgo.net/en/sorting' }],
    tasks: ['Implement QuickSort and MergeSort', 'Understand time complexities', 'Practice sorting-related problems'],
    quiz: [
      { question: 'Average time complexity of QuickSort?', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'], correctAnswer: 1, explanation: 'QuickSort averages O(n log n) with random pivot. Worst case O(n²) with already sorted input and bad pivot selection.', difficulty: 'easy' as const },
      { question: 'Which sort is stable with O(n log n) worst-case?', options: ['QuickSort', 'HeapSort', 'MergeSort', 'Selection Sort'], correctAnswer: 2, explanation: 'MergeSort is stable (preserves relative order of equal elements) and guarantees O(n log n) in all cases.', difficulty: 'medium' as const },
    ],
  },
  // Days 21-30: Portfolio & Interview Prep
  {
    id: 'cefalo-day-21', day: 21, title: 'Portfolio Project - Day 1', description: 'Start building a demo project',
    duration: '2 hours',
    resources: [{ type: 'project' as const, title: 'Project Ideas', url: 'https://github.com/practical-tutorials/project-based-learning' }],
    tasks: ['Choose a project (Task Management API)', 'Set up Clean Architecture solution', 'Create domain models'],
  },
  {
    id: 'cefalo-day-22', day: 22, title: 'Portfolio Project - Day 2', description: 'Implement core features',
    duration: '2 hours', resources: [],
    tasks: ['Implement repository layer', 'Create API endpoints', 'Add authentication'],
  },
  {
    id: 'cefalo-day-23', day: 23, title: 'Portfolio Project - Day 3', description: 'Add tests and documentation',
    duration: '2 hours', resources: [],
    tasks: ['Write unit tests (80%+ coverage)', 'Add Swagger documentation', 'Create README with setup instructions'],
  },
  {
    id: 'cefalo-day-24', day: 24, title: 'Git Best Practices', description: 'Version control skills',
    duration: '1 hour',
    resources: [{ type: 'article' as const, title: 'Git Guide', url: 'https://www.atlassian.com/git/tutorials' }],
    tasks: ['Practice branching strategies', 'Write meaningful commit messages', 'Learn git rebase vs merge'],
  },
  {
    id: 'cefalo-day-25', day: 25, title: 'Docker Basics', description: 'Containerization basics',
    duration: '1.5 hours',
    resources: [{ type: 'article' as const, title: 'Docker for .NET', url: 'https://learn.microsoft.com/en-us/dotnet/core/docker/introduction' }],
    tasks: ['Write Dockerfile for .NET app', 'Create docker-compose setup', 'Run containerized application'],
  },
  {
    id: 'cefalo-day-26', day: 26, title: 'MCQ Practice - C#/.NET', description: 'Practice MCQ questions similar to Cefalo test',
    duration: '1 hour',
    resources: [{ type: 'practice' as const, title: 'C# Quiz', url: 'https://www.sanfoundry.com/csharp-mcqs-fundamentals/' }],
    tasks: ['Take 50 C# MCQ questions', 'Review wrong answers', 'Note down weak areas'],
    quiz: [
      { question: 'Default value of bool in C#?', options: ['true', 'false', 'null', '0'], correctAnswer: 1, explanation: 'bool defaults to false. All value types have a default: int=0, float=0.0f, bool=false, char=\'\\0\'.', difficulty: 'easy' as const },
      { question: 'Which keyword prevents class inheritance?', options: ['static', 'abstract', 'sealed', 'readonly'], correctAnswer: 2, explanation: 'sealed prevents a class from being inherited. abstract is the opposite - it requires inheritance.', difficulty: 'easy' as const },
    ],
  },
  {
    id: 'cefalo-day-27', day: 27, title: 'MCQ Practice - SQL', description: 'SQL MCQ practice',
    duration: '1 hour',
    resources: [{ type: 'practice' as const, title: 'SQL Quiz', url: 'https://www.w3schools.com/sql/sql_quiz.asp' }],
    tasks: ['Take SQL MCQ test', 'Practice complex query questions', 'Review JOIN and subquery questions'],
  },
  {
    id: 'cefalo-day-28', day: 28, title: 'Coding Problem Practice', description: 'Practice coding problems',
    duration: '2 hours',
    resources: [{ type: 'practice' as const, title: 'LeetCode', url: 'https://leetcode.com/problemset/all/?difficulty=EASY&page=1' }],
    tasks: ['Solve 3 easy LeetCode problems', 'Practice writing clean, readable code', 'Time yourself (30 min per problem)'],
  },
  {
    id: 'cefalo-day-29', day: 29, title: 'Mock Technical Discussion', description: 'Prepare for technical discussion round',
    duration: '1.5 hours',
    resources: [{ type: 'article' as const, title: 'Common Interview Questions', url: 'https://www.interviewbit.com/c-sharp-interview-questions/' }],
    tasks: ['Prepare to explain your projects', 'Practice explaining technical decisions', 'Review architecture patterns'],
  },
  {
    id: 'cefalo-day-30', day: 30, title: 'Final Review & Application', description: 'Final preparation and apply!',
    duration: '2 hours',
    resources: [{ type: 'article' as const, title: 'Cefalo Careers', url: 'https://career.cefalo.com/' }],
    tasks: ['Review all weak areas', 'Update resume and LinkedIn', 'Apply to Cefalo!', 'Prepare questions to ask interviewer'],
  },
]

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
    ...cefaloWeek1,    // Days 1-5: Enriched with code examples, practice problems, interview Q&A
    ...cefaloWeek2,    // Days 6-10: Enriched with code examples, practice problems, interview Q&A
    ...cefaloWeek3to6, // Days 11-30: Basic content (will be enriched incrementally)
  ],
}
