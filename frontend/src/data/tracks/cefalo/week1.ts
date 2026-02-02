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
    detailedExplanation: `C# এ Value Types (int, float, bool, struct, enum) Stack এ store হয় এবং copy-by-value কাজ করে। Reference Types (class, interface, delegate, string, array, object) Heap এ store হয় এবং copy-by-reference কাজ করে।

Boxing হলো value type কে object (reference type) এ convert করা। এতে heap allocation হয় যা costly। Unboxing হলো এর বিপরীত - object থেকে value type এ convert করা। এতে type checking + copy হয়।

Collections এর মধ্যে Array হলো fixed-size, List<T> হলো dynamic array (internally array doubling), Dictionary<TKey,TValue> হলো hash table (O(1) lookup), HashSet<T> হলো unique elements, Queue<T> হলো FIFO, Stack<T> হলো LIFO।

struct vs class: struct হলো value type (stack), sealed, no inheritance, lightweight। class হলো reference type (heap), supports inheritance, can be null। Performance-critical small data (Point, Color) এর জন্য struct ব্যবহার করুন।

string হলো immutable reference type - প্রতিটি concatenation নতুন string object তৈরি করে। Loop এ string concat করলে StringBuilder ব্যবহার করুন, নাহলে O(n²) memory allocation হবে।`,
    keyConcepts: [
      'Value types live on stack, reference types on heap - this affects performance and GC pressure',
      'Boxing/unboxing causes heap allocation - avoid in hot paths and loops',
      'string is immutable - each modification creates a new object, use StringBuilder for loops',
      'struct is value type (copied on assignment), class is reference type (pointer copied)',
      'Generic collections (List<T>, Dictionary<K,V>) are type-safe and avoid boxing unlike ArrayList',
    ],
    commonMistakes: [
      'Using ArrayList instead of List<T> - ArrayList boxes value types causing performance issues',
      'Comparing strings with == instead of String.Equals() with StringComparison for culture-aware comparison',
      'Forgetting that struct assignment creates a copy - modifying the copy does not affect the original',
      'String concatenation in a loop without StringBuilder - O(n²) memory allocation',
      'Not understanding that default(int) is 0 but default(int?) is null',
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
        explanation: 'struct (value type) assign করলে পুরো data copy হয়। class (reference type) assign করলে reference/pointer copy হয়, data shared থাকে।',
        output: '1\n10',
        keyPoints: [
          'struct assignment copies all fields (deep copy)',
          'class assignment copies the reference (shallow - same object)',
          'This is why struct is ideal for small immutable data like coordinates',
        ],
      },
      {
        title: 'Boxing/Unboxing and Performance Impact',
        language: 'csharp',
        code: `// Boxing - value type to object (heap allocation)
int num = 42;
object boxed = num;  // Boxing: copies int to heap

// Unboxing - object back to value type
int unboxed = (int)boxed;  // Unboxing: type check + copy

// BAD: ArrayList causes boxing for value types
ArrayList list = new ArrayList();
list.Add(1);    // Boxing happens here!
list.Add(2);    // Boxing again!
int val = (int)list[0]; // Unboxing

// GOOD: Generic List<T> avoids boxing
List<int> genericList = new List<int>();
genericList.Add(1);  // No boxing!
genericList.Add(2);  // No boxing!
int val2 = genericList[0]; // No unboxing!`,
        explanation: 'Boxing heap allocation করে এবং GC pressure বাড়ায়। Generic collections (List<T>) ব্যবহার করলে value types এর জন্য boxing এড়ানো যায়।',
        keyPoints: [
          'Each boxing creates a new object on the heap (~12 bytes overhead)',
          'ArrayList.Add(int) causes boxing; List<int>.Add(int) does not',
          'In tight loops, boxing can cause significant GC pressure and slowdown',
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
      {
        id: 'cefalo-d1-p2',
        title: 'Implement a Type-Safe Stack using Generics',
        difficulty: 'medium',
        description: 'Implement a generic Stack<T> class from scratch (without using System.Collections.Generic.Stack). It should support Push(T item), T Pop(), T Peek(), bool IsEmpty, and int Count. Use an internal array that doubles when full.',
        sampleInput: 'Push(1), Push(2), Push(3), Pop(), Peek(), Count',
        sampleOutput: 'Pop returns 3, Peek returns 2, Count = 2',
        hints: [
          'Use a private T[] array and an int top pointer',
          'When top == array.Length, create new array of double size and copy elements',
          'Pop should throw InvalidOperationException if stack is empty',
        ],
        approaches: [
          {
            name: 'Dynamic Array Approach',
            timeComplexity: 'O(1) amortized for Push/Pop',
            spaceComplexity: 'O(n)',
            explanation: 'Use an internal array. When full, allocate a new array of double size and copy. This gives O(1) amortized push because the doubling cost is spread across n insertions.',
            pseudocode: `class Stack<T>:
  private T[] items = new T[4]
  private int top = 0

  Push(item):
    if top == items.Length:
      newArr = new T[items.Length * 2]
      Array.Copy(items, newArr, items.Length)
      items = newArr
    items[top++] = item

  Pop():
    if top == 0: throw InvalidOperationException
    return items[--top]

  Peek(): return items[top - 1]
  Count: return top
  IsEmpty: return top == 0`,
          },
        ],
        relatedTopics: ['Generics', 'Data Structures', 'Amortized Analysis'],
        companiesAsked: ['Cefalo', 'Therap'],
      },
    ],
    tasks: [
      'Review value types vs reference types with code examples',
      'Practice boxing/unboxing - write 3 examples showing performance difference',
      'Write examples using List<T>, Dictionary<K,V>, HashSet<T>, Queue<T>',
      'Implement the generic Stack<T> practice problem above',
    ],
    quiz: [
      {
        question: 'Which of the following is a value type in C#?',
        options: ['string', 'object', 'int', 'class instance'],
        correctAnswer: 2,
        explanation: 'int is a value type (struct). string and object are reference types. Class instances are always reference types.',
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
        explanation: 'Boxing wraps a value type in a System.Object and allocates it on the managed heap. This involves memory allocation and copying.',
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
        explanation: 'Boxing creates a COPY of the value on the heap. Changing the original int does not affect the boxed copy. boxed still holds 10, so 10 == 20 is False.',
        difficulty: 'medium',
      },
      {
        question: 'Which collection should you use for O(1) key-based lookups?',
        options: ['List<T>', 'LinkedList<T>', 'Dictionary<TKey, TValue>', 'SortedList<TKey, TValue>'],
        correctAnswer: 2,
        explanation: 'Dictionary<TKey,TValue> uses a hash table internally providing O(1) average lookup. SortedList uses binary search (O(log n)). List requires O(n) linear search.',
        difficulty: 'easy',
      },
      {
        question: 'What is the output?',
        options: ['Hello World', 'Hello', 'Compile Error', 'Empty string'],
        correctAnswer: 0,
        codeSnippet: `string s1 = "Hello";
string s2 = s1;
s1 = s1 + " World";
Console.WriteLine(s1);`,
        explanation: 'string is immutable but s1 is reassigned to a new string "Hello World". s2 still points to "Hello". The output is "Hello World".',
        difficulty: 'medium',
      },
      {
        question: 'When should you use struct instead of class?',
        options: [
          'When the type needs inheritance',
          'When you need a small, immutable data container under 16 bytes',
          'When you want null values',
          'When the object has a long lifetime',
        ],
        correctAnswer: 1,
        explanation: 'Microsoft recommends struct for small (<16 bytes), immutable types that are frequently created/destroyed. Structs avoid heap allocation and GC pressure.',
        difficulty: 'medium',
      },
    ],
    interviewQuestions: [
      {
        question: 'What is the difference between value types and reference types in C#? Give examples.',
        answer: `Value types (int, float, bool, struct, enum) are stored on the stack and contain the actual data. When you assign one value type to another, a complete copy is made. They cannot be null (unless nullable).

Reference types (class, interface, delegate, string, array) are stored on the heap with a reference/pointer on the stack. Assignment copies the reference, not the data. Multiple variables can point to the same object. They can be null.

Key performance implication: value types avoid heap allocation and GC pressure, making them faster for small, frequently-used data. But passing large structs by value copies all data, which can be slower than passing a reference.`,
        followUp: [
          'Where exactly does a local value type variable live - stack or heap? What about value types inside a class?',
          'Can a struct have a constructor in C#? What are the restrictions?',
          'What is the Span<T> type and how does it relate to stack allocation?',
        ],
      },
      {
        question: 'Explain boxing and unboxing. Why should you avoid it?',
        answer: `Boxing is the process of converting a value type to a reference type (object or interface). The CLR allocates memory on the heap, copies the value into the new object, and returns a reference. Unboxing is the reverse - extracting the value type from the object.

You should avoid boxing because: (1) It causes heap allocation which puts pressure on the garbage collector. (2) Each box operation allocates ~12+ bytes of overhead. (3) In tight loops, boxing can cause thousands of unnecessary allocations.

Common places boxing happens: storing value types in non-generic collections (ArrayList, Hashtable), passing value types to methods expecting object parameters, using value types with non-generic interfaces.

Solution: Use generic collections (List<T> instead of ArrayList), generic methods, and generic interfaces (IComparable<T> instead of IComparable).`,
        followUp: [
          'How can you detect boxing in your code using tools like BenchmarkDotNet or IL inspection?',
          'Does boxing happen when you call ToString() on an int?',
          'What is the difference between (int)obj and Convert.ToInt32(obj)?',
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
    detailedExplanation: `LINQ (Language Integrated Query) হলো C# এর সবচেয়ে powerful feature গুলোর একটি। এটা collections, databases, XML এর উপর unified query syntax দেয়।

দুটি syntax আছে: Query Syntax (from x in collection where... select...) এবং Method Syntax (collection.Where(...).Select(...)). দুটোই internally same IL code generate করে, কিন্তু Method Syntax বেশি flexible কারণ সব LINQ operators method syntax এ available।

Deferred Execution হলো LINQ এর সবচেয়ে important concept। Query define করলে execute হয় না - iterate করলে (foreach, ToList(), Count()) তখন execute হয়। এর মানে একটা query variable reuse করলে প্রতিবার fresh data পাবেন।

IEnumerable<T> vs IQueryable<T>: IEnumerable LINQ to Objects এর জন্য - in-memory collections process করে। IQueryable LINQ to SQL/EF এর জন্য - Expression Tree বানায় যা SQL query তে translate হয়। IQueryable ব্যবহার করলে database এ filtering হয় (efficient), IEnumerable ব্যবহার করলে সব data memory তে আনার পর filter হয় (inefficient)।

Common operators: Where (filter), Select (transform/project), OrderBy/ThenBy (sort), GroupBy (group), Join (combine), Aggregate (Sum, Count, Average, Min, Max), First/FirstOrDefault, Any/All, Skip/Take (pagination), Distinct, SelectMany (flatten).`,
    keyConcepts: [
      'Deferred execution - LINQ queries execute only when enumerated (foreach, ToList, Count)',
      'IEnumerable<T> = in-memory, IQueryable<T> = translated to SQL (Expression Trees)',
      'Select = projection/transformation, Where = filtering, SelectMany = flattening nested collections',
      'GroupBy returns IGrouping<TKey, TElement> - use it for aggregation like SQL GROUP BY',
      'Always call ToList()/ToArray() when you need to materialize results to avoid multiple enumerations',
    ],
    commonMistakes: [
      'Calling ToList() too early on IQueryable - brings all data to memory before filtering',
      'Multiple enumeration of the same IEnumerable - query executes multiple times',
      'Using LINQ in performance-critical hot paths - LINQ has overhead from delegate invocations',
      'Forgetting that OrderBy().OrderBy() replaces the first sort - use OrderBy().ThenBy() instead',
      'Not understanding that Where() on IQueryable generates SQL WHERE, but on IEnumerable filters in memory',
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
        explanation: 'Deferred execution মানে query variable শুধু "recipe" ধরে রাখে। Iterate করলে তখন execute হয়, তাই source এ পরে add করা element ও পায়।',
        output: '3 4 5 6\n4',
        keyPoints: [
          'Where(), Select(), OrderBy() are deferred - they return lazy iterators',
          'ToList(), ToArray(), Count(), First() are immediate - they execute the query',
          'Multiple enumeration means multiple execution - cache with ToList() when needed',
        ],
      },
      {
        title: 'GroupBy, Join, and Aggregation',
        language: 'csharp',
        code: `var employees = new List<(string Name, string Dept, int Salary)> {
    ("Alice", "Engineering", 90000),
    ("Bob", "Engineering", 85000),
    ("Carol", "Marketing", 75000),
    ("Dave", "Marketing", 70000),
    ("Eve", "Engineering", 95000),
};

// GroupBy with aggregation
var deptStats = employees
    .GroupBy(e => e.Dept)
    .Select(g => new {
        Department = g.Key,
        Count = g.Count(),
        AvgSalary = g.Average(e => e.Salary),
        MaxSalary = g.Max(e => e.Salary)
    });

foreach (var d in deptStats)
    Console.WriteLine($"{d.Department}: {d.Count} people, Avg: {d.AvgSalary:C}");

// SelectMany - flatten nested collections
var departments = new[] {
    new { Name = "Eng", Employees = new[] { "Alice", "Bob" } },
    new { Name = "Mkt", Employees = new[] { "Carol", "Dave" } },
};
var allEmployees = departments.SelectMany(d => d.Employees);
// Result: ["Alice", "Bob", "Carol", "Dave"]`,
        explanation: 'GroupBy SQL এর GROUP BY এর মতো কাজ করে। SelectMany nested collections flatten করে - এটা LINQ এর most misunderstood operator।',
        keyPoints: [
          'GroupBy returns IEnumerable<IGrouping<K,V>> where Key is the group key',
          'SelectMany flattens: List<List<T>> becomes List<T>',
          'Anonymous types (new { ... }) are great for projections in Select/GroupBy',
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
Above avg in all: Carol
Highest avg subject: Science(86.67)`,
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
      {
        id: 'cefalo-d2-p2',
        title: 'Implement Custom LINQ Extension Methods',
        difficulty: 'hard',
        description: 'Implement the following custom LINQ extension methods:\n1. WhereNot<T>(Func<T,bool> predicate) - inverse of Where\n2. DistinctBy<T,TKey>(Func<T,TKey> keySelector) - distinct by a specific property\n3. Batch<T>(int size) - splits a sequence into batches of given size\n\nAll must use deferred execution (yield return).',
        sampleInput: 'numbers = [1,2,3,4,5,6,7,8,9,10]',
        sampleOutput: `WhereNot(n => n > 5): [1,2,3,4,5]
Batch(3): [[1,2,3],[4,5,6],[7,8,9],[10]]`,
        hints: [
          'Extension methods must be in a static class with "this" parameter',
          'Use yield return for deferred execution',
          'For Batch, use a List buffer and yield when buffer.Count == size',
        ],
        approaches: [
          {
            name: 'Iterator Pattern (yield return)',
            timeComplexity: 'O(n) per enumeration',
            spaceComplexity: 'O(1) for WhereNot, O(n) for DistinctBy (HashSet), O(batchSize) for Batch',
            explanation: 'Use C# iterators (yield return) to implement lazy evaluation. Each method processes one element at a time, matching LINQ\'s deferred execution model.',
            pseudocode: `static IEnumerable<T> WhereNot<T>(this IEnumerable<T> source, Func<T,bool> pred):
  foreach item in source:
    if NOT pred(item): yield return item

static IEnumerable<T> DistinctBy<T,TKey>(this IEnumerable<T> source, Func<T,TKey> keySelector):
  var seen = new HashSet<TKey>()
  foreach item in source:
    if seen.Add(keySelector(item)): yield return item

static IEnumerable<List<T>> Batch<T>(this IEnumerable<T> source, int size):
  var batch = new List<T>(size)
  foreach item in source:
    batch.Add(item)
    if batch.Count == size:
      yield return batch
      batch = new List<T>(size)
  if batch.Count > 0: yield return batch`,
          },
        ],
        relatedTopics: ['Extension Methods', 'Iterators', 'yield return', 'LINQ internals'],
        companiesAsked: ['Cefalo', 'SELISE'],
      },
    ],
    tasks: [
      'Practice 10 LINQ queries: Where, Select, OrderBy, GroupBy, Join',
      'Convert 5 query syntax queries to method syntax and vice versa',
      'Implement the 3 custom LINQ extension methods from Practice Problem 2',
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
        explanation: 'LINQ queries with deferred execution (Where, Select, OrderBy) only execute when you enumerate them - via foreach, ToList(), Count(), etc.',
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
        explanation: 'Deferred execution means the query runs when enumerated. By the time we enumerate (string.Join), 6 has been added, so the result includes 6.',
        difficulty: 'medium',
      },
      {
        question: 'Which operator flattens nested collections?',
        options: ['Select', 'SelectMany', 'Aggregate', 'Zip'],
        correctAnswer: 1,
        explanation: 'SelectMany flattens: if you have IEnumerable<IEnumerable<T>>, SelectMany produces IEnumerable<T>. Select would keep the nesting.',
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
        explanation: 'ToList() forces immediate execution, loading ALL users from database into memory. The Where filter then runs in-memory. Move ToList() to the end to let EF translate Where to SQL WHERE clause.',
        difficulty: 'hard',
      },
      {
        question: 'What is the difference between OrderBy().OrderBy() and OrderBy().ThenBy()?',
        options: [
          'They are identical',
          'OrderBy().OrderBy() chains two sorts correctly; ThenBy() is a shortcut',
          'OrderBy().OrderBy() replaces the first sort; ThenBy() preserves it as secondary',
          'ThenBy() can only be used with descending order',
        ],
        correctAnswer: 2,
        explanation: 'OrderBy().OrderBy() completely replaces the first sort. To do multi-level sorting, use OrderBy() for primary and ThenBy() for secondary sort.',
        difficulty: 'medium',
      },
    ],
    interviewQuestions: [
      {
        question: 'Explain deferred execution in LINQ. How does it work internally?',
        answer: `Deferred execution means a LINQ query is not executed at the point of its definition. Instead, the query is stored as an expression and executed only when the result is actually needed (enumerated).

Internally, methods like Where() and Select() return iterator objects that implement IEnumerable<T>. These iterators use C#'s yield return mechanism. When you enumerate (foreach, ToList()), the iterator's MoveNext() is called, which executes the query pipeline element by element.

Benefits: (1) Avoids unnecessary computation if only part of the result is needed. (2) Always works with the latest data. (3) Enables query composition without intermediate collections.

Pitfalls: (1) Multiple enumeration executes the query multiple times. (2) If the source changes between enumerations, results differ. (3) For database queries (IQueryable), each enumeration sends a new SQL query.`,
        followUp: [
          'What operators cause immediate execution? (ToList, Count, First, Sum, etc.)',
          'How would you prevent multiple enumeration of an expensive query?',
          'What is the difference between IEnumerable and IQueryable in terms of deferred execution?',
        ],
      },
      {
        question: 'What is the difference between IEnumerable<T> and IQueryable<T>?',
        answer: `IEnumerable<T> works with in-memory collections (LINQ to Objects). It accepts Func<T,bool> delegates for operations like Where(). The filtering happens in your application's memory.

IQueryable<T> works with external data sources like databases (LINQ to SQL, EF Core). It accepts Expression<Func<T,bool>> - expression trees that can be translated to SQL. The filtering happens at the database level.

Key difference: If you have a database table with 1 million rows and want rows where Age > 25:
- IEnumerable: Fetches all 1M rows to memory, then filters → slow, memory-heavy
- IQueryable: Translates to SQL "WHERE Age > 25", database returns only matching rows → fast, efficient

Best practice: Keep the type as IQueryable as long as possible when building queries against EF Core. Only materialize (ToList/ToArray) at the very end.`,
        followUp: [
          'What happens if you cast an IQueryable to IEnumerable and then filter?',
          'Can you create your own IQueryable provider?',
          'How does EF Core translate LINQ expressions to SQL?',
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
    detailedExplanation: `Async/await হলো C# এ asynchronous programming এর primary pattern। এটা thread block না করে I/O operations (HTTP calls, DB queries, file read) এর জন্য wait করতে দেয়।

async keyword method কে asynchronous হিসেবে mark করে এবং একটি state machine generate করে। await keyword একটি Task বা ValueTask এর completion এর জন্য wait করে - কিন্তু thread block করে না। পরিবর্তে, method execution suspend হয় এবং thread pool এ thread ফিরে যায় অন্য কাজ করতে।

Task vs ValueTask: Task হলো reference type (heap allocation)। ValueTask হলো struct (stack allocation)। যদি method frequently synchronously complete হয় (e.g., cached result), ValueTask ব্যবহার করলে heap allocation avoid হয়। কিন্তু ValueTask এর restrictions আছে - একবারই await করা যায়, multiple await বা .Result/.GetAwaiter() concurrent ব্যবহার করলে undefined behavior।

CancellationToken ব্যবহার করে async operations cancel করা যায়। API endpoint এ client disconnect হলে, long-running operation cancel করতে এটা essential। প্রতিটি async method এ CancellationToken parameter accept করুন এবং token.ThrowIfCancellationRequested() call করুন।

Common pitfalls: (1) async void - শুধু event handlers এ ব্যবহার করুন, অন্যথায় exceptions catch হবে না। (2) .Result বা .Wait() - deadlock হতে পারে। (3) ConfigureAwait(false) - library code এ ব্যবহার করুন, UI code এ না। (4) Forgetting to await - Task fire-and-forget হয়ে যায়, exceptions lost হয়।`,
    keyConcepts: [
      'await suspends execution WITHOUT blocking the thread - thread returns to pool for other work',
      'Task = heap allocated, ValueTask = stack allocated (use for frequently synchronous completions)',
      'CancellationToken enables cooperative cancellation of async operations',
      'async void should ONLY be used for event handlers - use async Task for everything else',
      'ConfigureAwait(false) avoids capturing SynchronizationContext - use in library code',
    ],
    commonMistakes: [
      'Using .Result or .Wait() on a Task - can cause deadlocks in ASP.NET and UI contexts',
      'Using async void for non-event-handler methods - exceptions become unhandled and crash the app',
      'Forgetting to await a Task - the operation runs fire-and-forget, exceptions are silently lost',
      'Not passing CancellationToken through the call chain - makes operations uncancellable',
      'Creating unnecessary async methods that just wrap a synchronous call - adds state machine overhead',
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
        explanation: 'CancellationToken propagate করুন chain এর মধ্য দিয়ে। TimeSpan সহ CancellationTokenSource ব্যবহারে automatic timeout পাবেন।',
        keyPoints: [
          'Always pass CancellationToken to async methods that accept it',
          'CancellationTokenSource with TimeSpan creates an automatic timeout',
          'OperationCanceledException is the standard way to handle cancellation',
        ],
      },
      {
        title: 'Task vs ValueTask and When to Use Each',
        language: 'csharp',
        code: `// Cache example - result often available synchronously
private Dictionary<int, User> _cache = new();

// GOOD: ValueTask avoids heap allocation when cache hits
public ValueTask<User> GetUserAsync(int id)
{
    if (_cache.TryGetValue(id, out var user))
        return ValueTask.FromResult(user); // No allocation!

    return new ValueTask<User>(LoadFromDbAsync(id));
}

// BAD: Task always allocates on heap even for cached results
public Task<User> GetUserTaskAsync(int id)
{
    if (_cache.TryGetValue(id, out var user))
        return Task.FromResult(user); // Allocates Task object!

    return LoadFromDbAsync(id);
}

private async Task<User> LoadFromDbAsync(int id)
{
    // Simulate DB call
    await Task.Delay(100);
    var user = new User { Id = id, Name = "User " + id };
    _cache[id] = user;
    return user;
}`,
        explanation: 'ValueTask cache hit এ zero allocation দেয়। কিন্তু ValueTask একবারই await করা যায় - multiple await বা .Result concurrent ব্যবহার undefined behavior।',
        output: 'Cache hit: no heap allocation with ValueTask\nCache miss: same as Task',
        keyPoints: [
          'Use ValueTask when the result is frequently available synchronously (caching)',
          'ValueTask can only be awaited ONCE - never store or await multiple times',
          'For most cases, Task is simpler and safer - use ValueTask only for optimization',
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
      {
        id: 'cefalo-d3-p2',
        title: 'Identify and Fix Deadlock',
        difficulty: 'hard',
        description: 'The following code causes a deadlock in ASP.NET. Identify why and fix it.\n\npublic string GetData()\n{\n    var result = GetDataAsync().Result; // Deadlock!\n    return result;\n}\n\nprivate async Task<string> GetDataAsync()\n{\n    await Task.Delay(1000);\n    return "data";\n}',
        sampleInput: 'Call GetData() from an ASP.NET controller',
        sampleOutput: 'Fixed code that does not deadlock',
        hints: [
          '.Result blocks the current thread waiting for the Task to complete',
          'The await tries to resume on the captured SynchronizationContext (the blocked thread)',
          'Solution 1: Make the caller async. Solution 2: Use ConfigureAwait(false)',
        ],
        approaches: [
          {
            name: 'Make Caller Async (Best)',
            timeComplexity: 'N/A',
            spaceComplexity: 'N/A',
            explanation: 'The deadlock happens because .Result blocks the thread, and await tries to resume on that blocked thread. The fix is to make the entire call chain async.',
            pseudocode: `// FIX 1: Make caller async (preferred)
public async Task<string> GetData():
  return await GetDataAsync()

// FIX 2: ConfigureAwait(false) (for library code)
private async Task<string> GetDataAsync():
  await Task.Delay(1000).ConfigureAwait(false) // Don't capture context
  return "data"

// WHY deadlock happens:
// 1. GetData() calls .Result → blocks ASP.NET request thread
// 2. GetDataAsync() starts Task.Delay
// 3. After delay, await tries to resume on ASP.NET SyncContext
// 4. But that thread is blocked by .Result → DEADLOCK`,
          },
        ],
        relatedTopics: ['Deadlock', 'SynchronizationContext', 'ConfigureAwait'],
        companiesAsked: ['Cefalo', 'Kaz Software'],
      },
    ],
    tasks: [
      'Write async methods using Task and ValueTask - compare performance',
      'Implement the rate-limited parallel HTTP fetcher from Practice Problem 1',
      'Reproduce and fix the deadlock scenario from Practice Problem 2',
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
        explanation: 'await does NOT block the thread. It suspends the async method, releases the thread back to the pool, and resumes execution when the awaited Task completes.',
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
        explanation: 'ValueTask is a struct (no heap allocation) ideal for methods that often complete synchronously (e.g., cached results). Task is always heap-allocated.',
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
        explanation: 'async void methods throw exceptions directly on the SynchronizationContext. The caller cannot catch them with try/catch. This can crash the entire process.',
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
        explanation: '.Result blocks the ASP.NET request thread. When Task.Delay completes, await tries to resume on the captured SynchronizationContext (the blocked thread) → deadlock.',
        difficulty: 'hard',
      },
      {
        question: 'What is the correct way to run multiple independent async operations concurrently?',
        options: [
          'await task1; await task2; await task3;',
          'var results = await Task.WhenAll(task1, task2, task3);',
          'Task.WaitAll(task1, task2, task3);',
          'Parallel.ForEach(tasks, t => t.Wait());',
        ],
        correctAnswer: 1,
        explanation: 'Task.WhenAll starts all tasks concurrently and awaits all completions without blocking. Sequential await runs them one after another. WaitAll blocks the thread.',
        difficulty: 'medium',
      },
    ],
    interviewQuestions: [
      {
        question: 'Explain how async/await works internally in C#.',
        answer: `When you mark a method as async, the C# compiler transforms it into a state machine. Each await point becomes a state transition.

The state machine implements IAsyncStateMachine with a MoveNext() method. When the method first runs, MoveNext() executes until the first await. If the awaited task isn't complete, the method registers a continuation and returns an incomplete Task to the caller. The thread is released.

When the awaited operation completes, the continuation fires and MoveNext() is called again, resuming from the next state. This continues until the method completes.

The SynchronizationContext determines WHERE the continuation runs. In ASP.NET Core, there's no SyncContext (continuations run on any thread pool thread). In WPF/WinForms, the SyncContext ensures continuation runs on the UI thread.

This is why async/await is efficient - no threads are blocked during I/O operations. The thread pool thread is free to serve other requests.`,
        followUp: [
          'What is the role of TaskScheduler in async/await?',
          'How does ConfigureAwait(false) affect the continuation?',
          'What is the performance cost of the state machine generated by async/await?',
        ],
      },
      {
        question: 'What is the difference between Task.Run and async/await? When would you use each?',
        answer: `Task.Run queues work to the thread pool - it runs CPU-bound code on a background thread. async/await is for I/O-bound operations that are naturally asynchronous.

Use Task.Run for CPU-bound work: complex calculations, image processing, data crunching. It offloads work from the current thread (e.g., UI thread) to a thread pool thread.

Use async/await for I/O-bound work: HTTP calls, database queries, file operations. These operations don't need a thread while waiting - the thread is released.

In ASP.NET Core, avoid Task.Run for I/O operations. ASP.NET already runs on thread pool threads, so Task.Run just adds overhead (context switch) without benefit. Use async/await directly.

In UI apps (WPF/WinForms), Task.Run is useful to keep the UI responsive while doing CPU-bound work on a background thread.`,
        followUp: [
          'What happens if you use Task.Run inside an ASP.NET controller?',
          'Can you use async/await with CPU-bound operations? Should you?',
          'What is the difference between Task.Run and Task.Factory.StartNew?',
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
    detailedExplanation: `Entity Framework Core হলো .NET এর official ORM (Object-Relational Mapper)। এটা C# classes কে database tables এ map করে এবং LINQ queries কে SQL এ translate করে।

Code First approach এ আপনি C# class লেখেন (Entity), তারপর EF Core সেই class থেকে database table তৈরি করে migration এর মাধ্যমে। Database First approach এ existing database থেকে scaffolding করে classes generate হয়। Cefalo তে Code First বেশি ব্যবহার হয়।

DbContext হলো EF Core এর central class - এটা database session represent করে। DbSet<T> property গুলো database tables represent করে। DbContext এর lifetime ASP.NET Core এ Scoped হওয়া উচিত (per-request)।

Relationships: One-to-Many (একটি Author এর অনেক Books), Many-to-Many (.NET 5+ এ implicit junction table), One-to-One (User ↔ UserProfile)। Navigation properties এবং foreign keys দিয়ে relationships define করা হয়। Fluent API বা Data Annotations দিয়ে configuration করা যায়।

Migrations হলো database schema versioning system। dotnet ef migrations add <name> নতুন migration তৈরি করে, dotnet ef database update apply করে। প্রতিটি migration Up() এবং Down() method আছে - Up apply করে, Down rollback করে।`,
    keyConcepts: [
      'DbContext = database session, DbSet<T> = table. DbContext should be Scoped in ASP.NET Core',
      'Code First: Write C# classes → generate migrations → create/update database',
      'Navigation properties define relationships (ICollection<T> for one-to-many, single reference for one-to-one)',
      'Fluent API (OnModelCreating) gives full control over mapping; Data Annotations are simpler but limited',
      'Migrations track schema changes - Up() applies, Down() reverts. Never edit applied migrations.',
    ],
    commonMistakes: [
      'Registering DbContext as Singleton - DbContext is NOT thread-safe, must be Scoped',
      'Not calling SaveChanges() after modifications - changes stay in memory only',
      'Editing an already-applied migration instead of creating a new one',
      'Not understanding that EF Core tracks entity changes automatically (Change Tracker)',
      'Using string interpolation in LINQ queries - creates SQL injection vulnerability instead of parameterized query',
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
        explanation: 'Code First approach: C# classes define schema, Fluent API fine-tunes mapping. ICollection<Book> = one-to-many relationship. EF Core auto-creates junction table for many-to-many.',
        keyPoints: [
          'Navigation properties (ICollection<T>) define the relationship in code',
          'Fluent API in OnModelCreating gives precise control over column types, indexes, constraints',
          'DbSet<T> property = database table. EF maps property names to column names',
          'Many-to-many in .NET 5+ needs no junction entity - EF creates it automatically',
        ],
      },
      {
        title: 'Migrations and CRUD Operations',
        language: 'csharp',
        code: `// Terminal commands for migrations:
// dotnet ef migrations add InitialCreate
// dotnet ef database update
// dotnet ef migrations add AddAuthorEmail

// CRUD Operations
public class BookService
{
    private readonly BookStoreContext _db;

    public BookService(BookStoreContext db) => _db = db;

    // CREATE
    public async Task<Author> CreateAuthorAsync(string name, string email)
    {
        var author = new Author { Name = name, Email = email };
        _db.Authors.Add(author);
        await _db.SaveChangesAsync(); // Generates INSERT SQL
        return author; // author.Id is now populated
    }

    // READ with Include (Eager Loading)
    public async Task<Author?> GetAuthorWithBooksAsync(int id)
    {
        return await _db.Authors
            .Include(a => a.Books)  // JOIN to load books
            .FirstOrDefaultAsync(a => a.Id == id);
    }

    // UPDATE
    public async Task UpdateBookPriceAsync(int bookId, decimal newPrice)
    {
        var book = await _db.Books.FindAsync(bookId);
        if (book is null) throw new KeyNotFoundException();
        book.Price = newPrice; // Change Tracker detects this
        await _db.SaveChangesAsync(); // Generates UPDATE SQL
    }

    // DELETE
    public async Task DeleteAuthorAsync(int id)
    {
        var author = await _db.Authors.FindAsync(id);
        if (author is null) return;
        _db.Authors.Remove(author);
        await _db.SaveChangesAsync(); // Generates DELETE SQL
    }
}`,
        explanation: 'Change Tracker automatically detects property changes। SaveChanges() generates appropriate SQL (INSERT/UPDATE/DELETE)। Include() generates JOIN for eager loading.',
        keyPoints: [
          'Add() marks entity as Added, Remove() marks as Deleted',
          'SaveChanges() generates SQL based on Change Tracker state',
          'FindAsync() uses primary key lookup (uses cache first)',
          'Include() generates LEFT JOIN for eager loading related data',
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
        explanation: 'Scoped creates one DbContext per HTTP request. Singleton is dangerous (not thread-safe). Transient works but creates unnecessary instances.',
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
        explanation: 'SaveChanges() inspects the Change Tracker, generates INSERT/UPDATE/DELETE SQL for all changed entities, and executes them in a transaction.',
        difficulty: 'easy',
      },
      {
        question: 'Which approach is used to configure entity mappings with full control?',
        options: ['Data Annotations', 'Fluent API', 'Convention-based', 'XML mapping'],
        correctAnswer: 1,
        explanation: 'Fluent API (in OnModelCreating) provides the most control. Data Annotations are simpler but limited. EF Core uses conventions for defaults.',
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
        explanation: 'Change Tracker automatically detects property changes on tracked entities. SaveChanges() generates UPDATE SQL only for the modified columns.',
        difficulty: 'medium',
      },
      {
        question: 'What SQL is generated by this EF Core query?',
        options: [
          'SELECT * FROM Books',
          'SELECT * FROM Books WHERE Price > 20',
          'SELECT Title FROM Books WHERE Price > 20',
          'SELECT * FROM Books JOIN Authors WHERE Price > 20',
        ],
        correctAnswer: 2,
        codeSnippet: `var titles = await db.Books
    .Where(b => b.Price > 20)
    .Select(b => b.Title)
    .ToListAsync();`,
        explanation: 'EF Core translates LINQ to SQL. Where becomes SQL WHERE, Select with single property becomes selecting only that column. Only Title is fetched, not the entire Book.',
        difficulty: 'medium',
      },
    ],
    interviewQuestions: [
      {
        question: 'What is the Change Tracker in EF Core and how does it work?',
        answer: `Change Tracker is EF Core's mechanism for tracking the state of entities loaded through a DbContext. Every entity loaded from a query or added via DbSet is tracked.

Entity states: Added (new, will INSERT), Modified (changed property, will UPDATE), Deleted (removed, will DELETE), Unchanged (no changes), Detached (not tracked).

When you modify a property on a tracked entity, the Change Tracker detects it automatically by comparing current values with original (snapshot) values. When SaveChanges() is called, it inspects all tracked entities, generates appropriate SQL for each state, and executes them in a single transaction.

Performance implication: tracking adds overhead. For read-only queries, use .AsNoTracking() to skip change tracking - this can significantly improve performance for read-heavy operations.`,
        followUp: [
          'When would you use AsNoTracking() and what are the implications?',
          'How does EF Core detect changes - snapshot change tracking vs proxy?',
          'What happens if you modify a Detached entity and call SaveChanges()?',
        ],
      },
      {
        question: 'Explain Code First Migrations in EF Core.',
        answer: `Migrations are EF Core's way of versioning database schema changes. Each migration captures the difference between your current model and the previous state.

Workflow: (1) Modify your entity classes. (2) Run "dotnet ef migrations add MigrationName" - this generates a migration file with Up() and Down() methods. (3) Run "dotnet ef database update" to apply the migration.

Up() contains the SQL operations to apply the change (CREATE TABLE, ADD COLUMN, etc.). Down() contains the reverse operations for rollback.

The __EFMigrationsHistory table in the database tracks which migrations have been applied. EF compares this with the migrations in your code to determine what needs to be applied.

Best practices: (1) Always review generated migration code before applying. (2) Never modify an already-applied migration - create a new one. (3) Use meaningful names. (4) Test migrations against a copy of production data.`,
        followUp: [
          'How do you handle data migrations (not just schema changes)?',
          'What happens if two developers create conflicting migrations?',
          'How do you apply migrations in production (vs development)?',
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
    detailedExplanation: `EF Core এ data loading তিনভাবে হয়: Eager Loading (Include), Lazy Loading (proxy), এবং Explicit Loading (Load)।

Eager Loading (.Include()) query এর সাথেই related data load করে JOIN দিয়ে। এটা N+1 problem solve করে কিন্তু unnecessary data আনতে পারে। ThenInclude() nested relationships load করে।

Lazy Loading related data তখনই load করে যখন navigation property access হয়। এটা convenient কিন্তু N+1 query problem তৈরি করে - একটি loop এ 100 authors এর books access করলে 101 queries হয় (1 for authors + 100 for each author's books)। Production এ avoid করুন।

Query performance optimization: (1) AsNoTracking() read-only queries এর জন্য - Change Tracker overhead বাঁচায়। (2) Select() দিয়ে শুধু needed columns fetch করুন - SELECT * avoid করুন। (3) Where() আগে দিন - database level filtering। (4) Pagination এর জন্য Skip().Take()। (5) Raw SQL (FromSqlRaw) complex queries এর জন্য।

N+1 Query Problem: Loop এ navigation property access করলে প্রতিটি iteration এ একটি SQL query execute হয়। Solution: Include() ব্যবহার করে upfront load করুন, অথবা Select() দিয়ে projection করুন।

Split Queries: বড় Include() chains Cartesian explosion ঘটাতে পারে। AsSplitQuery() ব্যবহারে একটি big JOIN এর বদলে multiple smaller queries execute হয়।`,
    keyConcepts: [
      'Eager Loading (Include) prevents N+1 but may fetch unnecessary data - use Select for projections',
      'AsNoTracking() improves read performance by skipping Change Tracker snapshot',
      'N+1 problem: accessing navigation properties in a loop generates N+1 queries',
      'AsSplitQuery() avoids Cartesian explosion from multiple Include() calls',
      'Raw SQL (FromSqlRaw) for complex queries EF cannot translate, but always use parameters to prevent SQL injection',
    ],
    commonMistakes: [
      'Calling ToList() before Where() - loads entire table into memory then filters in C#',
      'Not using Include() and relying on lazy loading in loops - causes N+1 queries',
      'Using string interpolation in FromSqlRaw - SQL injection! Use FromSqlInterpolated or parameters',
      'Too many Include() calls causing Cartesian explosion - use AsSplitQuery() or projections',
      'Forgetting that Find() uses cache but FirstOrDefault() always queries the database',
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
        explanation: 'N+1 problem এ loop এ 100 authors এর books access করলে 101 SQL queries হয়। Include() দিয়ে JOIN করলে 1 query। Select() projection দিয়ে শুধু needed data আনলে সবচেয়ে efficient।',
        keyPoints: [
          'N+1 = 1 query for parent + N queries for each child - terrible performance',
          'Include() solves N+1 with a JOIN but loads full entity graphs',
          'Select() projection is the most efficient - only fetches needed columns',
        ],
      },
      {
        title: 'Performance-Optimized Querying Patterns',
        language: 'csharp',
        code: `// Pagination with optimized query
public async Task<PagedResult<BookDto>> GetBooksPagedAsync(
    int page, int pageSize, string? search = null)
{
    var query = db.Books
        .AsNoTracking() // No change tracking needed for reads
        .Include(b => b.Author);

    // Conditional filtering
    if (!string.IsNullOrEmpty(search))
        query = query.Where(b =>
            b.Title.Contains(search) || b.Author.Name.Contains(search));

    var totalCount = await query.CountAsync();

    var books = await query
        .OrderByDescending(b => b.PublishedDate)
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .Select(b => new BookDto  // Projection - only needed fields
        {
            Id = b.Id,
            Title = b.Title,
            AuthorName = b.Author.Name,
            Price = b.Price
        })
        .ToListAsync();

    return new PagedResult<BookDto>(books, totalCount, page, pageSize);
}

// Raw SQL for complex queries (parameterized!)
var minPrice = 20m;
var books = await db.Books
    .FromSqlInterpolated($@"
        SELECT * FROM Books
        WHERE Price > {minPrice}
        AND PublishedDate > DATEADD(year, -1, GETDATE())")
    .ToListAsync();`,
        explanation: 'AsNoTracking, Select projection, pagination (Skip/Take), এবং conditional filtering combine করে optimal query পাওয়া যায়।',
        keyPoints: [
          'AsNoTracking() = ~30% faster for read queries',
          'Select projection avoids loading unnecessary columns',
          'Skip/Take translates to SQL OFFSET/FETCH for server-side pagination',
          'FromSqlInterpolated safely parameterizes values (prevents SQL injection)',
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
        explanation: 'Eager loading (Include) uses JOINs to load related data with the initial query. Lazy loading transparently loads related data when you first access the navigation property.',
        difficulty: 'easy',
      },
      {
        question: 'Which method is used in EF Core to include related entities in a query?',
        options: ['.Join()', '.Include()', '.Attach()', '.Load()'],
        correctAnswer: 1,
        explanation: 'Include() is the EF Core method for eager loading. It generates a JOIN in the SQL query to load related entities.',
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
        explanation: 'AsNoTracking() tells EF Core not to track returned entities. This avoids snapshot creation, identity resolution, and fixup - can be ~30% faster for read-only queries.',
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
        explanation: 'N+1 problem: 1 query loads N parents, then accessing each parent\'s children in a loop triggers N additional queries. Fix with Include() or Select projection.',
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
        explanation: 'FromSqlInterpolated automatically parameterizes interpolated values. FromSqlRaw with string interpolation is DANGEROUS - it concatenates the value directly into SQL.',
        difficulty: 'hard',
      },
    ],
    interviewQuestions: [
      {
        question: 'How would you optimize EF Core query performance in a high-traffic application?',
        answer: `Several strategies:

1. AsNoTracking() for read-only queries - skips Change Tracker overhead (~30% faster).

2. Select projections instead of loading full entities - only fetch columns you need. This also avoids loading navigation properties you don't need.

3. Compiled Queries for hot paths - EF.CompileAsyncQuery caches the LINQ-to-SQL translation, avoiding expression tree processing on each call.

4. Split Queries (AsSplitQuery) for multiple Includes - avoids Cartesian explosion where rows multiply.

5. Proper indexing - ensure database indexes match your WHERE and ORDER BY clauses.

6. Pagination with Skip/Take - never load unbounded result sets.

7. Batch operations - use ExecuteUpdate/ExecuteDelete (.NET 7+) for bulk operations instead of loading entities one by one.

8. Connection pooling and DbContext pooling (AddDbContextPool) - reuses DbContext instances to reduce allocation overhead.`,
        followUp: [
          'What is a Compiled Query and when would you use it?',
          'How does AsSplitQuery work and what are its trade-offs?',
          'What is DbContext pooling and how does it differ from connection pooling?',
        ],
      },
      {
        question: 'Explain the difference between Find(), FirstOrDefault(), and SingleOrDefault() in EF Core.',
        answer: `Find(key) - Searches the Change Tracker cache first. If the entity is already tracked, returns it immediately without a database query. Only queries the database if not found in cache. Only works with primary key.

FirstOrDefault(predicate) - Always queries the database (generates SQL). Returns the first matching row or null. Translates to "SELECT TOP 1 ... WHERE ..."

SingleOrDefault(predicate) - Always queries the database. Expects exactly zero or one match. Throws InvalidOperationException if more than one row matches. Translates to "SELECT TOP 2 ..." (fetches 2 to verify uniqueness).

When to use: Find() for PK lookups (cache-aware). FirstOrDefault() when you want any matching row. SingleOrDefault() when you expect exactly 0 or 1 match and want to enforce it.`,
        followUp: [
          'What happens if you use Find() with AsNoTracking()?',
          'Why does SingleOrDefault fetch TOP 2 instead of TOP 1?',
          'When would FirstOrDefault return different results than SingleOrDefault?',
        ],
      },
    ],
  },
]
