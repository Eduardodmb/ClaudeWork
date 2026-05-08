# BeFirst Portal - Session Memory

## User Preferences

- **Subagent model**: Always use `sonnet` for Task tool subagents (cost/speed optimization). User explicitly requested this 2026-02-24.
- **Documentation workflow**: Docs live in `S:\01_Repos\BeFirst_Docs`, NOT in Portal repo. Portal is code-only.

## Documentation Rules (CRITICAL - 2026-02-26)

**NEVER add documentation files to BeFirst repos except BeFirst_Docs.**

- ✅ **Code changes**: Add to source repos (BeFirst_Portal, BeFirst_APIs, etc.)
- ✅ **Documentation**: ONLY goes to `S:\01_Repos\BeFirst_Docs`
- ❌ **DO NOT**: Create .md, .txt, summary files, or documentation in code repos

### Documentation Structure in BeFirst_Docs

1. **Manuals** → `deliverables/manuals/[DEPT]-[###]-[name].md`
   - Step-by-step "how to do" procedures
   - Document IDs assigned from: `knowledge-base/DOCUMENT-ID-REGISTRY.md`
   - See: `knowledge-base/DOCUMENT-ID-CONTROL.md` for ID assignment rules
   - Example: IT-013-part-number-configuration.md

2. **Knowledge Base** → `knowledge-base/[department]/[topic].md`
   - Conceptual "how it works" explanations
   - Example: knowledge-base/engineering/smt-process-overview.md

3. **Technical Docs** → `docs/[##]_[NAME].md`
   - Architecture, APIs, database schemas
   - Example: docs/02_ARCHITECTURE.md

4. **Images** → `images/[category]/[descriptive-name].png`
   - All screenshots and diagrams
   - Example: images/part-number/partnumber-tab-01.png

### When Documenting Changes

1. Make code changes in source repo
2. Create/update documentation in BeFirst_Docs
3. Reference the source repo in the documentation
4. Never create summary files in the source repo

## Cross-Repo Documentation Pattern

Portal changes → Docs repo pulls and documents. Instructions saved in `S:\01_Repos\BeFirst_Docs\CLAUDE.md` under "Source Repository Sync" section.

### Change Mapping Quick Reference

| Portal Change | Docs Target |
|---------------|-------------|
| New/deleted area | `docs/06_WORKFLOWS.md` + `docs/02_ARCHITECTURE.md` |
| New endpoint | `docs/05_API.md` |
| DB schema | `docs/04_DATABASE.md` |
| Rebranding/UI | `docs/02_ARCHITECTURE.md` + `knowledge-base/it-systems/` |
| Bug fix (significant) | `docs/12_CHANGELOG.md` |
| Business process | `knowledge-base/{department}/` |

## Current State (2026-02-24)

- **Active rebranding**: Lacroix → Safari Circuits (logos, footer, layout)
- **Module removal**: Customs, Finances, Continual Improvements, Instructions, Managements areas deleted
- **Pending deletes**: BackTrackController, ContinualImprovementController
- Branch: `develop`

## Pattern: PartNumberController Sub-Table CRUD

When adding a new sub-table to `Areas/Engineering/Controllers/PartNumberController.cs`, follow this 4-part pattern:

### 1. Model (`Areas/Engineering/Models/PartNumber.cs`)
- Base class: `[Table("TABLE_NAME")] public class tbl_TABLE_NAME : BaseEntity` with all DB columns
- FULL class: extends base, adds joined display fields (e.g., Area name from PD_idt_areas)
- Partial class: extends base, adds `IQueryable<FULL> Items` + `int id`

### 2. Controller (3 methods in PartNumberController.cs)
- `Get{Name}(int id)` → `PartialViewResult` — SELECT with JOINs, returns `PartialView("_{Name}", model)`
- `Delete{Name}(int id)` → `bool` — DELETE by AutoID
- `Add{Name}(params)` → `bool` — INSERT via `Firstronic.Framework.Queries.InsertQuery()`
- All decorated with `[AcceptVerbs(HttpVerbs.Get | HttpVerbs.Post)]`
- Use raw SQL with `SqlParameter[]` (not EF/Repository)

### 3. Partial View (`Views/PartNumber/_{Name}.cshtml`)
- Uses `NonFactors.Mvc.Grid` with `Html.Grid(Model.Items).Build(columns => {...})`
- Columns include display fields + Delete ActionLink with `@class = "delRow"`
- `UsingSourceUrl(Url.Action("Get{Name}", "PartNumber", new { id = Model.id }))`
- Grid ID: `mvc{Name}`

### 4. Tab in `_CreateOrUpdate.cshtml`
- Add `<li>` tab header in `<ul class="uk-tab">` list
- Add `<li>` tab content in `<ul id="tabs_4">` switcher with:
  - Description paragraph
  - `@Html.AjaxGrid(Url.Action("Get{Name}", "PartNumber", new { id = Model.PartID }))`
  - Form inputs (dropdowns from `Queries.GetSelectedFromQuery` or `Dropdowns.GetAreasList`)
  - Add button: `<input id="btnAdd{Name}" type="button" value="Add">`
  - JavaScript: click handler → collect form values → ajax POST to `/Engineering/PartNumber/Add{Name}`
  - `update{Name}()` function: `new MvcGrid(document.querySelector('#mvc{Name}')).reload()`
  - Delete handler: `$(document).on('click', '#mvc{Name}>table>tbody>tr>td>a.delRow', ...)`
- All element IDs must be unique across tabs (suffix with feature name)

### Common Dropdowns
- Areas: `Firstronic.Framework.Functions.Dropdowns.GetAreasList(null, "", true)`
- Stations: AJAX call to `/Manage/Areas/FillStations`
- Facilities: `Queries.GetSelectedFromQuery("SELECT [Facility_Key],[Facility_Name] FROM [Common_Facilities]")`
- CLIENT_OR_SERVER: Manual `List<SelectListItem>` with CLIENT/SERVER/ARDUINO
- SLAVE: Counter query `WITH contador AS (...) SELECT numero FROM contador`

### Domain Knowledge
- **Side values**: Always A and B (not T/B/TB)
- **TCP_TYPE**: Current valid option is "InSight Vision Cognex" (Cognex vision system integration)

### MES Database Schema
- Table definitions live in `S:\01_Repos\BeFirst_Database_MES_Database\MES\dbo\Tables\{TABLE_NAME}.sql`

## Key Files

- Portal CLAUDE.md: `S:\01_Repos\BeFirst_Portal\CLAUDE.md` (architecture reference)
- Docs CLAUDE.md: `S:\01_Repos\BeFirst_Docs\CLAUDE.md` (documentation standards)
- Portal menus: `firstronic/Models/Menus/MenuIndex.cs`
- Portal areas: `firstronic/Areas/` (18 MVC areas)

## Memory Files

- `architecture.md` - Complete architectural patterns (Areas, Framework layer, data access, frontend stack, auth, conventions)
