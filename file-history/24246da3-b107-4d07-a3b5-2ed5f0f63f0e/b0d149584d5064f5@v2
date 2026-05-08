# BeFirst_Docs Project Memory

## Platform Architecture

**BeFirst Platform**: 13-repository manufacturing intelligence ecosystem for Safari Circuits
- **Primary facilities**: GRA1 (Granby, QC), JUA1/JUA2 (Ciudad Juárez, Mexico)
- **Source System**: PLEX ERP (SQL Server, Port 1438) - read-only access
- **Data Warehouse**: PROD_DWH (SQL Server, Port 1439) - analytics/reporting

### Repository Structure

| Repository | Location | Technology |
|------------|----------|------------|
| **BeFirst_APIs** | `S:\01_Repos\BeFirst_APIs` | ASP.NET Core 7.0, EF Core 7.0 |
| **BeFirst_Portal** | `S:\01_Repos\BeFirst_Portal` | ASP.NET MVC 5, EF 6 |
| **BeFirst_Docs** | `S:\01_Repos\BeFirst_Docs` | Markdown documentation |

---

## BeFirst APIs - Architecture & Patterns

### Technology Stack

- **Framework**: ASP.NET Core 7.0
- **ORM**: Entity Framework Core 7.0 (REQUIRED - NO raw SQL)
- **Authentication**: Azure AD JWT Bearer tokens
- **Project Location**: `S:\01_Repos\BeFirst_APIs\BeFirst_APIs\`

### Core Architecture Principles

**✅ ALWAYS DO**:
- Use Entity Framework Core for ALL data access
- Async/await for all database operations (`AddAsync`, `SaveChangesAsync`, `FirstOrDefaultAsync`, `ToListAsync`)
- Dependency injection for services and DbContexts
- Request/Response model pattern (validate requests, standardize responses)
- Interface-based services (`IYourService` + `YourService`)
- Register services in `Program.cs` with `AddScoped<IYourService, YourService>()`
- Include Health endpoint in every controller
- XML documentation comments on all public endpoints

**❌ NEVER DO**:
- Raw SQL queries (`SqlConnection`, `SqlCommand`, `ExecuteNonQuery`)
- Synchronous database methods (`Add`, `SaveChanges`, `FirstOrDefault`, `ToList`)
- `AddWithValue` for SQL parameters (use EF Core instead)
- Modify auto-generated entity models manually

### Data Layer

**Available DbContexts** (all injected via DI in `Program.cs`):
- `ProdDwhContext` - PROD_DWH database (main data warehouse)
- `ProdMachinesResultsContext` - MACHINES_RESULTS database (machines, AOI, test data)
- `ProdHanwhaContext` - HANWHA database
- `ProdCascoFctbContext` - CASCO_FCTB database

**Entity Models Location**: `Models\DataMachines\` or `Models\DataBase\`
- Auto-generated from database schema
- Entity naming: `YourTable.cs` (singular, PascalCase)
- DbSet naming: `YourTables` (plural)
- Table naming: `Your_Table` (snake_case in database)

### Service Layer Pattern

**Location**: `Service\[ServiceName]\`

**Structure**:
```csharp
namespace APIs_BeFirst.Service.YourService
{
    public interface IYourService
    {
        Task<YourResponse> SubmitDataAsync(YourRequest request);
        Task<YourBatchResponse> SubmitBatchAsync(List<YourRequest> requests);
        Task<YourEntity?> GetConfigAsync(int id);
    }

    public class YourService : IYourService
    {
        protected readonly ProdMachinesResultsContext _contextMachines;
        // Inject DbContext in constructor

        public YourService(ProdMachinesResultsContext contextMachines)
        {
            _contextMachines = contextMachines;
        }

        // Async methods using EF Core LINQ
    }
}
```

**Service Registration** (`Program.cs` around line 215):
```csharp
using APIs_BeFirst.Service.YourService;
builder.Services.AddScoped<IYourService, YourService>();
```

### Request/Response Models

**Location**: `Models\Request\` and `Models\Response\`

**Request Pattern**:
```csharp
namespace APIs_BeFirst.Models.Request
{
    public class YourRequest
    {
        [Required]
        public int RequiredField { get; set; }

        [StringLength(100)]
        public string? OptionalField { get; set; }
    }
}
```

**Response Pattern**:
```csharp
namespace APIs_BeFirst.Models.Response
{
    public class YourResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public DateTime ProcessedAt { get; set; }
    }
}
```

### Controller Pattern

**Location**: `Controllers\[ControllerName]Controller.cs`

**Structure**:
```csharp
[ApiController]
[Route("[controller]")]
public class YourController : ControllerBase
{
    private readonly IYourService _yourService;
    private readonly ILogger<YourController> _logger;

    // Inject service + logger
    public YourController(IYourService yourService, ILogger<YourController> logger)
    {
        _yourService = yourService;
        _logger = logger;
    }

    [Authorize]
    [HttpPost("SubmitData")]
    [ProducesResponseType(typeof(YourResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<YourResponse>> SubmitData([FromBody] YourRequest request)
    {
        // Validate, call service, return response
    }

    [HttpGet("Health")]
    public IActionResult Health()
    {
        return Ok(new { Status = "Healthy", Timestamp = DateTime.Now });
    }
}
```

### Reference Implementations

**Study these for patterns**:
- `Service\AOI\AOIService.cs` - Full CRUD with batch operations
- `Service\Units.cs\UnitsService.cs` - Multiple DbContext injection
- `Service\Material\MaterialService.cs` - Standard CRUD patterns
- `Controllers\AOIController.cs` - Full REST controller with auth

---

## Documentation Rules

**IMPORTANT**: Unless explicitly requested, **DO NOT create documentation files**.

Only create documentation when user specifically asks. Exceptions:
- ✅ Code comments and XML documentation comments
- ✅ Updating existing documentation if asked

---

## Quick Reference

**Repos**:
- APIs: `S:\01_Repos\BeFirst_APIs`
- Portal: `S:\01_Repos\BeFirst_Portal`
- Docs: `S:\01_Repos\BeFirst_Docs`

**Key Files**:
- Service registration: `BeFirst_APIs\Program.cs` (line ~215)
- Entity models: `BeFirst_APIs\Models\DataMachines\` or `Models\DataBase\`
- Services: `BeFirst_APIs\Service\[ServiceName]\`
- Controllers: `BeFirst_APIs\Controllers\`
