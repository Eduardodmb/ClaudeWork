# BeFirst Portal - Architecture Reference

## Technology Stack

- **Framework**: ASP.NET MVC 5 (.NET Framework 4.8)
- **Database**: SQL Server (5 connection strings: main, staging, ODS, DWH, machines)
- **ORM**: Dual context - EF6 (legacy Identity) + EF Core 3.1 (newer features)
- **DI**: Autofac
- **Auth**: ASP.NET Identity 2.0 + OWIN cookie auth
- **Build**: MSBuild (not `dotnet build`)

## Areas Pattern (18 MVC Areas)

Primary organization under `firstronic/Areas/`:

| Area | Purpose |
|------|---------|
| Dashboards | TV displays, 3D floor (Three.js), OEE, downtime |
| Production | Packout, shortages, rework, PLEX reconciliation |
| Quality | CAPAS/ESD/5S audits, FPI, defects, scrap |
| Materials | Warehouse, kanban, tool crib, MSL, receiving |
| Engineering | Part numbers, setups, rates, tools, feeders |
| Tracking | Unit history, containers, BOM, serial tracking |
| Manufacturing | OEE, SMT reports (SPI/AOI/P&P), solder paste |
| Manage | Stations, areas, cells, users, roles, settings |
| Planning | Production planning, balance, job hints |
| Tickets | Internal ticketing with dashboards |
| Personnel | Teams/bonus, visitors, QA locks |
| Mobile | Mobile-optimized SMT interfaces |
| Rework | Rework tracking |
| Testing | Test operations |
| Purchasing | Procurement |
| IS/IT | Information systems, trainings |
| Utils | Printers |

## Framework Layer (`firstronic/Framework/`)

### Core Components

- **BaseController** - All controllers inherit. Provides language/culture, notifications (Success/Error/Info/Warning), error handling
- **BePlex.cs** - PLEX ERP SOAP integration (480KB file, production data/BOMs/work orders)
- **GlobalVariables.cs** - All environment variable config (18+ connection strings and credentials)

### Data Access Patterns

1. **Dual DbContext**:
   - `LegacyDataContext/DataContext.cs` - EF6 `IdentityDbContext` for ASP.NET Identity + legacy tables
   - `AppDataContext/AppDbContext.cs` - EF Core 3.1 for newer features
   - `Repository<T>` / `IRepository<T>` - Generic repository over EF6

2. **Raw SQL Helpers** (`Functions/Queries.cs`):
   - `GetDatatableFromQuery()` - Read-heavy operations
   - `GetIntFromQuery()`, `GetStringFromQuery()`, etc.
   - `InsertQuery()` - Used in CRUD operations
   - All use ADO.NET with `SqlParameter[]`

### UI Components

- **Custom HTML Helpers**: `HtmlHelper.Fst()` extensions in `Framework/UI/`
- **Localization**: `Settings.resx` (English/Spanish) accessed via `Resources.Menu.*`, `Resources.Settings.*`
- **Notifications**: `BaseController.Success()`, `Error()`, `Info()`, `Warning()`

### Dependency Injection (Autofac)

Configured in `App_Start/DependencyRegister.cs`:
- `DataContext` as `IDataContext` (per-request)
- `AppDbContext` (per-request)
- `MemoryCacheManager` as `ICacheManager` (singleton)
- `ApplicationUserService` for Identity
- `Engine.Resolve<T>()` for service locator

## Frontend Stack

- **Layouts**: `_Layout.cshtml`, `_Layout_portal.cshtml`, `_Layout_tvs_*.cshtml` (TV dashboards)
- **Bundling**: `BundleConfig.cs`
- **Libraries**: Bootstrap 5.3, jQuery 3.7, Font Awesome 6, Chart.js, DataTables, Select2, TinyMCE, Toastr, Three.js, D3.js
- **Grid**: `NonFactors.Mvc.Grid` for data tables
- **Static Assets**: `firstronic/Content/` (css, img, vendor)

## Authentication & Authorization

- **OWIN Middleware**: `App_Start/Startup.Auth.cs`
- **Identity**: ASP.NET Identity 2.0
- **Custom User**: `ApplicationUser` extends `IdentityUser` with Badge, ControlID, Location fields
- **Session**: 60 min timeout

## Key Conventions

1. **Controllers**:
   - Inherit from `BaseController`
   - Use raw SQL via `Queries.GetDatatableFromQuery()` for reads
   - Use `Repository<T>` for CRUD
   - Decorate with `[AcceptVerbs(HttpVerbs.Get | HttpVerbs.Post)]` for dual-method actions

2. **Models**:
   - Extend `Framework/Entities/BaseEntity`
   - Use `[Table("TABLE_NAME")]` attribute
   - Pattern: Base class (DB fields) → FULL class (+ joined fields) → Partial class (+ Items IQueryable)

3. **Views**:
   - ~1800 `.cshtml` files
   - Use `@Html.AjaxGrid()` for dynamic grids
   - Use `NonFactors.Mvc.Grid` for data display
   - JavaScript often inline in views (jQuery)

4. **Database**:
   - Schema definitions in separate repo: `S:\01_Repos\BeFirst_Database_MES_Database\MES\dbo\Tables\`
   - Multiple databases: MES (main), STG (staging), ODS (operational), DWH (warehouse), Machines, Hanwha

5. **Files**:
   - Uploads: `firstronic/ExcelUploads/`, `firstronic/UploadedFiles/`
   - Max size: 1GB (`maxRequestLength` in Web.config)
   - Network storage: `BeFirst:FilesIP` environment variable

## Integration Points

1. **PLEX ERP**: `Framework/BePlex.cs` (SOAP API, credentials in env vars)
2. **Internal API**: `Framework/APIs/*` (Station, Materials, Containers, Account)
3. **Email**: SMTP via `BeFirst:SMTPEmail/SMTPPassword`

## Git Workflow

- **Active branch**: `develop`
- **Main branch**: `master`
- **Commit prefixes**: `STYLE:`, `DELETE:`, `FIX`, `Fix:`, `FEAT:`
- **Remote**: GitLab (`gitlab.lcx.app`)

## Navigation System

- **Menu builder**: `Models/Menus/MenuIndex.cs`
- Dynamically built from database queries (areas/stations)
- Uses custom `Nav`/`Dropdown` classes from `Framework/UI/`

## Required Environment Variables

18+ variables in `GlobalVariables.cs`:
- 5 SQL connection strings (main, STG, ODS, DWH, machines)
- PLEX SOAP credentials
- Internal API credentials
- SMTP credentials
- File storage IP

## No Testing/Linting

- No unit tests configured
- No linting/formatting tools
- Manual testing only
