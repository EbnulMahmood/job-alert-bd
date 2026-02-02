import type { LearningTopic } from '../../learningTypes'

// Cefalo Track - Week 2: .NET Core & Architecture (Days 6-10)
export const cefaloWeek2: LearningTopic[] = [
  {
    id: 'cefalo-day-6',
    day: 6,
    title: 'ASP.NET Core Web API',
    description: 'Building RESTful APIs - common Cefalo project type',
    duration: '2 hours',
    resources: [
      { type: 'article', title: 'Web API Tutorial', url: 'https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api' },
      { type: 'video', title: 'ASP.NET Core REST API Tutorial', url: 'https://www.youtube.com/watch?v=fmvcAzHpsk8' },
    ],
    detailedExplanation: `ASP.NET Core Web API হলো RESTful HTTP services তৈরির framework। Cefalo তে প্রায় সব project ই Web API based।

Request Pipeline: HTTP Request → Middleware Pipeline → Routing → Controller → Action Method → Response। Middleware গুলো sequential ভাবে execute হয় - UseAuthentication, UseAuthorization, UseCors ইত্যাদি। Order matters!

Controllers হলো API endpoint group। [ApiController] attribute automatic model validation এবং 400 Bad Request response দেয়। [Route("api/[controller]")] convention-based routing define করে।

Model Binding: ASP.NET Core automatically HTTP request data (body, query string, route) কে method parameters এ bind করে। [FromBody] = JSON body, [FromQuery] = query string, [FromRoute] = URL path parameter।

HTTP Status Codes: 200 OK (success), 201 Created (resource created, include Location header), 204 No Content (success but no body), 400 Bad Request (validation error), 404 Not Found, 409 Conflict, 500 Internal Server Error। Proper status codes ব্যবহার করলে API self-documenting হয়।`,
    keyConcepts: [
      'Middleware pipeline order matters: UseRouting → UseAuthentication → UseAuthorization → MapControllers',
      '[ApiController] enables automatic model validation (returns 400 for invalid models)',
      'Use proper HTTP methods: GET (read), POST (create), PUT (full update), PATCH (partial), DELETE',
      'Return ActionResult<T> for type-safe responses with proper status codes',
      'Pagination, filtering, and sorting should use query parameters (GET /api/books?page=1&size=10)',
    ],
    commonMistakes: [
      'Putting business logic in controllers instead of service layer - violates separation of concerns',
      'Not returning proper HTTP status codes (always returning 200 even for errors)',
      'Exposing domain entities directly in API responses instead of using DTOs',
      'Not implementing pagination - returning all records can crash with large datasets',
      'Middleware order wrong - UseAuthorization before UseAuthentication causes 401 errors',
    ],
    codeExamples: [
      {
        title: 'Complete REST API Controller with Proper Patterns',
        language: 'csharp',
        code: `[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly IBookService _bookService;
    public BooksController(IBookService bookService) => _bookService = bookService;

    // GET api/books?page=1&pageSize=10&search=clean
    [HttpGet]
    public async Task<ActionResult<PagedResult<BookDto>>> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null)
    {
        var result = await _bookService.GetBooksAsync(page, pageSize, search);
        return Ok(result);
    }

    // GET api/books/5
    [HttpGet("{id}")]
    public async Task<ActionResult<BookDto>> GetById(int id)
    {
        var book = await _bookService.GetByIdAsync(id);
        if (book is null) return NotFound();
        return Ok(book);
    }

    // POST api/books
    [HttpPost]
    public async Task<ActionResult<BookDto>> Create([FromBody] CreateBookRequest request)
    {
        var book = await _bookService.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = book.Id }, book);
    }

    // PUT api/books/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateBookRequest request)
    {
        var exists = await _bookService.UpdateAsync(id, request);
        if (!exists) return NotFound();
        return NoContent(); // 204
    }

    // DELETE api/books/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var exists = await _bookService.DeleteAsync(id);
        if (!exists) return NotFound();
        return NoContent();
    }
}`,
        explanation: 'প্রতিটি action proper HTTP method এবং status code return করে। CreatedAtAction Location header সহ 201 দেয়। DTOs ব্যবহার করে domain entities expose হচ্ছে না।',
        keyPoints: [
          'CreatedAtAction returns 201 with Location header pointing to the new resource',
          'NotFound() returns 404, NoContent() returns 204, Ok(data) returns 200',
          '[FromQuery] for search/pagination params, [FromBody] for request payload',
          'Controller only orchestrates - actual logic lives in IBookService',
        ],
      },
    ],
    practiceProblems: [
      {
        id: 'cefalo-d6-p1',
        title: 'Build a Task Management API',
        difficulty: 'medium',
        description: 'Create a REST API for a task management system with endpoints:\n- GET /api/tasks (with pagination, search, status filter)\n- GET /api/tasks/{id}\n- POST /api/tasks\n- PUT /api/tasks/{id}\n- PATCH /api/tasks/{id}/status\n- DELETE /api/tasks/{id}\n\nTask model: Id, Title, Description, Status (Todo/InProgress/Done), Priority (Low/Medium/High), DueDate, CreatedAt',
        sampleInput: 'POST /api/tasks { "title": "Learn API", "priority": "High", "dueDate": "2024-12-31" }',
        sampleOutput: '201 Created with Location: /api/tasks/1 and the created task DTO',
        hints: [
          'Use separate DTOs for Create request, Update request, and Response',
          'PATCH /status should accept just { "status": "InProgress" }',
          'Add validation: Title required, DueDate must be future',
        ],
        approaches: [
          {
            name: 'Controller + Service + Repository Pattern',
            timeComplexity: 'N/A',
            spaceComplexity: 'N/A',
            explanation: 'Thin controller delegates to service layer. Service contains business logic and validation. Repository handles data access via EF Core.',
            pseudocode: `Controller:
  [HttpGet] → service.GetTasksAsync(page, size, search, status)
  [HttpPost] → validate → service.CreateAsync(dto) → CreatedAtAction
  [HttpPut("{id}")] → service.UpdateAsync(id, dto) → NoContent/NotFound
  [HttpPatch("{id}/status")] → service.UpdateStatusAsync(id, status) → NoContent
  [HttpDelete("{id}")] → service.DeleteAsync(id) → NoContent/NotFound

Service:
  GetTasksAsync → repo.GetPagedAsync(filter) → map to DTOs
  CreateAsync → validate business rules → repo.AddAsync → map to DTO
  UpdateAsync → repo.GetByIdAsync → update properties → repo.SaveAsync

DTOs:
  CreateTaskRequest { Title(required), Description, Priority, DueDate }
  UpdateTaskRequest { Title, Description, Priority, DueDate }
  TaskResponse { Id, Title, Description, Status, Priority, DueDate, CreatedAt }`,
          },
        ],
        relatedTopics: ['REST API', 'HTTP Methods', 'DTOs', 'Validation'],
        companiesAsked: ['Cefalo', 'BJIT', 'Enosis'],
      },
    ],
    tasks: [
      'Create a CRUD API with proper HTTP status codes',
      'Implement pagination with page/pageSize query parameters',
      'Add input validation with Data Annotations and FluentValidation',
      'Test all endpoints with Postman or Swagger',
    ],
    quiz: [
      {
        question: 'What HTTP status code should POST return when a resource is created?',
        options: ['200 OK', '201 Created', '204 No Content', '202 Accepted'],
        correctAnswer: 1,
        explanation: '201 Created with a Location header pointing to the new resource. Use CreatedAtAction() in ASP.NET Core.',
        difficulty: 'easy',
      },
      {
        question: 'What does [ApiController] attribute do?',
        options: [
          'Registers the controller in DI',
          'Enables automatic model validation (400 for invalid), inference of parameter sources, and problem details responses',
          'Makes the controller singleton',
          'Adds authentication requirement',
        ],
        correctAnswer: 1,
        explanation: '[ApiController] auto-validates models (returns 400), infers [FromBody]/[FromQuery], and returns RFC 7807 ProblemDetails for errors.',
        difficulty: 'medium',
      },
      {
        question: 'What is the correct middleware order in ASP.NET Core?',
        options: [
          'UseAuthorization → UseAuthentication → UseRouting',
          'UseRouting → UseAuthentication → UseAuthorization',
          'UseAuthentication → UseRouting → UseAuthorization',
          'Order does not matter',
        ],
        correctAnswer: 1,
        explanation: 'Routing must come first to determine the endpoint, then Authentication to identify the user, then Authorization to check permissions.',
        difficulty: 'medium',
      },
      {
        question: 'Why should you use DTOs instead of exposing domain entities in API responses?',
        options: [
          'DTOs are faster to serialize',
          'To control the API shape, hide internal properties, prevent over-posting, and decouple API from database schema',
          'Domain entities cannot be serialized to JSON',
          'DTOs use less memory',
        ],
        correctAnswer: 1,
        explanation: 'DTOs prevent exposing internal fields (passwords, FK IDs), allow API versioning independent of DB schema, and prevent over-posting attacks.',
        difficulty: 'medium',
      },
      {
        question: 'What is the difference between [FromBody] and [FromQuery]?',
        options: [
          'They are interchangeable',
          '[FromBody] reads JSON request body; [FromQuery] reads URL query string parameters',
          '[FromBody] is for GET requests; [FromQuery] is for POST',
          '[FromQuery] reads headers; [FromBody] reads form data',
        ],
        correctAnswer: 1,
        explanation: '[FromBody] deserializes the JSON request body into the parameter. [FromQuery] reads key-value pairs from the URL query string (?key=value).',
        difficulty: 'easy',
      },
    ],
    interviewQuestions: [
      {
        question: 'How does the ASP.NET Core middleware pipeline work?',
        answer: `The middleware pipeline is a chain of components that process HTTP requests and responses. Each middleware can process the request, pass it to the next middleware via next(), and then process the response on the way back.

Middleware executes in the order they are registered in Program.cs. The order is critical: UseRouting() must come before UseAuthorization(), UseAuthentication() before UseAuthorization(), etc.

Each middleware can: (1) Short-circuit the pipeline (return early without calling next). (2) Modify the request before passing it. (3) Modify the response after the next middleware returns.

Common middleware: UseExceptionHandler (global error handling), UseCors (cross-origin), UseAuthentication, UseAuthorization, UseRateLimiter, MapControllers (endpoint routing).

Custom middleware: Implement IMiddleware or use the convention (RequestDelegate constructor + InvokeAsync method).`,
        followUp: [
          'How would you create custom middleware for logging request/response?',
          'What happens if middleware does not call next()?',
          'How does exception handling middleware work?',
        ],
      },
      {
        question: 'How do you handle validation in ASP.NET Core Web API?',
        answer: `Multiple layers of validation:

1. Model Validation with Data Annotations: [Required], [StringLength], [Range], [EmailAddress] on DTO properties. [ApiController] automatically returns 400 for invalid models.

2. FluentValidation: More powerful, testable validation rules in separate validator classes. Integrates with ASP.NET Core pipeline via AddFluentValidation().

3. Business Rule Validation: In the service layer - check for duplicates, verify relationships, enforce business rules. Return appropriate errors.

4. Database Constraints: Unique indexes, foreign keys, check constraints as the last line of defense.

Best practice: Validate at API boundary (DTOs) with DataAnnotations/FluentValidation, enforce business rules in service layer, rely on DB constraints as safety net. Never trust client input.`,
        followUp: [
          'How does FluentValidation compare to Data Annotations?',
          'How would you return validation errors in a consistent format?',
          'What is the ProblemDetails RFC 7807 format?',
        ],
      },
    ],
  },

  {
    id: 'cefalo-day-7',
    day: 7,
    title: 'Dependency Injection',
    description: 'DI patterns in ASP.NET Core',
    duration: '1.5 hours',
    resources: [
      { type: 'article', title: 'DI in ASP.NET Core', url: 'https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection' },
    ],
    detailedExplanation: `Dependency Injection (DI) হলো Inversion of Control (IoC) principle এর implementation। class নিজে dependencies create করে না, বাইরে থেকে inject করা হয়।

ASP.NET Core এ built-in DI container আছে। Program.cs এ services register করেন: builder.Services.AddScoped<IBookService, BookService>(). তারপর constructor parameters এ inject হয়।

তিনটি lifetime: Singleton (একটি instance পুরো app lifetime), Scoped (একটি instance per HTTP request), Transient (প্রতিবার request এ নতুন instance)।

Singleton ব্যবহার করুন stateless services বা expensive-to-create objects এর জন্য (HttpClient factory, configuration)। Scoped ব্যবহার করুন DbContext, per-request state এর জন্য। Transient ব্যবহার করুন lightweight, stateless services এর জন্য।

Common mistake: Singleton service এ Scoped service inject করা (Captive Dependency)। Singleton সারা lifetime বেঁচে থাকে, কিন্তু Scoped service request শেষে dispose হওয়া উচিত। এতে memory leak এবং stale data হয়। ASP.NET Core এ ValidateScopes option enable করলে এটা detect হয়।`,
    keyConcepts: [
      'Singleton = one instance for app lifetime; Scoped = one per request; Transient = new every time',
      'Constructor injection is the primary pattern - dependencies declared as constructor parameters',
      'Never inject Scoped service into Singleton (Captive Dependency) - causes memory leaks',
      'Register interface → implementation: AddScoped<IService, ServiceImpl>()',
      'IServiceProvider can resolve services manually but prefer constructor injection (Service Locator is anti-pattern)',
    ],
    commonMistakes: [
      'Injecting Scoped (DbContext) into Singleton service - stale data and disposed context errors',
      'Using Service Locator pattern (IServiceProvider.GetService) instead of constructor injection',
      'Registering DbContext as Singleton - not thread-safe, causes concurrency errors',
      'Not understanding that Transient services are created every time - avoid for expensive objects',
      'Circular dependency: A depends on B, B depends on A - restructure using Lazy<T> or redesign',
    ],
    codeExamples: [
      {
        title: 'Service Registration and Lifetime Comparison',
        language: 'csharp',
        code: `// Program.cs - Service Registration
builder.Services.AddSingleton<ICacheService, RedisCacheService>();  // One for entire app
builder.Services.AddScoped<IBookService, BookService>();             // One per HTTP request
builder.Services.AddScoped<IBookRepository, BookRepository>();       // One per HTTP request
builder.Services.AddTransient<IEmailSender, SmtpEmailSender>();      // New every time
builder.Services.AddDbContext<AppDbContext>(options =>                // Scoped by default
    options.UseSqlServer(connectionString));

// Constructor Injection
public class BookService : IBookService
{
    private readonly IBookRepository _repo;
    private readonly ICacheService _cache;
    private readonly ILogger<BookService> _logger;

    // All dependencies injected by DI container
    public BookService(
        IBookRepository repo,
        ICacheService cache,
        ILogger<BookService> logger)
    {
        _repo = repo;
        _cache = cache;
        _logger = logger;
    }

    public async Task<BookDto?> GetByIdAsync(int id)
    {
        // Try cache first (Singleton - shared across requests)
        var cached = await _cache.GetAsync<BookDto>($"book:{id}");
        if (cached is not null) return cached;

        // Query DB (Scoped - per request DbContext via repository)
        var book = await _repo.GetByIdAsync(id);
        if (book is null) return null;

        var dto = MapToDto(book);
        await _cache.SetAsync($"book:{id}", dto, TimeSpan.FromMinutes(10));
        return dto;
    }
}`,
        explanation: 'ICacheService Singleton কারণ Redis connection shared হতে পারে। IBookService এবং Repository Scoped কারণ DbContext Scoped। IEmailSender Transient কারণ lightweight এবং stateless।',
        keyPoints: [
          'Dependencies flow from outer (Singleton) to inner (Scoped/Transient)',
          'Never depend on shorter-lived services from longer-lived ones',
          'Constructor injection makes dependencies explicit and testable',
          'ILogger<T> is automatically available in DI - just add to constructor',
        ],
      },
    ],
    practiceProblems: [
      {
        id: 'cefalo-d7-p1',
        title: 'Identify DI Lifetime Issues',
        difficulty: 'medium',
        description: 'Identify the problem in this registration and fix it:\n\nservices.AddSingleton<IOrderService, OrderService>();\nservices.AddScoped<AppDbContext>();\n\nOrderService constructor: public OrderService(AppDbContext db)\n\nWhat happens at runtime? How do you fix it?',
        sampleInput: 'The DI registration above',
        sampleOutput: 'Explanation of the captive dependency problem and 2 possible fixes',
        hints: [
          'Singleton lives forever, Scoped lives per-request',
          'The Singleton OrderService captures the first request\'s DbContext forever',
          'Fix 1: Make OrderService Scoped. Fix 2: Inject IServiceScopeFactory',
        ],
        approaches: [
          {
            name: 'Fix the Lifetime Mismatch',
            timeComplexity: 'N/A',
            spaceComplexity: 'N/A',
            explanation: 'A Singleton captures the Scoped DbContext from the first request. That DbContext gets disposed after the first request, but the Singleton still holds it → ObjectDisposedException.',
            pseudocode: `Problem:
  Singleton OrderService holds Scoped DbContext
  After first request, DbContext is disposed
  Second request → OrderService uses disposed DbContext → CRASH

Fix 1 (Preferred): Make OrderService Scoped
  services.AddScoped<IOrderService, OrderService>();

Fix 2 (If Singleton needed): Use IServiceScopeFactory
  public class OrderService : IOrderService {
    private readonly IServiceScopeFactory _scopeFactory;

    public async Task ProcessOrder(Order order) {
      using var scope = _scopeFactory.CreateScope();
      var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
      // Use db within this scope
    }
  }`,
          },
        ],
        relatedTopics: ['DI Lifetimes', 'Captive Dependency', 'IServiceScopeFactory'],
        companiesAsked: ['Cefalo', 'Therap', 'Kaz Software'],
      },
    ],
    tasks: [
      'Set up DI in a new ASP.NET Core project with Singleton, Scoped, and Transient services',
      'Create an IBookService interface and BookService implementation with constructor injection',
      'Test the captive dependency scenario from Practice Problem and fix it',
      'Enable ValidateScopes in development to catch lifetime issues',
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
        explanation: 'Scoped creates one instance per HTTP request (per DI scope). All services within the same request share the same Scoped instance.',
        difficulty: 'easy',
      },
      {
        question: 'Which DI lifetime should be used for DbContext?',
        options: ['Singleton', 'Transient', 'Scoped', 'None - use new directly'],
        correctAnswer: 2,
        explanation: 'DbContext should be Scoped (one per HTTP request). Singleton is not thread-safe. Transient creates unnecessary instances.',
        difficulty: 'easy',
      },
      {
        question: 'What is a Captive Dependency?',
        options: [
          'A dependency that cannot be resolved',
          'A shorter-lived service captured by a longer-lived service, extending its lifetime beyond intended scope',
          'A circular dependency',
          'A dependency on an external service',
        ],
        correctAnswer: 1,
        explanation: 'Captive dependency: Singleton holds a Scoped service, keeping it alive beyond the request scope → stale data, disposed context errors.',
        difficulty: 'hard',
      },
      {
        question: 'Why is Service Locator considered an anti-pattern?',
        options: [
          'It is slower than constructor injection',
          'It hides dependencies, makes testing harder, and can cause runtime errors instead of compile-time errors',
          'It does not work with ASP.NET Core',
          'It uses more memory',
        ],
        correctAnswer: 1,
        explanation: 'Service Locator (GetService<T>) hides what a class depends on. Constructor injection makes dependencies explicit, enabling compile-time checking and easier mocking in tests.',
        difficulty: 'medium',
      },
      {
        question: 'What happens with this registration?',
        options: [
          'Works fine',
          'Singleton captures Scoped DbContext → ObjectDisposedException after first request',
          'Compile error',
          'DbContext becomes Singleton automatically',
        ],
        correctAnswer: 1,
        codeSnippet: `services.AddSingleton<IUserService, UserService>();
services.AddDbContext<AppDb>(); // Scoped by default
// UserService has constructor: UserService(AppDb db)`,
        explanation: 'Singleton UserService captures the first request\'s Scoped AppDb. After that request ends, AppDb is disposed but UserService still holds it → ObjectDisposedException on next use.',
        difficulty: 'hard',
      },
    ],
    interviewQuestions: [
      {
        question: 'Explain Dependency Injection and its benefits. Why is it important?',
        answer: `Dependency Injection is a design pattern where a class receives its dependencies from external sources rather than creating them internally. In ASP.NET Core, the built-in DI container manages object creation and lifetime.

Benefits:
1. Loose Coupling: Classes depend on interfaces, not concrete implementations. You can swap implementations without changing consuming code.
2. Testability: Dependencies can be mocked in unit tests. Without DI, testing a service that directly creates a DbContext is very difficult.
3. Single Responsibility: Classes don't need to know how to create their dependencies.
4. Lifetime Management: The container manages when objects are created and disposed.
5. Configuration Centralization: All service registrations are in one place (Program.cs).

Without DI, you'd need to manually create and pass dependencies through the entire object graph, leading to tightly coupled, hard-to-test code.`,
        followUp: [
          'What are the three DI lifetimes in ASP.NET Core?',
          'How does the DI container resolve dependencies with multiple constructors?',
          'What alternatives exist to the built-in DI container (Autofac, Ninject)?',
        ],
      },
    ],
  },

  {
    id: 'cefalo-day-8',
    day: 8,
    title: 'SOLID Principles',
    description: 'Clean code principles emphasized at Cefalo',
    duration: '1.5 hours',
    resources: [
      { type: 'article', title: 'SOLID Principles', url: 'https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design' },
    ],
    detailedExplanation: `SOLID হলো 5টি OOP design principle যা maintainable, extensible, testable code লিখতে সাহায্য করে। Cefalo clean code heavily emphasize করে।

S - Single Responsibility: একটি class এর একটিই reason to change থাকা উচিত। UserService শুধু user logic handle করবে, email sending আলাদা IEmailService এ থাকবে।

O - Open/Closed: Software entities extension এর জন্য open কিন্তু modification এর জন্য closed হওয়া উচিত। নতুন behavior যোগ করতে existing code modify না করে inheritance/interface দিয়ে extend করুন।

L - Liskov Substitution: Subclass parent class এর জায়গায় ব্যবহারযোগ্য হতে হবে behavior না ভেঙে। Square extends Rectangle করলে setWidth() এ height ও change হয় - এটা LSP violation।

I - Interface Segregation: Client যা use করে না তার উপর depend করা উচিত না। একটি IWorker interface এ Work() এবং Eat() থাকলে Robot class এর Eat() implement করতে হবে - violation! আলাদা IWorkable, IFeedable interface করুন।

D - Dependency Inversion: High-level modules low-level modules এর উপর depend করবে না। দুটোই abstractions (interfaces) এর উপর depend করবে। Service directly Repository class ব্যবহার না করে IRepository interface ব্যবহার করবে।`,
    keyConcepts: [
      'SRP: One class = one responsibility = one reason to change',
      'OCP: Add new behavior via new classes/interfaces, not modifying existing code (Strategy pattern)',
      'LSP: Subtypes must be substitutable for their base types without breaking behavior',
      'ISP: Many specific interfaces are better than one general-purpose interface',
      'DIP: Depend on abstractions (interfaces), not concrete implementations',
    ],
    commonMistakes: [
      'Thinking SRP means "one method per class" - it means one REASON TO CHANGE',
      'Over-engineering with too many tiny interfaces (ISP taken too far)',
      'Violating LSP with exceptions in overridden methods (throw NotImplementedException)',
      'Confusing DIP with DI - DIP is the principle, DI is a technique to achieve it',
      'Not applying SOLID pragmatically - these are guidelines, not absolute rules',
    ],
    codeExamples: [
      {
        title: 'SOLID Violations and Fixes',
        language: 'csharp',
        code: `// BAD: SRP Violation - UserService does too many things
public class UserService
{
    public void RegisterUser(User user) { /* save to DB */ }
    public void SendWelcomeEmail(User user) { /* send email */ }
    public string GenerateReport(User user) { /* generate PDF */ }
}

// GOOD: Each class has one responsibility
public class UserService
{
    private readonly IUserRepository _repo;
    private readonly IEmailService _email;
    public UserService(IUserRepository repo, IEmailService email)
    {
        _repo = repo; _email = email;
    }
    public async Task RegisterAsync(User user)
    {
        await _repo.AddAsync(user);
        await _email.SendWelcomeAsync(user.Email);
    }
}

// BAD: OCP Violation - must modify this class for each new discount type
public decimal CalculateDiscount(string type, decimal price)
{
    if (type == "Premium") return price * 0.2m;
    if (type == "Student") return price * 0.3m;
    // Must add new if-else for every new type!
    return 0;
}

// GOOD: OCP - new discount = new class, no modification needed
public interface IDiscountStrategy { decimal Calculate(decimal price); }
public class PremiumDiscount : IDiscountStrategy
{
    public decimal Calculate(decimal price) => price * 0.2m;
}
public class StudentDiscount : IDiscountStrategy
{
    public decimal Calculate(decimal price) => price * 0.3m;
}
// Add NewDiscount without modifying existing code!`,
        explanation: 'SRP: UserService শুধু user registration handle করে, email পাঠানোর responsibility IEmailService এ। OCP: Strategy pattern দিয়ে নতুন discount type যোগ করতে existing code modify করতে হয় না।',
        keyPoints: [
          'SRP fix: Extract responsibilities into separate services with clear interfaces',
          'OCP fix: Use Strategy pattern or polymorphism for varying behavior',
          'Both fixes make code testable - each service can be mocked independently',
        ],
      },
    ],
    practiceProblems: [
      {
        id: 'cefalo-d8-p1',
        title: 'Identify SOLID Violations',
        difficulty: 'medium',
        description: 'Given the following code, identify which SOLID principles are violated and refactor:\n\npublic class OrderProcessor {\n  public void ProcessOrder(Order order) {\n    // Validate\n    if (order.Items.Count == 0) throw new Exception("Empty");\n    // Calculate total\n    decimal total = order.Items.Sum(i => i.Price);\n    // Apply tax\n    total *= 1.15m;\n    // Save to DB\n    using var conn = new SqlConnection("...");\n    conn.Execute("INSERT INTO Orders ...", order);\n    // Send email\n    var smtp = new SmtpClient("smtp.gmail.com");\n    smtp.Send(new MailMessage(...));\n    // Print receipt\n    Console.WriteLine($"Order {order.Id}: {total}");\n  }\n}',
        sampleInput: 'The OrderProcessor class above',
        sampleOutput: 'Refactored code with separate services for each responsibility',
        hints: [
          'SRP violation: OrderProcessor validates, calculates, saves, emails, and prints',
          'DIP violation: Directly depends on SqlConnection and SmtpClient (concrete classes)',
          'OCP violation: Tax calculation is hardcoded - can\'t change without modifying',
        ],
        approaches: [
          {
            name: 'Extract Services with Interfaces',
            timeComplexity: 'N/A',
            spaceComplexity: 'N/A',
            explanation: 'Extract each responsibility into a separate service behind an interface. OrderProcessor orchestrates via constructor-injected dependencies.',
            pseudocode: `Interfaces:
  IOrderValidator: Validate(Order)
  ITaxCalculator: CalculateTax(decimal) → decimal
  IOrderRepository: SaveAsync(Order)
  INotificationService: SendOrderConfirmation(Order)
  IReceiptPrinter: PrintReceipt(Order, decimal)

class OrderProcessor:
  constructor(IOrderValidator, ITaxCalculator, IOrderRepository,
              INotificationService, IReceiptPrinter)

  ProcessOrder(order):
    validator.Validate(order)
    total = taxCalc.CalculateTax(order.Items.Sum(Price))
    await repo.SaveAsync(order)
    await notification.SendOrderConfirmation(order)
    printer.PrintReceipt(order, total)

Benefits: Each service testable independently, new tax rules = new ITaxCalculator impl`,
          },
        ],
        relatedTopics: ['SOLID', 'SRP', 'DIP', 'OCP', 'Refactoring'],
        companiesAsked: ['Cefalo', 'SELISE', 'Brain Station 23'],
      },
    ],
    tasks: [
      'Review each SOLID principle with C# code examples',
      'Refactor the OrderProcessor from Practice Problem applying all 5 SOLID principles',
      'Identify SOLID violations in your own past project code',
    ],
    quiz: [
      {
        question: 'What does the Single Responsibility Principle (SRP) state?',
        options: ['A class should have only one method', 'A class should have only one reason to change', 'A class should only inherit from one base class', 'A class should only implement one interface'],
        correctAnswer: 1,
        explanation: 'SRP says a class should have one, and only one, reason to change. This means one responsibility or one axis of change.',
        difficulty: 'easy',
      },
      {
        question: 'Which SOLID principle does the Strategy pattern primarily support?',
        options: ['SRP', 'Open/Closed Principle', 'Liskov Substitution', 'Interface Segregation'],
        correctAnswer: 1,
        explanation: 'Strategy pattern allows adding new behaviors (strategies) without modifying existing code - the essence of Open/Closed Principle.',
        difficulty: 'medium',
      },
      {
        question: 'Which principle is violated when a subclass throws NotImplementedException?',
        options: ['SRP', 'OCP', 'Liskov Substitution Principle', 'DIP'],
        correctAnswer: 2,
        explanation: 'LSP says subtypes must be substitutable for their base type. Throwing NotImplementedException means the subclass cannot fulfill the base class contract.',
        difficulty: 'medium',
      },
      {
        question: 'What is Dependency Inversion Principle (DIP)?',
        options: [
          'Always use Dependency Injection',
          'High-level modules should depend on abstractions, not low-level module details',
          'Dependencies should be inverted in the call stack',
          'Always depend on concrete implementations for performance',
        ],
        correctAnswer: 1,
        explanation: 'DIP states both high-level and low-level modules should depend on abstractions (interfaces). This decouples them and allows independent changes.',
        difficulty: 'medium',
      },
    ],
    interviewQuestions: [
      {
        question: 'Explain SOLID principles with real-world C# examples.',
        answer: `S - Single Responsibility: A UserService should only handle user CRUD, not send emails or generate reports. Extract IEmailService and IReportService.

O - Open/Closed: Instead of switch/if-else for payment methods (Credit, PayPal, Crypto), create IPaymentProcessor interface with implementations. Adding a new payment method = adding a new class, not modifying existing code.

L - Liskov Substitution: If you have IReadOnlyCollection<T> and a mutable List<T>, code expecting read-only behavior won't break. But if Square extends Rectangle and overrides SetWidth to also set Height, client code expecting independent width/height breaks.

I - Interface Segregation: Instead of one IAnimal with Fly(), Swim(), Walk(), create IFlyable, ISwimmable, IWalkable. A Dog only implements IWalkable, ISwimmable.

D - Dependency Inversion: Controller depends on IOrderService (interface), not OrderService (class). This allows unit testing with mock IOrderService and swapping implementations.`,
        followUp: [
          'Which SOLID principle do you find hardest to apply in practice?',
          'How do SOLID principles relate to Design Patterns?',
          'Can you over-apply SOLID? Give an example.',
        ],
      },
    ],
  },

  {
    id: 'cefalo-day-9',
    day: 9,
    title: 'Repository & Unit of Work Pattern',
    description: 'Data access patterns commonly used at Cefalo',
    duration: '1.5 hours',
    resources: [
      { type: 'article', title: 'Repository Pattern', url: 'https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design' },
    ],
    detailedExplanation: `Repository Pattern data access logic কে abstraction layer এর পেছনে encapsulate করে। Service layer সরাসরি DbContext ব্যবহার না করে IRepository interface ব্যবহার করে। এতে data source swap করা সহজ এবং unit testing এ mock করা যায়।

Generic Repository (IRepository<T>) common CRUD operations abstract করে: GetByIdAsync, GetAllAsync, AddAsync, UpdateAsync, DeleteAsync। Specific repositories (IBookRepository) domain-specific queries add করে: GetBooksByAuthorAsync, GetTopRatedBooksAsync।

Unit of Work pattern multiple repositories এর changes একটি transaction এ commit করে। EF Core এর DbContext already Unit of Work হিসেবে কাজ করে - SaveChanges() সব changes একটি transaction এ save করে।

Debate: কিছু developer মনে করে EF Core এর সাথে Repository Pattern redundant কারণ DbContext নিজেই repository + unit of work। Valid point, কিন্তু Repository Pattern এর benefit হলো: (1) Service layer DbContext এর উপর সরাসরি depend করে না (testable), (2) Complex queries encapsulate হয়, (3) Future এ ORM switch করা সহজ।

Cefalo তে generic repository + specific repository combination ব্যবহার হয়। Generic repo CRUD দেয়, specific repo domain queries দেয়।`,
    keyConcepts: [
      'Repository abstracts data access - services use IRepository, not DbContext directly',
      'Generic Repository provides CRUD; Specific Repository adds domain-specific queries',
      'Unit of Work coordinates multiple repository changes in a single transaction',
      'EF Core DbContext is already a Unit of Work (SaveChanges = transaction commit)',
      'Repository pattern enables unit testing by allowing mock implementations',
    ],
    commonMistakes: [
      'Making the generic repository too generic - leaking IQueryable to service layer defeats the purpose',
      'Not creating specific repositories for complex queries - everything goes through generic CRUD',
      'Calling SaveChanges in every repository method - should be called once via Unit of Work',
      'Over-abstracting when EF Core is sufficient - evaluate if the project really needs Repository pattern',
    ],
    codeExamples: [
      {
        title: 'Generic Repository with Unit of Work',
        language: 'csharp',
        code: `// Generic Repository Interface
public interface IRepository<T> where T : class
{
    Task<T?> GetByIdAsync(int id);
    Task<IReadOnlyList<T>> GetAllAsync();
    Task<T> AddAsync(T entity);
    void Update(T entity);
    void Delete(T entity);
}

// Specific Repository
public interface IBookRepository : IRepository<Book>
{
    Task<IReadOnlyList<Book>> GetByAuthorAsync(int authorId);
    Task<IReadOnlyList<Book>> SearchAsync(string term, int page, int size);
}

// Unit of Work
public interface IUnitOfWork : IDisposable
{
    IBookRepository Books { get; }
    IAuthorRepository Authors { get; }
    Task<int> SaveChangesAsync(CancellationToken ct = default);
}

// Implementation
public class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _db;
    public IBookRepository Books { get; }
    public IAuthorRepository Authors { get; }

    public UnitOfWork(AppDbContext db)
    {
        _db = db;
        Books = new BookRepository(db);
        Authors = new AuthorRepository(db);
    }

    public Task<int> SaveChangesAsync(CancellationToken ct) =>
        _db.SaveChangesAsync(ct);

    public void Dispose() => _db.Dispose();
}

// Usage in Service
public class BookService : IBookService
{
    private readonly IUnitOfWork _uow;
    public BookService(IUnitOfWork uow) => _uow = uow;

    public async Task TransferBookAsync(int bookId, int newAuthorId)
    {
        var book = await _uow.Books.GetByIdAsync(bookId);
        var author = await _uow.Authors.GetByIdAsync(newAuthorId);
        if (book is null || author is null) throw new NotFoundException();

        book.AuthorId = newAuthorId;
        _uow.Books.Update(book);
        await _uow.SaveChangesAsync(); // Single transaction
    }
}`,
        explanation: 'IUnitOfWork multiple repositories coordinate করে। SaveChangesAsync একবার call করলে সব changes একটি transaction এ commit হয়। Service layer শুধু IUnitOfWork জানে, DbContext জানে না।',
        keyPoints: [
          'Generic IRepository<T> provides CRUD, specific IBookRepository adds domain queries',
          'UnitOfWork holds all repositories and coordinates SaveChanges',
          'Service depends on IUnitOfWork - easily mockable for unit tests',
          'SaveChanges called once at the end ensures all changes are atomic',
        ],
      },
    ],
    practiceProblems: [
      {
        id: 'cefalo-d9-p1',
        title: 'Implement Repository Pattern for Blog System',
        difficulty: 'medium',
        description: 'For the Blog system (Users, Posts, Comments, Tags), implement:\n1. IRepository<T> generic interface with CRUD\n2. IPostRepository with: GetByAuthorAsync, SearchAsync, GetTrendingAsync(int days, int count)\n3. IUnitOfWork with all repositories\n4. Use EF Core as the underlying implementation',
        sampleInput: 'Blog domain entities from Day 4',
        sampleOutput: 'Complete repository + UoW implementation with EF Core',
        hints: [
          'Generic Repository implementation uses DbContext.Set<T>() to get DbSet',
          'GetTrendingAsync should count comments in the last N days and order by count',
          'Register IUnitOfWork as Scoped in DI',
        ],
        approaches: [
          {
            name: 'EF Core-backed Repository',
            timeComplexity: 'O(1) for CRUD, O(n) for queries',
            spaceComplexity: 'N/A',
            explanation: 'Generic Repository wraps DbSet<T>. Specific repositories inherit from it and add domain-specific queries using LINQ.',
            pseudocode: `class Repository<T> : IRepository<T>
  protected DbContext _db
  protected DbSet<T> _dbSet = _db.Set<T>()

  GetByIdAsync(id) → _dbSet.FindAsync(id)
  GetAllAsync() → _dbSet.AsNoTracking().ToListAsync()
  AddAsync(entity) → _dbSet.AddAsync(entity); return entity
  Update(entity) → _dbSet.Update(entity)
  Delete(entity) → _dbSet.Remove(entity)

class PostRepository : Repository<Post>, IPostRepository
  GetTrendingAsync(days, count) →
    _dbSet.Where(p => p.PublishedAt > DateTime.Now.AddDays(-days))
      .OrderByDescending(p => p.Comments.Count)
      .Take(count).ToListAsync()`,
          },
        ],
        relatedTopics: ['Repository Pattern', 'Unit of Work', 'EF Core', 'Clean Architecture'],
        companiesAsked: ['Cefalo', 'Therap', 'Brain Station 23'],
      },
    ],
    tasks: [
      'Implement generic repository with EF Core',
      'Add Unit of Work pattern coordinating multiple repositories',
      'Write unit tests for a service using mocked IUnitOfWork',
    ],
    quiz: [
      {
        question: 'What is the main benefit of Repository pattern?',
        options: [
          'Better database performance',
          'Abstracts data access, enabling testability and decoupling from specific ORM',
          'Automatic caching',
          'Connection pooling',
        ],
        correctAnswer: 1,
        explanation: 'Repository pattern abstracts data access behind interfaces. Services depend on IRepository, not DbContext, enabling mock-based unit testing.',
        difficulty: 'easy',
      },
      {
        question: 'What is the role of Unit of Work?',
        options: [
          'To create database connections',
          'To coordinate changes across multiple repositories in a single transaction',
          'To cache repository results',
          'To validate entity state',
        ],
        correctAnswer: 1,
        explanation: 'Unit of Work groups multiple repository operations into a single transaction. SaveChanges commits all changes atomically.',
        difficulty: 'medium',
      },
      {
        question: 'Should IRepository<T> expose IQueryable<T>?',
        options: [
          'Yes, for maximum flexibility',
          'No, it leaks data access concerns to the service layer, defeating the abstraction purpose',
          'Only for read operations',
          'Only with AsNoTracking',
        ],
        correctAnswer: 1,
        explanation: 'Exposing IQueryable leaks LINQ-to-SQL details to the service layer. Repositories should expose specific methods that return materialized results.',
        difficulty: 'hard',
      },
    ],
    interviewQuestions: [
      {
        question: 'Is Repository pattern necessary with EF Core? What are the pros and cons?',
        answer: `This is a debated topic. Arguments for both sides:

FOR Repository Pattern:
1. Testability: Services can be unit tested with mocked IRepository without an actual database.
2. Encapsulation: Complex queries are encapsulated in repository methods, not scattered across services.
3. ORM Independence: Though rarely done, you could swap EF Core for Dapper or another ORM.
4. Single Responsibility: Data access logic separated from business logic.

AGAINST:
1. Redundancy: EF Core's DbContext already implements Repository (DbSet) and Unit of Work (SaveChanges).
2. Leaky Abstractions: It's hard to abstract away EF Core's features (Include, AsNoTracking) properly.
3. More Code: Additional interfaces and classes for little benefit in simple CRUD apps.
4. IQueryable Dilemma: Either expose it (leaky abstraction) or don't (limited flexibility).

My recommendation: Use Repository for complex domains with multiple data sources or heavy testing requirements. Skip it for simple CRUD apps where EF Core is sufficient.`,
        followUp: [
          'How do you handle complex queries that need multiple joins in a repository?',
          'Would you use the Specification pattern with Repository?',
          'How does CQRS relate to the Repository pattern?',
        ],
      },
    ],
  },

  {
    id: 'cefalo-day-10',
    day: 10,
    title: 'Clean Architecture',
    description: 'Project structure patterns emphasized at Cefalo',
    duration: '2 hours',
    resources: [
      { type: 'video', title: 'Clean Architecture', url: 'https://www.youtube.com/watch?v=dK4Yb6-LxAk' },
      { type: 'article', title: 'Clean Architecture in .NET', url: 'https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures' },
    ],
    detailedExplanation: `Clean Architecture (Robert C. Martin) হলো একটি architectural pattern যেখানে business logic center এ থাকে এবং external concerns (DB, UI, frameworks) periphery তে থাকে। Dependency Rule: inner layers কখনো outer layers কে জানে না।

Layer structure (inside → outside):
1. Domain/Entities: Business objects, value objects, enums। কোন dependency নেই।
2. Application/Use Cases: Business logic, interfaces (IRepository, IEmailService), DTOs। শুধু Domain এর উপর depend করে।
3. Infrastructure: Database implementations, external API clients, file storage। Application interfaces implement করে।
4. Presentation/API: Controllers, middleware, startup config। Infrastructure ও Application ব্যবহার করে।

Dependency Rule: Dependencies শুধু inward point করে। Infrastructure, Domain কে জানে কিন্তু Domain, Infrastructure কে জানে না। এটা DIP (Dependency Inversion) দিয়ে achieve হয় - Application layer interfaces define করে, Infrastructure layer implement করে।

Project structure:
- MyApp.Domain (class library) → entities, value objects, domain events
- MyApp.Application (class library, ref: Domain) → services, interfaces, DTOs, validation
- MyApp.Infrastructure (class library, ref: Application) → EF Core, repositories, email, external APIs
- MyApp.Api (web project, ref: all) → controllers, middleware, DI registration`,
    keyConcepts: [
      'Dependency Rule: Dependencies point inward. Domain knows nothing about Infrastructure.',
      'Domain layer has zero dependencies - pure business logic, entities, value objects',
      'Application layer defines interfaces (ports); Infrastructure layer implements them (adapters)',
      'DI registration happens in the outermost layer (API/Presentation)',
      'Clean Architecture makes business logic testable independent of database, UI, or frameworks',
    ],
    commonMistakes: [
      'Domain layer referencing Infrastructure (EF Core, HttpClient) - violates dependency rule',
      'Putting business logic in controllers instead of Application/Service layer',
      'Over-engineering small projects with full Clean Architecture when N-tier would suffice',
      'Not clearly defining the boundary between Application and Domain layers',
    ],
    codeExamples: [
      {
        title: 'Clean Architecture Project Structure',
        language: 'csharp',
        code: `// 1. Domain Layer (no dependencies)
// MyApp.Domain/Entities/Book.cs
public class Book
{
    public int Id { get; private set; }
    public string Title { get; private set; }
    public decimal Price { get; private set; }

    public void UpdatePrice(decimal newPrice)
    {
        if (newPrice <= 0) throw new DomainException("Price must be positive");
        Price = newPrice;
    }
}

// 2. Application Layer (depends on Domain only)
// MyApp.Application/Interfaces/IBookRepository.cs
public interface IBookRepository
{
    Task<Book?> GetByIdAsync(int id);
    Task<IReadOnlyList<Book>> SearchAsync(string term);
    Task AddAsync(Book book);
}

// MyApp.Application/Services/BookService.cs
public class BookService
{
    private readonly IBookRepository _repo;
    private readonly IUnitOfWork _uow;
    public BookService(IBookRepository repo, IUnitOfWork uow)
    { _repo = repo; _uow = uow; }

    public async Task UpdatePriceAsync(int id, decimal newPrice)
    {
        var book = await _repo.GetByIdAsync(id)
            ?? throw new NotFoundException("Book", id);
        book.UpdatePrice(newPrice); // Domain logic!
        await _uow.SaveChangesAsync();
    }
}

// 3. Infrastructure Layer (implements Application interfaces)
// MyApp.Infrastructure/Repositories/BookRepository.cs
public class BookRepository : IBookRepository
{
    private readonly AppDbContext _db;
    public BookRepository(AppDbContext db) => _db = db;
    public Task<Book?> GetByIdAsync(int id) => _db.Books.FindAsync(id).AsTask();
    public async Task<IReadOnlyList<Book>> SearchAsync(string term) =>
        await _db.Books.Where(b => b.Title.Contains(term)).ToListAsync();
    public async Task AddAsync(Book book) => await _db.Books.AddAsync(book);
}

// 4. API Layer (DI registration)
// MyApp.Api/Program.cs
builder.Services.AddScoped<IBookRepository, BookRepository>();
builder.Services.AddScoped<BookService>();`,
        explanation: 'Domain → Application → Infrastructure → API। প্রতিটি layer শুধু তার inner layer কে reference করে। BookService (Application) IBookRepository interface জানে, BookRepository (Infrastructure) implement করে।',
        keyPoints: [
          'Domain has ZERO NuGet references - pure C# only',
          'Application defines interfaces, Infrastructure implements them',
          'DI wiring happens in the API layer (outermost)',
          'Domain entities have behavior (UpdatePrice with validation), not just properties',
        ],
      },
    ],
    practiceProblems: [
      {
        id: 'cefalo-d10-p1',
        title: 'Create Clean Architecture Solution',
        difficulty: 'hard',
        description: 'Create a 4-project Clean Architecture solution for a Task Management system:\n1. TaskApp.Domain - Task entity with status transitions (Todo→InProgress→Done)\n2. TaskApp.Application - ITaskRepository, TaskService with business rules\n3. TaskApp.Infrastructure - EF Core implementation\n4. TaskApp.Api - Controllers and DI setup\n\nEnsure proper dependency direction and no SOLID violations.',
        sampleInput: 'Domain rules: Tasks can only go Todo→InProgress→Done (no backward transitions)',
        sampleOutput: '4-project solution with proper layering, dependency direction, and domain logic',
        hints: [
          'Domain entity should enforce status transition rules (state machine)',
          'Application layer defines interfaces and orchestrates',
          'API layer only registers DI and maps HTTP requests to service calls',
        ],
        approaches: [
          {
            name: 'Layered Solution with DIP',
            timeComplexity: 'N/A',
            spaceComplexity: 'N/A',
            explanation: 'Create 4 class library projects. Domain has no references. Application references Domain. Infrastructure references Application. Api references all.',
            pseudocode: `Domain/Entities/TaskItem.cs:
  enum TaskStatus { Todo, InProgress, Done }
  class TaskItem:
    Id, Title, Description, Status, CreatedAt
    MoveToInProgress(): if Status != Todo → throw
    MarkDone(): if Status != InProgress → throw

Application/Interfaces/ITaskRepository.cs:
  GetByIdAsync, GetAllAsync(filter), AddAsync

Application/Services/TaskService.cs:
  CreateTask(dto) → new TaskItem → repo.Add → uow.Save
  StartTask(id) → repo.GetById → task.MoveToInProgress → uow.Save
  CompleteTask(id) → repo.GetById → task.MarkDone → uow.Save

Infrastructure/Repositories/TaskRepository.cs:
  implements ITaskRepository using AppDbContext

Api/Controllers/TasksController.cs:
  [HttpPost] → service.CreateTask
  [HttpPatch("{id}/start")] → service.StartTask
  [HttpPatch("{id}/complete")] → service.CompleteTask`,
          },
        ],
        relatedTopics: ['Clean Architecture', 'DDD', 'SOLID', 'Layered Architecture'],
        companiesAsked: ['Cefalo', 'SELISE', 'Kaz Software'],
      },
    ],
    tasks: [
      'Understand Clean Architecture layer separation and dependency rule',
      'Create the 4-project solution from Practice Problem',
      'Implement the Task domain entity with status transition rules',
    ],
    quiz: [
      {
        question: 'In Clean Architecture, which direction do dependencies point?',
        options: ['Outward (Domain → Infrastructure)', 'Inward (Infrastructure → Domain)', 'Both directions', 'Horizontal only'],
        correctAnswer: 1,
        explanation: 'Dependencies always point inward. Outer layers (Infrastructure, UI) depend on inner layers (Application, Domain). Domain has zero outward dependencies.',
        difficulty: 'easy',
      },
      {
        question: 'Which layer defines repository interfaces?',
        options: ['Domain', 'Application', 'Infrastructure', 'Presentation'],
        correctAnswer: 1,
        explanation: 'Application layer defines interfaces (ports). Infrastructure layer provides implementations (adapters). This follows Dependency Inversion Principle.',
        difficulty: 'medium',
      },
      {
        question: 'Where should EF Core DbContext be defined?',
        options: ['Domain', 'Application', 'Infrastructure', 'API'],
        correctAnswer: 2,
        explanation: 'DbContext is an Infrastructure concern. Domain and Application should not know about EF Core. Only Infrastructure implements data access.',
        difficulty: 'easy',
      },
      {
        question: 'Where should business rules (e.g., "price must be positive") live?',
        options: ['Controller', 'Domain entity', 'Database constraint', 'Middleware'],
        correctAnswer: 1,
        explanation: 'Business rules belong in Domain entities. The entity enforces its own invariants. This is a core DDD principle supported by Clean Architecture.',
        difficulty: 'medium',
      },
    ],
    interviewQuestions: [
      {
        question: 'Explain Clean Architecture and how you would structure a .NET project.',
        answer: `Clean Architecture separates an application into concentric layers where dependencies point inward:

1. Domain Layer (innermost): Contains entities, value objects, domain events, and domain services. Has ZERO external dependencies - pure C# only. Entities contain behavior, not just data (e.g., Order.AddItem validates business rules).

2. Application Layer: Contains use cases (services), DTOs, interfaces (IRepository, IEmailService), and validators. Depends only on Domain. Orchestrates domain logic.

3. Infrastructure Layer: Implements Application interfaces. Contains EF Core DbContext, repositories, external API clients, file storage, email sending. Depends on Application.

4. API/Presentation Layer (outermost): Controllers, middleware, DI configuration. References all layers for wiring.

The key benefit is testability - Domain and Application can be fully tested without any database or external service. Infrastructure implementations are swappable via DI.

In a .NET solution: 4 projects (.csproj) with explicit project references enforcing the dependency rule. If Domain accidentally references Infrastructure, the build fails.`,
        followUp: [
          'How does Clean Architecture relate to Hexagonal (Ports & Adapters) Architecture?',
          'When would you NOT use Clean Architecture?',
          'How do you handle cross-cutting concerns (logging, caching) in Clean Architecture?',
        ],
      },
    ],
  },
]
