import type { LearningTopic } from '../../learningTypes'

// Cefalo Track - Week 1: C# Core (Days 1-5)
export const cefaloWeek1: LearningTopic[] = [
  {
    id: 'cefalo-day-1',
    day: 1,
    title: 'C# Fundamentals Review',
    description: 'Review core C# concepts that Cefalo interviews focus on',
    duration: '1.5 hours',
    resources: [
      { type: 'article', title: 'C# Fundamentals - Microsoft Docs', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/' },
      { type: 'video', title: 'C# Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=GhQdlIFylQ8' },
    ],
    detailedExplanation: `The most fundamental distinction in C# is between value types and reference types. Value types (int, bool, struct) live on the stack and are copied on assignment. Reference types (class, string, array) live on the heap and only the reference is copied. This means modifying a copied struct won't affect the original, but modifying a copied class variable will.

Boxing occurs when a value type is wrapped into an object on the heap, and unboxing reverses it. This is costly because it involves heap allocation and copying. Always use generic collections like List<T> instead of ArrayList to avoid implicit boxing of value types.

Strings are immutable reference types - every concatenation creates a new string object. In loops, use StringBuilder instead to avoid O(n^2) memory allocation.`,
    keyConcepts: [
      'Value types (stack, copied) vs reference types (heap, shared reference)',
      'Boxing/unboxing causes heap allocation - use generic collections to avoid it',
      'string is immutable - use StringBuilder for concatenation in loops',
    ],
    commonMistakes: [
      'Using ArrayList instead of List<T> - causes boxing for value types',
      'Forgetting that struct assignment creates a copy, not a reference',
      'String concatenation in a loop without StringBuilder - O(n^2) allocation',
    ],
    codeExamples: [
      {
        title: 'Value Type vs Reference Type Behavior',
        language: 'csharp',
        code: `struct Point { public int X; public int Y; }
class PointClass { public int X; public int Y; }

// Value type - copy
Point p1 = new Point { X = 1, Y = 2 };
Point p2 = p1;       // p2 is a COPY
p2.X = 10;
Console.WriteLine(p1.X); // Output: 1 (unchanged!)

// Reference type - shared reference
PointClass pc1 = new PointClass { X = 1, Y = 2 };
PointClass pc2 = pc1;  // pc2 points to SAME object
pc2.X = 10;
Console.WriteLine(pc1.X); // Output: 10 (changed!)`,
        explanation: 'Assigning a struct copies all data, so modifying the copy leaves the original unchanged. Assigning a class copies only the reference, so both variables point to the same object.',
        output: '1\n10',
        keyPoints: [
          'struct assignment copies all fields (deep copy)',
          'class assignment copies the reference only (same object)',
        ],
      },
    ],
    practiceProblems: [
      {
        id: 'cefalo-d1-p1',
        title: 'Predict the Output - Value vs Reference',
        difficulty: 'easy',
        description: 'Given the following C# code, predict the output:\n\nstruct S { public int Val; }\nclass C { public int Val; }\n\nS s1 = new S { Val = 5 };\nS s2 = s1;\ns2.Val = 99;\n\nC c1 = new C { Val = 5 };\nC c2 = c1;\nc2.Val = 99;\n\nPrint s1.Val and c1.Val',
        sampleInput: 'No input needed - trace the code',
        sampleOutput: 's1.Val = 5, c1.Val = 99',
        hints: [
          'struct is a value type - assignment copies all fields',
          'class is a reference type - assignment copies the reference, both variables point to same object',
          'Modifying s2 does not affect s1, but modifying c2 affects c1',
        ],
        approaches: [
          {
            name: 'Memory Model Tracing',
            timeComplexity: 'N/A',
            spaceComplexity: 'N/A',
            explanation: 'Trace stack and heap allocations step by step. s1 and s2 are separate copies on the stack. c1 and c2 point to the same object on the heap.',
            pseudocode: `Step 1: s1 = {Val: 5} on stack
Step 2: s2 = copy of s1 = {Val: 5} on stack (separate memory)
Step 3: s2.Val = 99 → s2 = {Val: 99}, s1 still = {Val: 5}
Step 4: c1 = new C {Val: 5} → object on heap, c1 holds reference
Step 5: c2 = c1 → c2 holds SAME reference as c1
Step 6: c2.Val = 99 → modifies the shared heap object
Result: s1.Val = 5, c1.Val = 99`,
          },
        ],
        relatedTopics: ['Value Types', 'Reference Types', 'Stack vs Heap'],
        companiesAsked: ['Cefalo', 'Samsung', 'BJIT'],
      },
    ],
    tasks: [
      'Review value types vs reference types with code examples',
      'Practice boxing/unboxing - write 3 examples showing performance difference',
      'Write examples using List<T>, Dictionary<K,V>, HashSet<T>, Queue<T>',
      'Implement a generic Stack<T> class using an array with Push, Pop, Peek methods',
    ],
    quiz: [
      {
        question: 'Which of the following is a value type in C#?',
        options: ['string', 'object', 'int', 'class instance'],
        correctAnswer: 2,
        explanation: 'int is a value type (struct), while string, object, and class instances are all reference types.',
        difficulty: 'easy',
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
        explanation: 'Boxing wraps a value type in an object on the heap, involving memory allocation and copying.',
        difficulty: 'easy',
      },
      {
        question: 'What is the output of this code?',
        options: ['True', 'False', 'Compile Error', 'Runtime Exception'],
        correctAnswer: 1,
        codeSnippet: `int a = 10;
object boxed = a;
a = 20;
Console.WriteLine((int)boxed == 20);`,
        explanation: 'Boxing copies the value to the heap, so changing the original int does not affect the boxed copy.',
        difficulty: 'medium',
      },
      {
        question: 'Which collection should you use for O(1) key-based lookups?',
        options: ['List<T>', 'LinkedList<T>', 'Dictionary<TKey, TValue>', 'SortedList<TKey, TValue>'],
        correctAnswer: 2,
        explanation: 'Dictionary uses a hash table internally, providing O(1) average-case key lookup.',
        difficulty: 'easy',
      },
    ],
    interviewQuestions: [
      {
        question: 'What is the difference between value types and reference types in C#? Give examples.',
        answer: `Value types (int, bool, struct) are stored on the stack and contain the actual data. Assignment creates a complete copy. Reference types (class, string, array) are stored on the heap, and assignment copies only the reference, so multiple variables can point to the same object.

The key performance implication is that value types avoid heap allocation and GC pressure, making them faster for small, frequently-used data. However, passing large structs by value copies all fields, which can be slower than passing a reference.`,
        followUp: [
          'Where does a value type live when it is a field inside a class?',
          'Can a struct have a constructor in C#? What are the restrictions?',
        ],
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
    detailedExplanation: `LINQ (Language Integrated Query) provides a unified query syntax for collections, databases, and XML in C#. The most critical concept is deferred execution: a LINQ query does not run when defined, it runs only when enumerated (via foreach, ToList(), Count()). This means adding items to the source collection after defining the query will include them in the results.

IEnumerable<T> is for in-memory collections and filters data in your application. IQueryable<T> is for databases (EF Core) and translates LINQ expressions into SQL, so filtering happens at the database level. Always keep queries as IQueryable as long as possible and call ToList() only at the end.

Key operators to know: Where (filter), Select (project), SelectMany (flatten), OrderBy/ThenBy (sort), GroupBy (aggregate), and Skip/Take (pagination).`,
    keyConcepts: [
      'Deferred execution - queries run only when enumerated (foreach, ToList, Count)',
      'IEnumerable<T> filters in memory; IQueryable<T> translates to SQL',
      'Use ToList() to materialize results and avoid multiple enumerations',
    ],
    commonMistakes: [
      'Calling ToList() too early on IQueryable - loads all data to memory before filtering',
      'Multiple enumeration of IEnumerable - query executes multiple times',
      'Using OrderBy().OrderBy() instead of OrderBy().ThenBy() for multi-level sorting',
    ],
    codeExamples: [
      {
        title: 'Deferred vs Immediate Execution',
        language: 'csharp',
        code: `var numbers = new List<int> { 1, 2, 3, 4, 5 };

// Deferred - query is NOT executed yet
var query = numbers.Where(n => n > 2);

numbers.Add(6); // Add after query definition

// NOW query executes - includes 6!
foreach (var n in query)
    Console.Write(n + " "); // Output: 3 4 5 6

// Immediate execution - snapshot taken
var list = numbers.Where(n => n > 2).ToList();
numbers.Add(7);
// list does NOT include 7
Console.WriteLine(list.Count); // Output: 4`,
        explanation: 'A deferred query only stores the "recipe" and executes when iterated, so elements added to the source after query definition are included in the results.',
        output: '3 4 5 6\n4',
        keyPoints: [
          'Where(), Select(), OrderBy() are deferred - they return lazy iterators',
          'ToList(), Count(), First() are immediate - they execute the query right away',
        ],
      },
    ],
    practiceProblems: [
      {
        id: 'cefalo-d2-p1',
        title: 'LINQ Query Challenge - Student Grades',
        difficulty: 'medium',
        description: 'Given a list of students with Name, Subject, and Score, write LINQ queries to:\n1. Find the top scorer in each subject\n2. Find students who scored above average in ALL their subjects\n3. Get the subject with the highest average score\n\nUse both Query Syntax and Method Syntax.',
        sampleInput: `[("Alice","Math",85), ("Alice","Science",92), ("Bob","Math",95), ("Bob","Science",78), ("Carol","Math",88), ("Carol","Science",90)]`,
        sampleOutput: `Top scorers: Math-Bob(95), Science-Alice(92)
Above avg in all: None (no student scores above avg in every subject)
Highest avg subject: Math(89.33)`,
        hints: [
          'Use GroupBy on Subject, then OrderByDescending + First for top scorers',
          'For "above average in ALL subjects", first compute each subject avg, then check each student',
          'Use GroupBy + Average for subject averages',
        ],
        approaches: [
          {
            name: 'GroupBy + Aggregation',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(n)',
            explanation: 'Group by subject for per-subject analysis. For the "above average in all" query, compute subject averages first, then join with student scores to compare.',
            pseudocode: `// Top scorer per subject
students.GroupBy(s => s.Subject)
  .Select(g => new { Subject = g.Key, Top = g.OrderByDescending(s => s.Score).First() })

// Subject averages
var subjectAvg = students.GroupBy(s => s.Subject)
  .ToDictionary(g => g.Key, g => g.Average(s => s.Score))

// Students above avg in ALL their subjects
students.GroupBy(s => s.Name)
  .Where(g => g.All(s => s.Score > subjectAvg[s.Subject]))
  .Select(g => g.Key)`,
          },
        ],
        relatedTopics: ['LINQ', 'GroupBy', 'Aggregation'],
        companiesAsked: ['Cefalo', 'Brain Station 23'],
      },
    ],
    tasks: [
      'Practice 10 LINQ queries: Where, Select, OrderBy, GroupBy, Join',
      'Convert 5 query syntax queries to method syntax and vice versa',
      'Write custom LINQ extension methods: WhereIf, Paginate, DistinctBy',
      'Use LINQPad to experiment with deferred execution behavior',
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
        explanation: 'Deferred LINQ operators only execute when you enumerate them via foreach, ToList(), or Count().',
        difficulty: 'easy',
      },
      {
        question: 'What is the output?',
        options: ['3 4 5', '3 4 5 6', '1 2 3 4 5', '6'],
        correctAnswer: 1,
        codeSnippet: `var list = new List<int>{1,2,3,4,5};
var q = list.Where(x => x > 2);
list.Add(6);
Console.WriteLine(string.Join(" ", q));`,
        explanation: 'The query runs when enumerated, so 6 (added after definition) is included in the results.',
        difficulty: 'medium',
      },
      {
        question: 'Which operator flattens nested collections?',
        options: ['Select', 'SelectMany', 'Aggregate', 'Zip'],
        correctAnswer: 1,
        explanation: 'SelectMany flattens nested collections into a single sequence, unlike Select which preserves nesting.',
        difficulty: 'easy',
      },
      {
        question: 'What is wrong with this EF Core query?',
        options: [
          'Nothing is wrong',
          'ToList() is called too early, loading ALL users into memory before filtering',
          'Where clause has a syntax error',
          'Select cannot be used after ToList()',
        ],
        correctAnswer: 1,
        codeSnippet: `var activeUsers = dbContext.Users
    .ToList()              // <-- here
    .Where(u => u.IsActive)
    .Select(u => u.Name);`,
        explanation: 'ToList() forces immediate execution, loading all users into memory before Where filters them.',
        difficulty: 'hard',
      },
    ],
    interviewQuestions: [
      {
        question: 'Explain deferred execution in LINQ. How does it work internally?',
        answer: `Deferred execution means a LINQ query is not executed when defined. Methods like Where() and Select() return iterator objects using C#'s yield return mechanism. The query only runs when you enumerate it (foreach, ToList()), at which point MoveNext() processes elements one by one through the pipeline.

This has important implications: the query always works with the latest data (changes to the source are reflected), but multiple enumerations execute the query multiple times. For database queries via IQueryable, each enumeration sends a new SQL query. Cache results with ToList() when you need to enumerate more than once.`,
        followUp: [
          'What operators cause immediate execution? (ToList, Count, First, etc.)',
          'What is the difference between IEnumerable and IQueryable in deferred execution?',
        ],
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
    detailedExplanation: `Async/await is the primary pattern for asynchronous programming in C#. The await keyword suspends method execution without blocking the thread, allowing it to return to the thread pool and serve other requests. When the awaited I/O operation (HTTP call, DB query, file read) completes, execution resumes from where it left off.

The compiler transforms async methods into state machines. Each await point becomes a state transition, and a continuation is registered to resume execution after the awaited Task completes. This is why async/await is efficient for I/O - no thread is wasted while waiting.

Always use CancellationToken to support cancellation of async operations. Never use .Result or .Wait() as they can cause deadlocks, and avoid async void except for event handlers since exceptions from async void methods cannot be caught.`,
    keyConcepts: [
      'await suspends the method without blocking the thread - it returns to the pool',
      'Never use .Result or .Wait() - they can cause deadlocks',
      'Use async Task for methods, async void only for event handlers',
    ],
    commonMistakes: [
      'Using .Result or .Wait() - can cause deadlocks in ASP.NET and UI contexts',
      'Using async void for non-event-handler methods - unhandled exceptions crash the app',
      'Forgetting to await a Task - runs fire-and-forget, exceptions are silently lost',
    ],
    codeExamples: [
      {
        title: 'Async/Await with CancellationToken',
        language: 'csharp',
        code: `public async Task<string> FetchDataAsync(string url, CancellationToken ct = default)
{
    using var client = new HttpClient();

    // Pass cancellation token to HttpClient
    var response = await client.GetAsync(url, ct);
    response.EnsureSuccessStatusCode();

    // Check cancellation before processing
    ct.ThrowIfCancellationRequested();

    return await response.Content.ReadAsStringAsync(ct);
}

// Usage with timeout
var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));
try
{
    var data = await FetchDataAsync("https://api.example.com/data", cts.Token);
    Console.WriteLine(data);
}
catch (OperationCanceledException)
{
    Console.WriteLine("Request timed out or was cancelled");
}`,
        explanation: 'Pass CancellationToken through the entire async call chain, and use CancellationTokenSource with a TimeSpan for automatic timeouts.',
        keyPoints: [
          'Always pass CancellationToken to async methods that accept it',
          'CancellationTokenSource with TimeSpan creates an automatic timeout',
        ],
      },
    ],
    practiceProblems: [
      {
        id: 'cefalo-d3-p1',
        title: 'Parallel HTTP Requests with Rate Limiting',
        difficulty: 'medium',
        description: 'Write an async method that fetches data from multiple URLs concurrently, but limits the concurrency to a maximum of N simultaneous requests. Use SemaphoreSlim for rate limiting.',
        sampleInput: 'urls = ["url1", "url2", ..., "url10"], maxConcurrency = 3',
        sampleOutput: 'All 10 URLs fetched, but never more than 3 at the same time',
        hints: [
          'Use SemaphoreSlim with initial count = maxConcurrency',
          'Create a Task for each URL using Task.WhenAll',
          'Each task should await semaphore.WaitAsync() before the HTTP call and Release() in finally',
        ],
        approaches: [
          {
            name: 'SemaphoreSlim + Task.WhenAll',
            timeComplexity: 'O(n) where n = number of URLs, but limited by concurrency',
            spaceComplexity: 'O(n) for Task array',
            explanation: 'SemaphoreSlim acts as a gate limiting concurrent access. Each request awaits the semaphore before proceeding, ensuring at most N concurrent operations.',
            pseudocode: `async Task<string[]> FetchAllAsync(string[] urls, int maxConcurrency):
  var semaphore = new SemaphoreSlim(maxConcurrency)
  var tasks = urls.Select(async url => {
    await semaphore.WaitAsync()  // Wait for a slot
    try:
      return await httpClient.GetStringAsync(url)
    finally:
      semaphore.Release()  // Free the slot
  })
  return await Task.WhenAll(tasks)`,
          },
        ],
        relatedTopics: ['async/await', 'SemaphoreSlim', 'Task.WhenAll', 'Rate Limiting'],
        companiesAsked: ['Cefalo', 'SELISE', 'Therap'],
      },
    ],
    tasks: [
      'Write async methods using Task and ValueTask - compare performance',
      'Implement the rate-limited parallel HTTP fetcher from Practice Problem 1',
      'Reproduce the .Result deadlock: call GetAsync().Result from a sync method and observe the hang',
      'Practice CancellationToken usage in a chain of async methods',
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
        explanation: 'await suspends the method and releases the thread back to the pool until the Task completes.',
        difficulty: 'easy',
      },
      {
        question: 'When should you use ValueTask instead of Task?',
        options: [
          'When the operation always runs asynchronously',
          'When the result is frequently available synchronously to avoid heap allocation',
          'When you need to cancel the operation',
          'When multiple threads need to await the same result',
        ],
        correctAnswer: 1,
        explanation: 'ValueTask avoids heap allocation when results are frequently available synchronously, such as from a cache.',
        difficulty: 'medium',
      },
      {
        question: 'What is the danger of async void methods?',
        options: [
          'They run slower than async Task methods',
          'They cannot use await keyword',
          'Exceptions cannot be caught by the caller and crash the process',
          'They always run on a new thread',
        ],
        correctAnswer: 2,
        explanation: 'Exceptions from async void methods cannot be caught by the caller and crash the process.',
        difficulty: 'medium',
      },
      {
        question: 'What causes a deadlock in this code when called from ASP.NET?',
        options: [
          'Task.Delay is not a real async operation',
          '.Result blocks the thread, and await tries to resume on the same blocked thread',
          'The method is not marked async',
          'HttpClient is not thread-safe',
        ],
        correctAnswer: 1,
        codeSnippet: `public string Get()
{
    return GetAsync().Result;
}
async Task<string> GetAsync()
{
    await Task.Delay(1000);
    return "data";
}`,
        explanation: '.Result blocks the thread, and await tries to resume on that same blocked thread, causing a deadlock.',
        difficulty: 'hard',
      },
    ],
    interviewQuestions: [
      {
        question: 'Explain how async/await works internally in C#.',
        answer: `The compiler transforms an async method into a state machine. Each await point becomes a state transition. The generated MoveNext() method executes until the first await. If the awaited task is not complete, a continuation is registered and the method returns an incomplete Task to the caller, releasing the thread.

When the awaited operation completes, the continuation fires and MoveNext() resumes from the next state. The SynchronizationContext determines where the continuation runs - in ASP.NET Core there is none (any thread pool thread), while in WPF/WinForms it ensures the UI thread. This makes async/await efficient for I/O since no threads are blocked while waiting.`,
        followUp: [
          'How does ConfigureAwait(false) affect which thread the continuation runs on?',
          'What is the performance cost of the compiler-generated state machine?',
        ],
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
      { type: 'video', title: 'EF Core Full Course', url: 'https://www.youtube.com/watch?v=SryQxUeChMc' },
    ],
    detailedExplanation: `Entity Framework Core is .NET's official ORM that maps C# classes to database tables and translates LINQ queries to SQL. In the Code First approach, you write entity classes, then generate migrations to create or update the database schema. DbContext represents the database session and DbSet<T> properties represent tables. Always register DbContext as Scoped in ASP.NET Core (one per request).

Relationships are defined using navigation properties: ICollection<T> for one-to-many, a single reference for one-to-one, and in .NET 5+ many-to-many works without an explicit junction entity. Use Fluent API in OnModelCreating for full control over column types, indexes, and constraints.

Migrations version your schema changes. Run "dotnet ef migrations add Name" to generate a migration with Up() and Down() methods, then "dotnet ef database update" to apply it. Never edit an already-applied migration.`,
    keyConcepts: [
      'DbContext = database session (Scoped), DbSet<T> = table representation',
      'Code First: write entity classes, generate migrations, update database',
      'Fluent API in OnModelCreating gives full control over mapping and constraints',
    ],
    commonMistakes: [
      'Registering DbContext as Singleton - it is NOT thread-safe, must be Scoped',
      'Forgetting to call SaveChanges() after modifications - changes stay in memory',
      'Editing an already-applied migration instead of creating a new one',
    ],
    codeExamples: [
      {
        title: 'Code First Models with Relationships',
        language: 'csharp',
        code: `// Domain Entities
public class Author
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;

    // Navigation property - One Author has Many Books
    public ICollection<Book> Books { get; set; } = new List<Book>();
}

public class Book
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public DateTime PublishedDate { get; set; }

    // Foreign key
    public int AuthorId { get; set; }
    // Navigation property
    public Author Author { get; set; } = null!;

    // Many-to-Many (.NET 5+)
    public ICollection<Category> Categories { get; set; } = new List<Category>();
}

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public ICollection<Book> Books { get; set; } = new List<Book>();
}

// DbContext
public class BookStoreContext : DbContext
{
    public BookStoreContext(DbContextOptions<BookStoreContext> options)
        : base(options) { }

    public DbSet<Author> Authors => Set<Author>();
    public DbSet<Book> Books => Set<Book>();
    public DbSet<Category> Categories => Set<Category>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Author>(entity =>
        {
            entity.HasKey(a => a.Id);
            entity.Property(a => a.Name).HasMaxLength(100).IsRequired();
            entity.HasIndex(a => a.Email).IsUnique();
        });

        modelBuilder.Entity<Book>(entity =>
        {
            entity.Property(b => b.Price).HasPrecision(18, 2);
            entity.HasOne(b => b.Author)
                  .WithMany(a => a.Books)
                  .HasForeignKey(b => b.AuthorId)
                  .OnDelete(DeleteBehavior.Cascade);
        });
    }
}`,
        explanation: 'C# classes define the schema, Fluent API fine-tunes column types, indexes, and constraints, and ICollection<T> navigation properties define one-to-many relationships.',
        keyPoints: [
          'Navigation properties (ICollection<T>) define relationships in code',
          'Fluent API in OnModelCreating controls column types, indexes, and constraints',
        ],
      },
    ],
    practiceProblems: [
      {
        id: 'cefalo-d4-p1',
        title: 'Design a Blog Database with EF Core',
        difficulty: 'medium',
        description: 'Create EF Core models for a blog system with:\n- Users (Id, Username, Email, CreatedAt)\n- Posts (Id, Title, Content, PublishedAt, AuthorId)\n- Comments (Id, Text, CreatedAt, PostId, UserId)\n- Tags (Id, Name) with many-to-many relationship to Posts\n\nInclude proper Fluent API configuration, indexes, and cascade delete rules.',
        sampleInput: 'Design the entity classes and DbContext',
        sampleOutput: 'Complete EF Core model with relationships, constraints, and indexes',
        hints: [
          'User has many Posts (one-to-many), Post has many Comments (one-to-many)',
          'Post and Tag have many-to-many relationship',
          'Add unique index on User.Email and User.Username',
        ],
        approaches: [
          {
            name: 'Code First with Fluent API',
            timeComplexity: 'N/A',
            spaceComplexity: 'N/A',
            explanation: 'Define entity classes with navigation properties, then configure relationships and constraints in OnModelCreating using Fluent API.',
            pseudocode: `class User: Id, Username, Email, CreatedAt
  Navigation: ICollection<Post> Posts, ICollection<Comment> Comments

class Post: Id, Title, Content, PublishedAt, AuthorId
  Navigation: User Author, ICollection<Comment> Comments, ICollection<Tag> Tags

class Comment: Id, Text, CreatedAt, PostId, UserId
  Navigation: Post Post, User User

class Tag: Id, Name
  Navigation: ICollection<Post> Posts

OnModelCreating:
  User: HasIndex(Email).IsUnique(), HasIndex(Username).IsUnique()
  Post: HasOne(Author).WithMany(Posts).OnDelete(Cascade)
  Comment: HasOne(Post).WithMany(Comments).OnDelete(Cascade)
  Comment: HasOne(User).WithMany(Comments).OnDelete(NoAction) // avoid cascade cycle`,
          },
        ],
        relatedTopics: ['EF Core', 'Code First', 'Fluent API', 'Database Design'],
        companiesAsked: ['Cefalo', 'Brain Station 23', 'Enosis'],
      },
    ],
    tasks: [
      'Set up a Code First project with the Blog models from Practice Problem',
      'Create models with one-to-many and many-to-many relationships',
      'Run migrations: add InitialCreate, update database, add a second migration',
      'Implement CRUD operations with proper async/await',
    ],
    quiz: [
      {
        question: 'What is the recommended DI lifetime for DbContext in ASP.NET Core?',
        options: ['Singleton', 'Transient', 'Scoped', 'None'],
        correctAnswer: 2,
        explanation: 'Scoped creates one DbContext per HTTP request, which is the correct lifetime since DbContext is not thread-safe.',
        difficulty: 'easy',
      },
      {
        question: 'What does SaveChanges() do?',
        options: [
          'Saves the DbContext configuration',
          'Generates and executes SQL based on tracked entity changes',
          'Saves the connection string',
          'Commits the current transaction',
        ],
        correctAnswer: 1,
        explanation: 'SaveChanges() generates and executes SQL (INSERT/UPDATE/DELETE) for all tracked entity changes in a transaction.',
        difficulty: 'easy',
      },
      {
        question: 'Which approach is used to configure entity mappings with full control?',
        options: ['Data Annotations', 'Fluent API', 'Convention-based', 'XML mapping'],
        correctAnswer: 1,
        explanation: 'Fluent API in OnModelCreating provides the most control over entity-to-table mapping configuration.',
        difficulty: 'easy',
      },
      {
        question: 'What happens if you modify a tracked entity property and call SaveChanges()?',
        options: [
          'Nothing - you must call Update() first',
          'EF Core generates an UPDATE SQL for the changed properties',
          'The entire entity is re-inserted',
          'An exception is thrown',
        ],
        correctAnswer: 1,
        explanation: 'Change Tracker detects property changes automatically, so SaveChanges() generates UPDATE SQL without needing to call Update().',
        difficulty: 'medium',
      },
    ],
    interviewQuestions: [
      {
        question: 'What is the Change Tracker in EF Core and how does it work?',
        answer: `Change Tracker tracks the state of every entity loaded through DbContext. Entity states are: Added (will INSERT), Modified (will UPDATE), Deleted (will DELETE), Unchanged, and Detached (not tracked). When you modify a property, the Change Tracker detects it by comparing current values with the original snapshot.

When SaveChanges() is called, it inspects all tracked entities, generates the appropriate SQL for each state, and executes them in a single transaction. For read-only queries, use AsNoTracking() to skip change tracking and improve performance.`,
        followUp: [
          'When would you use AsNoTracking() and what are its implications?',
          'What happens if you modify a Detached entity and call SaveChanges()?',
        ],
      },
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
      { type: 'article', title: 'EF Core Performance', url: 'https://learn.microsoft.com/en-us/ef/core/performance/' },
    ],
    detailedExplanation: `The N+1 query problem is the most common EF Core performance issue. When you access navigation properties in a loop without eager loading, each iteration triggers a separate SQL query. For 100 authors, that means 101 queries (1 for authors + 100 for their books). Fix this with Include() to load related data upfront via JOINs, or better yet, use Select() projections to fetch only the columns you need.

For read-only queries, use AsNoTracking() to skip Change Tracker overhead (roughly 30% faster). Always apply Where() filters before calling ToList() so filtering happens at the database level, not in memory. Use Skip().Take() for pagination.

When multiple Include() calls cause Cartesian explosion (row multiplication), use AsSplitQuery() to execute separate smaller queries instead of one massive JOIN.`,
    keyConcepts: [
      'N+1 problem: accessing related data in a loop fires N extra queries - fix with Include() or Select()',
      'AsNoTracking() skips Change Tracker overhead for read-only queries (~30% faster)',
      'Use Select() projections to fetch only needed columns instead of full entities',
    ],
    commonMistakes: [
      'Calling ToList() before Where() - loads entire table into memory before filtering',
      'Relying on lazy loading in loops instead of Include() - causes N+1 queries',
      'Using string interpolation in FromSqlRaw - SQL injection risk, use FromSqlInterpolated',
    ],
    codeExamples: [
      {
        title: 'N+1 Problem and Solution',
        language: 'csharp',
        code: `// BAD: N+1 Problem (101 queries for 100 authors!)
var authors = await db.Authors.ToListAsync(); // Query 1: SELECT * FROM Authors
foreach (var author in authors)
{
    // Each access triggers a NEW query (lazy loading)
    Console.WriteLine($"{author.Name}: {author.Books.Count} books");
    // Query 2..101: SELECT * FROM Books WHERE AuthorId = @id
}

// GOOD: Eager Loading (1 query with JOIN)
var authors = await db.Authors
    .Include(a => a.Books)  // LEFT JOIN Books
    .ToListAsync(); // Single query!
foreach (var author in authors)
{
    Console.WriteLine($"{author.Name}: {author.Books.Count} books");
}

// BEST: Projection (only fetch what you need)
var authorSummaries = await db.Authors
    .Select(a => new {
        a.Name,
        BookCount = a.Books.Count // Translates to SQL COUNT
    })
    .ToListAsync(); // SELECT Name, (SELECT COUNT(*) ...) FROM Authors`,
        explanation: 'The N+1 problem generates 101 queries for 100 authors. Include() reduces it to 1 JOIN query, and Select() projection is the most efficient since it fetches only the columns you need.',
        keyPoints: [
          'Include() solves N+1 with a JOIN but loads full entity graphs',
          'Select() projection is the most efficient - fetches only needed columns',
        ],
      },
    ],
    practiceProblems: [
      {
        id: 'cefalo-d5-p1',
        title: 'Optimize a Slow EF Core Query',
        difficulty: 'hard',
        description: 'The following query takes 30 seconds on a table with 1M rows. Identify all performance issues and optimize it:\n\nvar result = db.Orders\n  .ToList()\n  .Where(o => o.Status == "Completed")\n  .Where(o => o.OrderDate.Year == 2024)\n  .Select(o => new {\n    o.Id,\n    CustomerName = o.Customer.Name,\n    Total = o.OrderItems.Sum(i => i.Price * i.Quantity)\n  })\n  .OrderByDescending(o => o.Total)\n  .Take(100)\n  .ToList();',
        sampleInput: 'Slow query on 1M rows',
        sampleOutput: 'Optimized query that runs in under 1 second',
        hints: [
          'The biggest issue: ToList() is called first - loads ALL 1M rows into memory',
          'Where, Select, OrderBy, Take should all happen BEFORE ToList() so they translate to SQL',
          'Customer.Name and OrderItems.Sum will cause N+1 if not handled properly',
        ],
        approaches: [
          {
            name: 'Server-Side Query Optimization',
            timeComplexity: 'O(n log n) at database level with proper indexes',
            spaceComplexity: 'O(100) - only top 100 results in memory',
            explanation: 'Move all filtering, sorting, and projection before materialization. Let the database do the work.',
            pseudocode: `// OPTIMIZED: Everything translates to SQL
var result = await db.Orders
  .AsNoTracking()   // Read-only, skip change tracking
  .Where(o => o.Status == "Completed")  // SQL WHERE
  .Where(o => o.OrderDate.Year == 2024)  // SQL WHERE
  .Select(o => new {  // SQL SELECT with subquery
    o.Id,
    CustomerName = o.Customer.Name,  // SQL JOIN
    Total = o.OrderItems.Sum(i => i.Price * i.Quantity) // SQL subquery SUM
  })
  .OrderByDescending(o => o.Total)  // SQL ORDER BY
  .Take(100)  // SQL TOP 100
  .ToListAsync();  // Only NOW execute and materialize

// Also add database index:
// CREATE INDEX IX_Orders_Status_Date ON Orders(Status, OrderDate) INCLUDE (Id)`,
          },
        ],
        relatedTopics: ['EF Core Performance', 'Query Optimization', 'SQL Indexes'],
        companiesAsked: ['Cefalo', 'Therap', 'Samsung'],
      },
    ],
    tasks: [
      'Practice eager loading with Include and ThenInclude',
      'Write the same query with and without AsNoTracking - compare performance',
      'Reproduce the N+1 problem and fix it with Include and Select projection',
      'Optimize the slow query from Practice Problem',
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
        explanation: 'Eager loading uses JOINs to load related data upfront, while lazy loading loads it on first access of the navigation property.',
        difficulty: 'easy',
      },
      {
        question: 'What performance benefit does AsNoTracking() provide?',
        options: [
          'It disables database logging',
          'It skips Change Tracker snapshots, reducing memory and CPU overhead for read queries',
          'It caches query results',
          'It runs queries in parallel',
        ],
        correctAnswer: 1,
        explanation: 'AsNoTracking() skips snapshot creation and identity resolution, making read-only queries up to 30% faster.',
        difficulty: 'medium',
      },
      {
        question: 'What is the N+1 query problem?',
        options: [
          'Running N queries when 1 would suffice, caused by accessing related data in a loop without eager loading',
          'Running too many INSERT operations',
          'Having too many indexes on a table',
          'Joining more than N tables',
        ],
        correctAnswer: 0,
        explanation: '1 query loads N parents, then each child access in a loop triggers an additional query - fix with Include() or Select().',
        difficulty: 'medium',
      },
      {
        question: 'Which approach prevents SQL injection when using raw SQL in EF Core?',
        options: [
          'FromSqlRaw($"SELECT * FROM Users WHERE Name = \'{name}\'")',
          'FromSqlInterpolated($"SELECT * FROM Users WHERE Name = {name}")',
          'Both are safe',
          'Neither is safe',
        ],
        correctAnswer: 1,
        explanation: 'FromSqlInterpolated automatically parameterizes values, while FromSqlRaw with string interpolation concatenates directly into SQL.',
        difficulty: 'hard',
      },
    ],
    interviewQuestions: [
      {
        question: 'How would you optimize EF Core query performance in a high-traffic application?',
        answer: `Use AsNoTracking() for read-only queries to skip Change Tracker overhead. Use Select() projections to fetch only needed columns instead of full entities. Add proper database indexes matching your WHERE and ORDER BY clauses, and always paginate with Skip/Take to avoid unbounded result sets.

For advanced optimization, use Compiled Queries (EF.CompileAsyncQuery) on hot paths to cache the LINQ-to-SQL translation, AsSplitQuery() to avoid Cartesian explosion from multiple Includes, and ExecuteUpdate/ExecuteDelete (.NET 7+) for bulk operations instead of loading entities one by one.`,
        followUp: [
          'What is a Compiled Query and when would you use it?',
          'How does AsSplitQuery work and what are its trade-offs?',
        ],
      },
    ],
  },
]
