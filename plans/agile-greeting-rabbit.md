# Management Report: Roles & User Membership Audit

## Context

Management requires a comprehensive report for auditing user access and role assignments. The report must show:
1. All roles with their assigned user members
2. Users who have role assignments but no position assigned (potential security/HR concern)

This report addresses two management needs:
- **Access control audit**: Who has which permissions (via roles)?
- **Position compliance**: Are all users with system access properly assigned to positions?

The report must be printable for management review and compliance documentation.

## Implementation Approach

### Location: Manage Area ReportsController

**Create new:** `S:\01_Repos\BeFirst_Portal\firstronic\Areas\Manage\Controllers\ReportsController.cs`

**Rationale:**
- Roles and user management already live in Manage area (RoleController, UserController)
- Security/audit reports belong with security management features
- Follows established area organization pattern

### Pattern: Single Report with Two Sections

**Report structure:**
1. Main view with optional filters (active users only, facility filter)
2. Section 1: Roles with member lists (hierarchical display)
3. Section 2: Users without positions (flat table)
4. Print-friendly styling (hide headers/footers via `@media print`)

**Rationale:**
- Both queries relate to the same audit workflow
- Single page is easier to print and review together
- Follows Personnel/BonusHistory report pattern (filter form + results)

### Data Access: Raw SQL with Parameterized Queries

**Framework method:** `Firstronic.Framework.Queries.GetDatatableFromQuery()`

**Rationale:**
- Consistent with existing RoleController and ReportsController patterns
- RoleController already has similar query (roles with user counts) at line 30-39
- Performance advantage for reporting queries with multiple JOINs
- Established pattern in codebase (no need to introduce new approaches)

### Authorization

**Decorator:** `[Authorize(Roles = "BF Administrator")]` on controller class

**Rationale:**
- Matches RoleController authorization pattern
- Report contains sensitive access control information
- Could extend to other admin roles if needed (BF User Manager)

## Critical Files

**Files to create:**
1. `S:\01_Repos\BeFirst_Portal\firstronic\Areas\Manage\Controllers\ReportsController.cs`
2. `S:\01_Repos\BeFirst_Portal\firstronic\Areas\Manage\Views\Reports\Index.cshtml`
3. `S:\01_Repos\BeFirst_Portal\firstronic\Areas\Manage\Views\Reports\_RolesWithMembers.cshtml` (partial)
4. `S:\01_Repos\BeFirst_Portal\firstronic\Areas\Manage\Views\Reports\_UsersWithoutPosition.cshtml` (partial)

**Files to reference:**
- `S:\01_Repos\BeFirst_Portal\firstronic\Areas\Manage\Controllers\RoleController.cs` (lines 30-39, 183-196) - Query patterns
- `S:\01_Repos\BeFirst_Portal\firstronic\Areas\Personnel\Controllers\ReportsController.cs` - Controller structure
- `S:\01_Repos\BeFirst_Portal\firstronic\Areas\Personnel\Views\Reports\BonusHistory.cshtml` - Filter form and layout
- `S:\01_Repos\BeFirst_Portal\firstronic\Areas\Personnel\Views\Reports\BonusHistory_Details.cshtml` - Print styling

## Implementation Steps

### Step 1: Create ReportsController

**File:** `S:\01_Repos\BeFirst_Portal\firstronic\Areas\Manage\Controllers\ReportsController.cs`

**Actions to implement:**
```csharp
[Authorize(Roles = "BF Administrator")]
public class ReportsController : BaseSecurityController
{
    private readonly DataContext db;

    public ReportsController() { db = new DataContext(); }

    // Main report page with filters
    public ActionResult Index() { return View(); }

    // Section 1: Roles with members
    [AcceptVerbs(HttpVerbs.Get | HttpVerbs.Post)]
    public PartialViewResult GetRolesWithMembers(bool activeOnly = true)

    // Section 2: Users without positions
    [AcceptVerbs(HttpVerbs.Get | HttpVerbs.Post)]
    public PartialViewResult GetUsersWithoutPosition(bool activeOnly = true)
}
```

### Step 2: SQL Queries

**Query 1: Roles with User Counts**
```sql
SELECT
  AspNetRoles.Id,
  AspNetRoles.Name,
  AspNetRoles.Facility_Key,
  COUNT(AspNetUserRoles.UserId) AS MemberCount
FROM AspNetRoles
LEFT JOIN AspNetUserRoles ON AspNetUserRoles.RoleId = AspNetRoles.Id
WHERE AspNetRoles.IsVisible = 1
GROUP BY AspNetRoles.Id, AspNetRoles.Name, AspNetRoles.Facility_Key
ORDER BY AspNetRoles.Name ASC
```

**Query 2: Role Members Detail** (called per role)
```sql
SELECT
  AspNetUserRoles.RoleId,
  AspNetUserRoles.UserId,
  AspNetUsers.Name,
  AspNetUsers.Surname,
  AspNetUsers.Badge,
  AspNetUsers.UserName,
  AspNetUsers.IsActive
FROM AspNetUserRoles
INNER JOIN AspNetUsers ON AspNetUserRoles.UserId = AspNetUsers.Id
WHERE AspNetUserRoles.RoleId = @RoleId
  AND (@ActiveOnly = 0 OR AspNetUsers.IsActive = 1)
ORDER BY AspNetUsers.Name ASC
```

