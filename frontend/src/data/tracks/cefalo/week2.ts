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
    detailedExplanation: `ASP.NET Core Web API is a framework for building RESTful HTTP services. Requests flow through a middleware pipeline (authentication, authorization, routing) before reaching controller action methods that return typed responses with proper HTTP status codes.

Controllers group related endpoints. The [ApiController] attribute enables automatic model validation (returns 400 for invalid input) and parameter source inference ([FromBody] for JSON body, [FromQuery] for query strings). Each action should return appropriate status codes: 201 Created for POST, 204 No Content for PUT/DELETE, 404 Not Found when a resource is missing.

Keep controllers thin. They should only map HTTP requests to service calls and return results. All business logic belongs in the service layer.`,
    keyConcepts: [
      'Middleware pipeline order matters: UseRouting → UseAuthentication → UseAuthorization → MapControllers',
      'Use proper HTTP methods: GET (read), POST (create), PUT (full update), PATCH (partial), DELETE',
      'Return ActionResult<T> for type-safe responses with proper status codes',
    ],
    commonMistakes: [
      'Putting business logic in controllers instead of the service layer',
      'Not returning proper HTTP status codes (always returning 200 even for errors)',
      'Exposing domain entities directly instead of using DTOs',
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
        explanation: 'Each action uses the correct HTTP method and status code. CreatedAtAction returns 201 with a Location header. DTOs are used instead of exposing domain entities.',
        keyPoints: [
          'CreatedAtAction returns 201 with Location header pointing to the new resource',
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
        explanation: 'POST should return 201 Created with a Location header pointing to the new resource.',
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
        explanation: 'It auto-validates models, infers parameter sources, and returns ProblemDetails for errors.',
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
        explanation: 'Routing determines the endpoint, then Authentication identifies the user, then Authorization checks permissions.',
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
        explanation: '[FromBody] deserializes the JSON body; [FromQuery] reads URL query string key-value pairs.',
        difficulty: 'easy',
      },
    ],
    interviewQuestions: [
      {
        question: 'How does the ASP.NET Core middleware pipeline work?',
        answer: `The middleware pipeline is a chain of components that process HTTP requests and responses in the order they are registered in Program.cs. Each middleware can process the request, pass it to the next via next(), and process the response on the way back. The order is critical: UseRouting must come before UseAuthorization, UseAuthentication before UseAuthorization.

Each middleware can short-circuit the pipeline (return early without calling next), modify the request before passing it along, or modify the response after the next middleware returns. Common middleware includes UseExceptionHandler, UseCors, UseAuthentication, UseAuthorization, and MapControllers.`,
        followUp: [
          'How would you create custom middleware for logging?',
          'What happens if middleware does not call next()?',
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
    detailedExplanation: `Dependency Injection (DI) is an implementation of Inversion of Control where a class receives its dependencies from external sources rather than creating them itself. ASP.NET Core has a built-in DI container. You register services in Program.cs (e.g., builder.Services.AddScoped<IBookService, BookService>()) and they are automatically injected via constructor parameters.

There are three lifetimes: Singleton (one instance for the entire app lifetime), Scoped (one instance per HTTP request), and Transient (a new instance every time it is requested). Use Singleton for stateless or expensive-to-create services, Scoped for DbContext and per-request state, and Transient for lightweight stateless services.

The most critical mistake is injecting a Scoped service into a Singleton (Captive Dependency). The Singleton lives forever, but the Scoped service should be disposed after each request, leading to memory leaks and stale data. Enable ValidateScopes in development to detect this.`,
    keyConcepts: [
      'Singleton = one instance for app lifetime; Scoped = one per request; Transient = new every time',
      'Constructor injection is the primary pattern - dependencies declared as constructor parameters',
      'Never inject Scoped service into Singleton (Captive Dependency) - causes memory leaks',
    ],
    commonMistakes: [
      'Injecting Scoped (DbContext) into Singleton - stale data and disposed context errors',
      'Using Service Locator pattern instead of constructor injection',
      'Registering DbContext as Singleton - not thread-safe, causes concurrency errors',
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
        explanation: 'ICacheService is Singleton because the Redis connection is shared. IBookService and Repository are Scoped because DbContext is Scoped. IEmailSender is Transient because it is lightweight and stateless.',
        keyPoints: [
          'Never depend on shorter-lived services from longer-lived ones',
          'Constructor injection makes dependencies explicit and testable',
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
        explanation: 'Scoped creates one instance per HTTP request, shared by all services within that request.',
        difficulty: 'easy',
      },
      {
        question: 'Which DI lifetime should be used for DbContext?',
        options: ['Singleton', 'Transient', 'Scoped', 'None - use new directly'],
        correctAnswer: 2,
        explanation: 'DbContext should be Scoped because Singleton is not thread-safe and Transient creates unnecessary instances.',
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
        explanation: 'A Singleton holding a Scoped service keeps it alive beyond the request scope, causing stale data or disposed context errors.',
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
        explanation: 'Service Locator hides dependencies, whereas constructor injection makes them explicit for compile-time checking and easier testing.',
        difficulty: 'medium',
      },
    ],
    interviewQuestions: [
      {
        question: 'Explain Dependency Injection and its benefits. Why is it important?',
        answer: `Dependency Injection is a design pattern where a class receives its dependencies from external sources rather than creating them internally. In ASP.NET Core, the built-in DI container manages object creation, lifetime, and disposal automatically.

The main benefits are loose coupling (classes depend on interfaces, not concrete types, so implementations can be swapped), testability (dependencies can be mocked in unit tests), and centralized configuration (all registrations live in Program.cs). Without DI, you would manually create and pass dependencies through the entire object graph, leading to tightly coupled and hard-to-test code.`,
        followUp: [
          'What are the three DI lifetimes in ASP.NET Core?',
          'What is a Captive Dependency and how do you avoid it?',
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
    detailedExplanation: `SOLID is a set of five OOP design principles that help write maintainable, extensible, and testable code. SRP (Single Responsibility) means a class should have only one reason to change. OCP (Open/Closed) means you extend behavior by adding new classes, not modifying existing ones. LSP (Liskov Substitution) means subtypes must be usable wherever their base type is expected without breaking behavior.

ISP (Interface Segregation) means clients should not be forced to depend on methods they do not use -- prefer many small, specific interfaces over one large general-purpose one. DIP (Dependency Inversion) means high-level modules should depend on abstractions (interfaces), not concrete low-level implementations.

In practice, SRP and DIP are the most impactful. Extract separate services for distinct responsibilities, and always depend on interfaces so implementations can be swapped and tested independently.`,
    keyConcepts: [
      'SRP: One class = one responsibility = one reason to change',
      'OCP: Add new behavior via new classes/interfaces, not by modifying existing code',
      'DIP: Depend on abstractions (interfaces), not concrete implementations',
    ],
    commonMistakes: [
      'Thinking SRP means "one method per class" - it means one reason to change',
      'Violating LSP by throwing NotImplementedException in overridden methods',
      'Confusing DIP (the principle) with DI (a technique to achieve it)',
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
        explanation: 'SRP fix: UserService only handles registration; email is delegated to IEmailService. OCP fix: Strategy pattern lets you add new discount types without modifying existing code.',
        keyPoints: [
          'SRP fix: Extract responsibilities into separate services with clear interfaces',
          'OCP fix: Use Strategy pattern or polymorphism for varying behavior',
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
        explanation: 'SRP means a class should have one, and only one, reason to change.',
        difficulty: 'easy',
      },
      {
        question: 'Which SOLID principle does the Strategy pattern primarily support?',
        options: ['SRP', 'Open/Closed Principle', 'Liskov Substitution', 'Interface Segregation'],
        correctAnswer: 1,
        explanation: 'Strategy pattern adds new behaviors without modifying existing code, which is the Open/Closed Principle.',
        difficulty: 'medium',
      },
      {
        question: 'Which principle is violated when a subclass throws NotImplementedException?',
        options: ['SRP', 'OCP', 'Liskov Substitution Principle', 'DIP'],
        correctAnswer: 2,
        explanation: 'LSP requires subtypes to be substitutable for their base type without breaking the contract.',
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
        explanation: 'DIP states both high-level and low-level modules should depend on abstractions (interfaces), not concrete classes.',
        difficulty: 'medium',
      },
    ],
    interviewQuestions: [
      {
        question: 'Explain SOLID principles with real-world C# examples.',
        answer: `SRP: A UserService should only handle user CRUD, not send emails. Extract IEmailService for that. OCP: Instead of switch/if-else for payment methods, create an IPaymentProcessor interface with separate implementations for each method. Adding a new payment type means adding a new class, not modifying existing code.

LSP: If Square extends Rectangle and overrides SetWidth to also change Height, client code expecting independent dimensions breaks. ISP: Instead of one IAnimal with Fly(), Swim(), Walk(), create IFlyable, ISwimmable, IWalkable so each class only implements what it needs. DIP: Controllers depend on IOrderService (interface), not the concrete OrderService, enabling unit testing with mocks.`,
        followUp: [
          'Which SOLID principle do you find hardest to apply in practice?',
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
    detailedExplanation: `The Repository Pattern encapsulates data access logic behind an abstraction layer. Instead of using DbContext directly, the service layer depends on IRepository interfaces. This makes data sources swappable and enables mock-based unit testing.

A Generic Repository (IRepository<T>) provides standard CRUD operations (GetByIdAsync, AddAsync, etc.), while Specific Repositories (e.g., IBookRepository) add domain-specific queries. The Unit of Work pattern coordinates changes across multiple repositories in a single transaction. EF Core's DbContext already acts as a Unit of Work since SaveChanges() commits all tracked changes atomically.

Some developers consider Repository redundant with EF Core since DbContext is already a repository + unit of work. However, it provides testability (services do not depend on DbContext directly) and encapsulates complex queries in one place.`,
    keyConcepts: [
      'Repository abstracts data access - services use IRepository, not DbContext directly',
      'Generic Repository provides CRUD; Specific Repository adds domain-specific queries',
      'Unit of Work coordinates multiple repository changes in a single transaction',
    ],
    commonMistakes: [
      'Leaking IQueryable to the service layer - defeats the purpose of the abstraction',
      'Calling SaveChanges in every repository method instead of once via Unit of Work',
      'Over-abstracting when EF Core is sufficient for simple CRUD apps',
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
        explanation: 'IUnitOfWork coordinates multiple repositories. A single SaveChangesAsync call commits all changes atomically. The service layer only knows IUnitOfWork, not DbContext.',
        keyPoints: [
          'UnitOfWork holds all repositories and coordinates SaveChanges',
          'Service depends on IUnitOfWork - easily mockable for unit tests',
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
        explanation: 'Repository abstracts data access behind interfaces, enabling mock-based unit testing.',
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
        explanation: 'Unit of Work groups multiple repository operations into a single atomic transaction.',
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
        explanation: 'Exposing IQueryable leaks ORM details to the service layer, defeating the abstraction purpose.',
        difficulty: 'hard',
      },
    ],
    interviewQuestions: [
      {
        question: 'Is Repository pattern necessary with EF Core? What are the pros and cons?',
        answer: `Arguments for: testability (services can be unit tested with mocked IRepository without a database), encapsulation (complex queries live in repository methods, not scattered across services), and ORM independence (you could swap EF Core for Dapper if needed).

Arguments against: EF Core's DbContext already implements Repository (DbSet) and Unit of Work (SaveChanges), adding another layer is redundant code, and it is hard to abstract away EF Core features like Include and AsNoTracking without leaky abstractions. Use Repository for complex domains with heavy testing needs; skip it for simple CRUD apps.`,
        followUp: [
          'How do you handle complex queries with multiple joins in a repository?',
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
    detailedExplanation: `Clean Architecture places business logic at the center and pushes external concerns (database, UI, frameworks) to the periphery. The key rule is that dependencies always point inward: inner layers never know about outer layers. This is achieved through Dependency Inversion -- the Application layer defines interfaces, and the Infrastructure layer implements them.

The layers from inside out are: Domain (entities, value objects, zero dependencies), Application (services, interfaces, DTOs, depends only on Domain), Infrastructure (EF Core, external APIs, implements Application interfaces), and API/Presentation (controllers, DI wiring, references all layers).

In a .NET solution, this translates to 4 projects with explicit project references enforcing the dependency rule. If Domain accidentally references Infrastructure, the build fails, giving you compile-time safety.`,
    keyConcepts: [
      'Dependency Rule: Dependencies point inward -- Domain knows nothing about Infrastructure',
      'Application layer defines interfaces (ports); Infrastructure layer implements them (adapters)',
      'DI registration happens in the outermost layer (API/Presentation)',
    ],
    commonMistakes: [
      'Domain layer referencing Infrastructure (EF Core, HttpClient) - violates dependency rule',
      'Putting business logic in controllers instead of the Application/Service layer',
      'Over-engineering small projects with full Clean Architecture when N-tier would suffice',
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
        explanation: 'Dependencies flow Domain to Application to Infrastructure to API. Each layer only references its inner layer. BookService (Application) knows IBookRepository; BookRepository (Infrastructure) implements it.',
        keyPoints: [
          'Domain has zero NuGet references - pure C# only',
          'Application defines interfaces; Infrastructure implements them',
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
        explanation: 'Dependencies always point inward -- outer layers depend on inner layers, and Domain has zero outward dependencies.',
        difficulty: 'easy',
      },
      {
        question: 'Which layer defines repository interfaces?',
        options: ['Domain', 'Application', 'Infrastructure', 'Presentation'],
        correctAnswer: 1,
        explanation: 'The Application layer defines interfaces (ports) and Infrastructure provides implementations (adapters).',
        difficulty: 'medium',
      },
      {
        question: 'Where should EF Core DbContext be defined?',
        options: ['Domain', 'Application', 'Infrastructure', 'API'],
        correctAnswer: 2,
        explanation: 'DbContext is an Infrastructure concern; Domain and Application should not know about EF Core.',
        difficulty: 'easy',
      },
      {
        question: 'Where should business rules (e.g., "price must be positive") live?',
        options: ['Controller', 'Domain entity', 'Database constraint', 'Middleware'],
        correctAnswer: 1,
        explanation: 'Business rules belong in Domain entities, which enforce their own invariants.',
        difficulty: 'medium',
      },
    ],
    interviewQuestions: [
      {
        question: 'Explain Clean Architecture and how you would structure a .NET project.',
        answer: `Clean Architecture separates an application into concentric layers where dependencies point inward. Domain (innermost) contains entities and value objects with zero external dependencies. Application contains services, DTOs, and interfaces. Infrastructure implements those interfaces with EF Core, external APIs, etc. API/Presentation (outermost) handles controllers, middleware, and DI wiring.

In a .NET solution this means 4 projects with explicit project references enforcing the dependency rule -- if Domain accidentally references Infrastructure, the build fails. The key benefit is testability: Domain and Application can be fully tested without any database or external service, and Infrastructure implementations are swappable via DI.`,
        followUp: [
          'When would you NOT use Clean Architecture?',
          'How do you handle cross-cutting concerns (logging, caching) in Clean Architecture?',
        ],
      },
    ],
  },
]
