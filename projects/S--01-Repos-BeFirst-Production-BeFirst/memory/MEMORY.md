# BeFirst Production — Session Memory

## Memory Storage Rule
**Detailed memory/reference files belong IN the repo** (e.g., `S:\01_Repos\BeFirst_Production\BeFirst\.claude\memory\`) — repos are shared projects. Only keep a brief index in this MEMORY.md. Never save detailed topic files to the user-local `C:\Users\emarquez\.claude\projects\` folder.

## Project layout
- Code repo: `S:\01_Repos\BeFirst_Production\BeFirst`
- Docs repo: `S:\01_Repos\BeFirst_Docs`
- Shared memory: `S:\01_Repos\BeFirst_Production\BeFirst\.claude\memory\`

## Documentation protocol (enforced)
After every code change, update BeFirst_Docs in the same session:
| Change | Target file |
|---|---|
| New form feature / workflow | `docs/06_WORKFLOWS.md` |
| New or modified DB table | `docs/04_DATABASE.md` |
| New integration | `docs/02_ARCHITECTURE.md` + `docs/06_WORKFLOWS.md` |
| Any change | `docs/12_CHANGELOG.md` (always) |

## frm_WAVE scope
`frm_WAVE` = primary operator form for ALL intermediate operations between SMT and Packout.

**NOT frm_WAVE:** Receiving, Shipping, OOBA, MergeLabels, MergeUnits, Conversion, Packout (frm_PVS).

## Key patterns
- Station features enabled via DB query on `ExData.Selected_Area.StationID_Main` at load
- TCP server pattern: `PART_OPERATION_AREAS_TCP` table → `AreasToTCP` DataTable → `Task.Run(tcp_SERVER_Add)` — mirrors frm_PVS exactly
- `AreasToTCP` loaded in `ExFunctions.vb` alongside `AreasAOIToReview`, `AreasToReview`, etc.
- All framework code is VB.NET `Module` (static), not classes

## Multi-repo feature flag pattern (LaserSkip = reference implementation)
When adding a per-part-number feature flag across repos, touch these files in order:

| Step | Repo | File | Action |
|---|---|---|---|
| 1 | Production | `ExData.vb` — `Casilla` class | Add `Public FlagName As Boolean = False` |
| 2 | Production | `ExFunctions.vb` — after AreasToTCP block | Add load block: query table, set flag |
| 3 | Production | `frm_XXX.vb` | Add gate: `If ExData.Selected_Area.Selected_Casilla.FlagName Then ...` |
| 4 | Database | `MES/dbo/Tables/TABLE_NAME.sql` | Create table SQL |
| 5 | Database | `MES.sqlproj` | Add `<Build Include="dbo\Tables\TABLE_NAME.sql" />` alphabetically |
| 6 | Portal | `Areas/Engineering/Models/PartNumber.cs` | Add entity + `_FULL` + `_FULL_partial` after MERGE_AUTO_AT_AOI block |
| 7 | Portal | `Areas/Engineering/Controllers/PartNumberController.cs` | Add `GetXxx`/`AddXxx`/`DeleteXxx` before AutoMergeAOI section |
| 8 | Portal | `Areas/Engineering/Views/PartNumber/_Xxx.cshtml` | Create partial — copy `_AutoMergeAOI.cshtml` as template |
| 9 | Portal | `Areas/Engineering/Views/PartNumber/_CreateOrUpdate.cshtml` | Add `Html.AjaxGrid` + Add button + JS into target tab |

Portal JS pattern: `ajaxfncXxx()` POST to `/Engineering/PartNumber/AddXxx` → `updateXxx()` reloads grid; delete via `.delRow` click → same reload.
Docs to update: `12_CHANGELOG.md` (always), `04_DATABASE.md` (new table), `06_WORKFLOWS.md` (new workflow section).

## Active Migration Initiative: SQL → API
Migrating `BeFirst_Production` forms from direct SQL (`BeConn`) to REST API (`BeApi` → `BeFirst_APIs`). Multi-session, recurring task.

**Full details:** `S:\01_Repos\BeFirst_Production\BeFirst\.claude\memory\migration.md`

### Quick facts
- APIs repo: `S:\01_Repos\BeFirst_APIs` — ASP.NET Core C#, EF Core, JWT Bearer (self-issued, NOT Azure AD)
- `BeApi.GetString("/Controller/Action", "GET", params)` → returns JSON string
- `BeApi.API_Call(...)` → returns `APIResponse` (ResponseCode, Response)
- Route pattern: controller name = prefix → `StationController` = `/Station`
- Service pattern: `IXxxService` interface + `XxxService : ModelBase` impl, all async/await
- 15 controllers: Account, Agent, Area, Bin, Container, Job, Labeling, Material, Others, Parts, Settings, Station, Subscriptions, Tools, Units
- Docs for migration: `S:\01_Repos\BeFirst_Docs\docs\14_API_MIGRATION.md`
- `docs/05_API.md` in BeFirst_Docs is OUTDATED — describes old Azure AD design, not the real code