**Query 3: Users Without Positions**
```sql
SELECT DISTINCT
  AspNetUsers.Id,
  AspNetUsers.Name,
  AspNetUsers.Surname,
  AspNetUsers.Badge,
  AspNetUsers.UserName,
  AspNetUsers.IsActive,
  STUFF((
    SELECT ', ' + AspNetRoles.Name
    FROM AspNetRoles
    INNER JOIN AspNetUserRoles ON AspNetUserRoles.RoleId = AspNetRoles.Id
    WHERE AspNetUserRoles.UserId = AspNetUsers.Id
    FOR XML PATH(''), TYPE
  ).value('.', 'NVARCHAR(MAX)'), 1, 2, '') AS RoleNames
FROM AspNetUsers
WHERE EXISTS (
  SELECT 1 FROM AspNetUserRoles
  WHERE AspNetUserRoles.UserId = AspNetUsers.Id
)
AND NOT EXISTS (
  SELECT 1 FROM AspNetUserPositions
  WHERE AspNetUserPositions.UserId = AspNetUsers.Id
)
AND (@ActiveOnly = 0 OR AspNetUsers.IsActive = 1)
ORDER BY AspNetUsers.Name ASC
```

**Note:** Using `FOR XML PATH` for concatenation (SQL Server 2016 compatible). If SQL Server 2017+, can use `STRING_AGG()`.

### Step 3: Create Main View

**File:** `S:\01_Repos\BeFirst_Portal\firstronic\Areas\Manage\Views\Reports\Index.cshtml`

**Structure:**
- Page title: "Role & Position Audit Report"
- Filter section:
  - Checkbox: "Active Users Only" (default: checked)
  - Button: "Generate Report"
- Results container 1: `<div id="RolesMembersSection"></div>`
- Results container 2: `<div id="UsersWithoutPositionSection"></div>`
- Print styling section (hide header/footer)

**JavaScript:** jQuery to call controller actions and load partials into containers

### Step 4: Create Partial Views

**File 1:** `S:\01_Repos\BeFirst_Portal\firstronic\Areas\Manage\Views\Reports\_RolesWithMembers.cshtml`
- Table structure: Role Name | Member Count | Members List
- Collapsible/expandable rows showing individual members per role
- Use Bootstrap table classes for styling

**File 2:** `S:\01_Repos\BeFirst_Portal\firstronic\Areas\Manage\Views\Reports\_UsersWithoutPosition.cshtml`
- Simple table: Name | Badge | Username | Active | Assigned Roles
- Warning styling (yellow/orange background) to highlight attention needed
- Sortable by columns

### Step 5: Print Styling

Add to main view `Index.cshtml` in `@section head`:
```css
@media print {
  header, footer, .sidebar, .md-card-toolbar-actions, .noPrint {
    display: none !important;
  }
  .main-content {
    padding: 0 !important;
  }
  .md-card {
    box-shadow: none !important;
  }
  table {
    page-break-inside: auto;
  }
  tr {
    page-break-inside: avoid;
    page-break-after: auto;
  }
}
```

### Step 6: Add Navigation Link (Optional)

**File:** `S:\01_Repos\BeFirst_Portal\firstronic\Areas\Manage\Views\Shared\_Layout.cshtml` (or nav partial)

Add menu item under Manage area navigation:
```html
<li>@Html.ActionLink("Role Audit Report", "Index", "Reports", new { area = "Manage" }, null)</li>
```

## Key Database Tables

- `AspNetUsers` - User accounts (Id, UserName, Name, Surname, Badge, IsActive)
- `AspNetRoles` - Role definitions (Id, Name, Facility_Key, IsVisible)
- `AspNetUserRoles` - User-to-Role assignments (UserId, RoleId, Facility_Key)
- `AspNetPosition` - Position definitions (PositionID, Position)
- `AspNetUserPositions` - User-to-Position assignments (UserId, PositionId)

## Verification

**Manual testing:**
1. Log in as user with "BF Administrator" role
2. Navigate to Manage → Reports → Index (or direct URL: `/Manage/Reports`)
3. Click "Generate Report" button
4. Verify Section 1 shows roles with member counts and expandable member lists
5. Verify Section 2 shows users without positions with their role assignments
6. Test "Active Users Only" filter (check/uncheck and regenerate)
7. Click browser Print (Ctrl+P) and verify:
   - Headers/footers are hidden
   - Tables are properly formatted
   - Page breaks are reasonable
8. Test with different SQL Server versions if needed (verify XML PATH concatenation works)

**User acceptance:**
- Management can review complete role membership
- Management can identify users needing position assignments
- Report can be printed/saved as PDF for compliance records

## Trade-offs

| Decision | Benefits | Drawbacks | Mitigation |
|----------|----------|-----------|------------|
| **Manage area** | Natural location for security/admin reports | Slightly isolated from Personnel reports | Keep consistent styling |
| **Single report** | Easier to print together; related audit data | Slightly complex UI | Clear section headers |
| **Raw SQL** | Performance; matches codebase patterns | Manual parameter handling | Use SqlParameter properly |
| **No pagination** | Simpler to print | Slow with 1000+ users | Filter by active only (default) |
| **Basic print CSS** | Quick implementation | Not as polished as professional reports | Good enough for compliance |
| **No Excel export** | Simpler MVP | Users must print-to-PDF | Can add later if requested |

## Performance Considerations

- Query 1 (roles with counts): Fast, ~100 roles
- Query 2 (members per role): Called per role, could be slow if rendering all roles expanded
- Query 3 (users without positions): Fast with proper indexes on AspNetUserPositions
- **Recommendation:** Render Query 2 on-demand (expand/collapse per role) for better performance

## Security Considerations

- Report shows sensitive access control information
- Restricted to "BF Administrator" role only
- No sensitive data (passwords, tokens) exposed
- Audit log should record when report is accessed (if audit logging exists)

## Future Enhancements (Not in MVP)

- Excel export (EPPlus)
- Facility filter (if multi-facility matters)
- Date range filter (show role assignments added/removed in period)
- Position recommendations (suggest positions based on role patterns)
- Email report to management on schedule
- Pagination for large user/role lists
