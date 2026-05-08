# Implementation Plan: Serialization Order Remapping by AreaID and Side

## Context

The BeFirst scanner array serialization system currently supports only a single configuration per part. However, different manufacturing areas (e.g., SMT, AOI) and different board sides (Top/Bottom) may require different scanning orders due to machine-specific reading patterns.

**Problem:** Machines in different areas read serial numbers in different sequences, but the current system only supports one order per part.

**Solution:** Create a **remapping table** that transforms the default serialization order for specific AreaID/Side combinations without modifying the base configuration.

## Design Decision: Index Remapping Table (Non-Invasive Approach)

Instead of duplicating configurations, we create a lightweight remapping table:

**Concept:**
- Keep existing `Part_Operation_Serialization_Array_Index` unchanged (default order)
- Create new table `Part_Operation_Serialization_Array_Index_Remap` to transform indexes
- Example: In SMT area, original index 4 becomes new index 5

**Benefits:**
- No changes to existing tables
- No data migration required
- Simpler logic - base config + optional remap
- Easy to manage - only define exceptions, not full config

## Phase 1: Database Schema Changes

### 1.1 Create Remapping Table

**File:** `S:\01_Repos\BeFirst_Database_MES_Database\MES\dbo\Tables\Part_Operation_Serialization_Array_Index_Remap.sql` (NEW)

```sql
CREATE TABLE [dbo].[Part_Operation_Serialization_Array_Index_Remap](
    [AutoID] [int] IDENTITY(1,1) NOT NULL,
    [PartID] [int] NULL,
    [AreaID] [int] NOT NULL,
    [Side] [nvarchar](10) NOT NULL,
    [OriginalIndex] [int] NOT NULL,
    [RemappedIndex] [int] NOT NULL,
    [Facility_Key] [int] NULL,
    [Part_Key] [int] NULL,
    [CreatedDate] [datetime] NULL DEFAULT (GETDATE()),
    [ModifiedDate] [datetime] NULL DEFAULT (GETDATE())
)

-- Create indexes for performance
CREATE NONCLUSTERED INDEX [IX_Remap_PartArea]
ON [dbo].[Part_Operation_Serialization_Array_Index_Remap]
([PartID], [AreaID], [Side])

-- Unique constraint: One remap per PartID+AreaID+Side+OriginalIndex
CREATE UNIQUE INDEX [UQ_Remap_PartAreaOriginal]
ON [dbo].[Part_Operation_Serialization_Array_Index_Remap]
([PartID], [AreaID], [Side], [OriginalIndex])
WHERE [PartID] IS NOT NULL
```

**Purpose:** Maps original ToIndex values to new ToIndex values for specific AreaID/Side combinations.

**Example Data:**
| PartID | AreaID | Side | OriginalIndex | RemappedIndex |
|--------|--------|------|---------------|---------------|
| 12345  | 5 (SMT)| A    | 1             | 1             |
| 12345  | 5 (SMT)| A    | 2             | 3             |
| 12345  | 5 (SMT)| A    | 3             | 2             |
| 12345  | 5 (SMT)| A    | 4             | 5             |
| 12345  | 5 (SMT)| A    | 5             | 4             |

### 1.2 No Changes to Existing Tables

✅ **Advantage:** Existing tables remain unchanged - no migration needed!

## Phase 2: Entity Model Updates

**File:** `S:\01_Repos\BeFirst_Portal\firstronic\Areas\Engineering\Models\PartNumber.cs`

### 2.1 Add NEW Entity Class (insert after line 2473)

```csharp
[Table("Part_Operation_Serialization_Array_Index_Remap")]
public class tbl_Part_Operation_Serialization_Array_Index_Remap
{
  [Display(Name = "AutoID")]
  public int AutoID { get; set; }

  [Display(Name = "PartID")]
  public int? PartID { get; set; }

  [Display(Name = "AreaID")]
  public int AreaID { get; set; }

  [Display(Name = "Side")]
  [MaxLength(10)]
  public string Side { get; set; }

  [Display(Name = "Original Index")]
  public int OriginalIndex { get; set; }

  [Display(Name = "Remapped Index")]
  public int RemappedIndex { get; set; }

  [Display(Name = "Facility_Key")]
  public int? Facility_Key { get; set; }

  [Display(Name = "Part_Key")]
  public int? Part_Key { get; set; }

  public DateTime? CreatedDate { get; set; }
  public DateTime? ModifiedDate { get; set; }
}

public class tbl_Part_Operation_Serialization_Array_Index_Remap_FULL : tbl_Part_Operation_Serialization_Array_Index_Remap
{
  [Display(Name = "PartNumber")]
  public string PartNumber { get; set; }

  [Display(Name = "Area")]
  public string AreaName { get; set; }
}
```

### 2.2 No Changes to Existing Entity Classes

✅ **Advantage:** Existing entity classes remain unchanged!

## Phase 3: Controller Changes

**File:** `S:\01_Repos\BeFirst_Portal\firstronic\Areas\Engineering\Controllers\PartNumberController.cs`

### 3.1 Update GetActivateScannerArrayData (Line 2960)

Modify to apply remapping when AreaID/Side specified:

```csharp
[AcceptVerbs(HttpVerbs.Get | HttpVerbs.Post)]
public JsonResult GetActivateScannerArrayData(int id, int areaId = 0, string side = "DEFAULT")
{
  try
  {
    SqlParameter[] parameters = new SqlParameter[]{
      new SqlParameter("@Id", SqlDbType.Int){Value = id},
      new SqlParameter("@AreaID", SqlDbType.Int){Value = areaId},
      new SqlParameter("@Side", SqlDbType.NVarChar){Value = side}
    };

    // Query with remapping logic
    var data = db.Database.SqlQuery<...>(
      $@"SELECT
           IDX.AutoID,
           CN.PartNumber,
           IDX.MasterID,
           IDX.PositionID,
           ISNULL(REMAP.RemappedIndex, IDX.ToIndex) AS ToIndex,
           IDX.Row,
           IDX.Col
         FROM Part_Operation_Serialization_Array_Index IDX
         INNER JOIN CS_idt_partnumbers CN ON IDX.PartID = CN.PartID
         LEFT JOIN Part_Operation_Serialization_Array_Index_Remap REMAP
           ON IDX.PartID = REMAP.PartID
           AND REMAP.AreaID = @AreaID
           AND REMAP.Side = @Side
           AND IDX.ToIndex = REMAP.OriginalIndex
         WHERE IDX.PartID = @Id
         ORDER BY ISNULL(REMAP.RemappedIndex, IDX.ToIndex)", parameters).ToList();

    return Json(new { success = true, data = data }, JsonRequestBehavior.AllowGet);
  }
  catch (Exception ex)
  {
    return Json(new { success = false, error = ex.Message }, JsonRequestBehavior.AllowGet);
  }
}
```

**Key Logic:** `ISNULL(REMAP.RemappedIndex, IDX.ToIndex)` - Use remapped index if exists, otherwise use original.

### 3.2 No Changes to Existing Add Methods

✅ **Advantage:** No changes needed to `AddActivateScannerList` or `AddActivateScannerArrayList`!

### 3.3 NEW Remapping Methods (add after line 3150)

```csharp
/// <summary>
/// Get remapping configuration for specific AreaID/Side
/// </summary>
[AcceptVerbs(HttpVerbs.Get | HttpVerbs.Post)]
public JsonResult GetSerializationRemap(int partId, int areaId, string side)
{
  try
  {
    SqlParameter[] parameters = new SqlParameter[]{
      new SqlParameter("@PartID", SqlDbType.Int){Value = partId},
      new SqlParameter("@AreaID", SqlDbType.Int){Value = areaId},
      new SqlParameter("@Side", SqlDbType.NVarChar){Value = side}
    };

    var remaps = db.Database.SqlQuery<tbl_Part_Operation_Serialization_Array_Index_Remap_FULL>(
      $@"SELECT
           R.AutoID, R.PartID, R.AreaID, R.Side,
           R.OriginalIndex, R.RemappedIndex,
           CN.PartNumber,
           PA.Area AS AreaName
         FROM Part_Operation_Serialization_Array_Index_Remap R
         INNER JOIN CS_idt_partnumbers CN ON R.PartID = CN.PartID
         LEFT JOIN PD_idt_areas PA ON R.AreaID = PA.AreaID
         WHERE R.PartID = @PartID AND R.AreaID = @AreaID AND R.Side = @Side
         ORDER BY R.OriginalIndex", parameters).ToList();

    return Json(new { success = true, data = remaps }, JsonRequestBehavior.AllowGet);
  }
  catch (Exception ex)
  {
    return Json(new { success = false, error = ex.Message }, JsonRequestBehavior.AllowGet);
  }
}

/// <summary>
/// Save complete remapping for AreaID/Side (replaces existing)
/// </summary>
[AcceptVerbs(HttpVerbs.Post)]
public JsonResult SaveSerializationRemap(int partId, int areaId, string side, List<RemapItem> remaps)
{
  try
  {
    // Delete existing remaps for this combination
    SqlParameter[] deleteParams = new SqlParameter[]{
      new SqlParameter("@PartID", SqlDbType.Int){Value = partId},
      new SqlParameter("@AreaID", SqlDbType.Int){Value = areaId},
      new SqlParameter("@Side", SqlDbType.NVarChar){Value = side}
    };

    db.Database.ExecuteSqlCommand(
      @"DELETE FROM Part_Operation_Serialization_Array_Index_Remap
        WHERE PartID = @PartID AND AreaID = @AreaID AND Side = @Side", deleteParams);

    // Insert new remaps
    foreach (var remap in remaps)
    {
      SqlParameter[] insertParams = new SqlParameter[]{
        new SqlParameter("@PartID", SqlDbType.Int){Value = partId},
        new SqlParameter("@AreaID", SqlDbType.Int){Value = areaId},
        new SqlParameter("@Side", SqlDbType.NVarChar){Value = side},
        new SqlParameter("@OriginalIndex", SqlDbType.Int){Value = remap.OriginalIndex},
        new SqlParameter("@RemappedIndex", SqlDbType.Int){Value = remap.RemappedIndex}
      };

      db.Database.ExecuteSqlCommand(
        @"INSERT INTO Part_Operation_Serialization_Array_Index_Remap
          (PartID, AreaID, Side, OriginalIndex, RemappedIndex)
          VALUES (@PartID, @AreaID, @Side, @OriginalIndex, @RemappedIndex)", insertParams);
    }

    return Json(new { success = true, message = "Remapping saved successfully" });
  }
  catch (Exception ex)
  {
    return Json(new { success = false, error = ex.Message });
  }
}

/// <summary>
/// Delete remapping for specific AreaID/Side
/// </summary>
[AcceptVerbs(HttpVerbs.Post)]
public JsonResult DeleteSerializationRemap(int partId, int areaId, string side)
{
  try
  {
    SqlParameter[] parameters = new SqlParameter[]{
      new SqlParameter("@PartID", SqlDbType.Int){Value = partId},
      new SqlParameter("@AreaID", SqlDbType.Int){Value = areaId},
      new SqlParameter("@Side", SqlDbType.NVarChar){Value = side}
    };

    db.Database.ExecuteSqlCommand(
      @"DELETE FROM Part_Operation_Serialization_Array_Index_Remap
        WHERE PartID = @PartID AND AreaID = @AreaID AND Side = @Side", parameters);

    return Json(new { success = true, message = "Remapping deleted successfully" });
  }
  catch (Exception ex)
  {
    return Json(new { success = false, error = ex.Message });
  }
}

/// <summary>
/// Get list of all area/side combinations that have remappings
/// </summary>
[AcceptVerbs(HttpVerbs.Get | HttpVerbs.Post)]
public JsonResult GetSerializationRemapList(int partId)
{
  try
  {
    SqlParameter[] parameters = new SqlParameter[]{
      new SqlParameter("@PartID", SqlDbType.Int){Value = partId}
    };

    var list = db.Database.SqlQuery<dynamic>(
      $@"SELECT DISTINCT
           R.AreaID,
           R.Side,
           PA.Area AS AreaName,
           COUNT(*) AS RemapCount
         FROM Part_Operation_Serialization_Array_Index_Remap R
         LEFT JOIN PD_idt_areas PA ON R.AreaID = PA.AreaID
         WHERE R.PartID = @PartID
         GROUP BY R.AreaID, R.Side, PA.Area
         ORDER BY R.AreaID, R.Side", parameters).ToList();

    return Json(new { success = true, data = list }, JsonRequestBehavior.AllowGet);
  }
  catch (Exception ex)
  {
    return Json(new { success = false, error = ex.Message }, JsonRequestBehavior.AllowGet);
  }
}

// Helper class for remapping
public class RemapItem
{
  public int OriginalIndex { get; set; }
  public int RemappedIndex { get; set; }
}
```

## Phase 4: UI/View Changes

**File:** `S:\01_Repos\BeFirst_Portal\firstronic\Areas\Engineering\Views\PartNumber\_CreateOrUpdate.cshtml`

### 4.1 Add Remapping Manager UI (insert after scanner array section, around line 4900)

**Components:**
- Section: "Area/Side Specific Serialization Order Remapping"
- Area selector dropdown (from PD_idt_areas)
- Side selector (A, B, DEFAULT)
- Button: "Load Remapping" or "Create New Remapping"
- Remapping grid display:
  - Column 1: Original Index (from base configuration)
  - Column 2: Remapped Index (editable dropdown or input)
  - Row = Position ID + MasterID from base config
- Buttons: "Save Remapping", "Delete Remapping", "Reset to Default"
- List of existing remappings (AreaID + Side combinations)

### 4.2 Add JavaScript (insert after existing scanner array JavaScript)

**Functions:**

```javascript
// Remapping Management Variables
var currentRemapAreaID = 0;
var currentRemapSide = "A";
var baseConfiguration = [];  // Original configuration
var currentRemapping = [];   // Current remap values

// Load existing remappings list
function loadRemappingsList() {
  var partId = $("#txtPartID").val();

  $.ajax({
    type: "POST",
    url: "/Engineering/PartNumber/GetSerializationRemapList",
    data: JSON.stringify({ partId: partId }),
    contentType: "application/json; charset=utf-8",
    success: function(response) {
      if (response.success) {
        updateRemappingsDropdown(response.data);
      }
    }
  });
}

// Load remapping for specific AreaID/Side
function loadRemappingConfig(areaId, side) {
  var partId = $("#txtPartID").val();

  // First, get base configuration
  $.ajax({
    type: "POST",
    url: "/Engineering/PartNumber/GetActivateScannerArrayData",
    data: JSON.stringify({ id: partId, areaId: 0, side: "DEFAULT" }),
    contentType: "application/json; charset=utf-8",
    success: function(baseResponse) {
      if (baseResponse.success) {
        baseConfiguration = baseResponse.data;

        // Then get existing remapping (if any)
        $.ajax({
          type: "POST",
          url: "/Engineering/PartNumber/GetSerializationRemap",
          data: JSON.stringify({ partId: partId, areaId: areaId, side: side }),
          contentType: "application/json; charset=utf-8",
          success: function(remapResponse) {
            if (remapResponse.success) {
              currentRemapping = remapResponse.data;
              displayRemappingGrid();
            }
          }
        });
      }
    }
  });
}

// Display remapping grid
function displayRemappingGrid() {
  var gridHtml = '<table class="remap-grid">';
  gridHtml += '<thead><tr>';
  gridHtml += '<th>Row</th><th>Col</th><th>Scanner</th><th>Position</th>';
  gridHtml += '<th>Original Index</th><th>Remapped Index</th>';
  gridHtml += '</tr></thead><tbody>';

  baseConfiguration.forEach(function(item) {
    var remap = currentRemapping.find(r => r.OriginalIndex === item.ToIndex);
    var remappedValue = remap ? remap.RemappedIndex : item.ToIndex;

    gridHtml += '<tr>';
    gridHtml += '<td>' + item.Row + '</td>';
    gridHtml += '<td>' + item.Col + '</td>';
    gridHtml += '<td>' + item.MasterID + '</td>';
    gridHtml += '<td>' + item.PositionID + '</td>';
    gridHtml += '<td class="original-index">' + item.ToIndex + '</td>';
    gridHtml += '<td><input type="number" class="remapped-index" data-original="' + item.ToIndex + '" value="' + remappedValue + '" min="1" /></td>';
    gridHtml += '</tr>';
  });

  gridHtml += '</tbody></table>';
  $('#remappingContainer').html(gridHtml);
}

// Save remapping
$("#btnSaveRemapping").click(function(e) {
  e.preventDefault();

  var partId = parseInt($("#txtPartID").val());
  var areaId = parseInt($("#ddlRemapArea").val());
  var side = $("#ddlRemapSide").val();

  // Collect remapping data
  var remaps = [];
  $(".remapped-index").each(function() {
    var originalIndex = parseInt($(this).data("original"));
    var remappedIndex = parseInt($(this).val());

    // Only include if different from original
    if (remappedIndex !== originalIndex) {
      remaps.push({
        OriginalIndex: originalIndex,
        RemappedIndex: remappedIndex
      });
    }
  });

  if (remaps.length === 0) {
    alert("No changes detected. All indexes match original order.");
    return;
  }

  $.ajax({
    type: "POST",
    url: "/Engineering/PartNumber/SaveSerializationRemap",
    data: JSON.stringify({
      partId: partId,
      areaId: areaId,
      side: side,
      remaps: remaps
    }),
    contentType: "application/json; charset=utf-8",
    success: function(response) {
      if (response.success) {
        alert("Remapping saved successfully!");
        loadRemappingsList();
      } else {
        alert("Error: " + response.error);
      }
    }
  });
});

// Delete remapping
$("#btnDeleteRemapping").click(function(e) {
  e.preventDefault();

  if (!confirm("Delete this remapping? The area/side will use the default order.")) {
    return;
  }

  var partId = parseInt($("#txtPartID").val());
  var areaId = parseInt($("#ddlRemapArea").val());
  var side = $("#ddlRemapSide").val();

  $.ajax({
    type: "POST",
    url: "/Engineering/PartNumber/DeleteSerializationRemap",
    data: JSON.stringify({ partId: partId, areaId: areaId, side: side }),
    contentType: "application/json; charset=utf-8",
    success: function(response) {
      if (response.success) {
        alert("Remapping deleted successfully!");
        loadRemappingsList();
        $("#remappingContainer").html("");
      } else {
        alert("Error: " + response.error);
      }
    }
  });
});
```

**Key Features:**
- Side-by-side display: Original Index → Remapped Index
- Editable inputs for remapped values
- Only saves differences (no need to save 1→1 mappings)
- Visual validation (no duplicates, no gaps)
- Reset to default option

## Phase 5: Service Layer Integration

**File:** `S:\01_Repos\BeFirst_Production\BeFirst\Produccion\frm_MergeLabels_MergeKeyence_Positions.vb`

### Update loadEmptyTable() method (line 396)

Update query to apply remapping:

```vb
Public Sub loadEmptyTable()
    ExData.ChildsSerials.Clear()

    ' Query base configuration with optional remapping
    Dim query As String = "
        SELECT
            IDX.AutoID,
            IDX.PartID,
            IDX.MasterID,
            IDX.PositionID,
            ISNULL(REMAP.RemappedIndex, IDX.ToIndex) AS ToIndex,
            '' AS SSN,
            IDX.Col,
            IDX.Row
        FROM [Part_Operation_Serialization_Array_Index] IDX
        LEFT JOIN [Part_Operation_Serialization_Array_Index_Remap] REMAP
            ON IDX.PartID = REMAP.PartID
            AND REMAP.AreaID = " & ExData.Selected_Area.AreaID & "
            AND REMAP.Side = '" & ExData.Side & "'
            AND IDX.ToIndex = REMAP.OriginalIndex
        WHERE IDX.PartID = " & ExData.Selected_Area.Selected_Casilla.PartID & "
        ORDER BY ISNULL(REMAP.RemappedIndex, IDX.ToIndex) ASC"

    dt_array = BeConn.GetDt(query)

    dgvlist.DataSource = dt_array

    ' (rest of method remains the same)
    dgvlist.Columns("AutoID").Visible = False
    dgvlist.Columns("PartID").Visible = False
    dgvlist.Columns("MasterID").Visible = False
    dgvlist.Columns("PositionID").Visible = False
    dgvlist.Columns("Col").Visible = False
    dgvlist.Columns("Row").Visible = False

    ' Get max col/row (same query pattern)
    Dim sizeQuery As String = "
        SELECT MAX(Col) as MaxCol, MAX(Row) as MaxRow
        FROM [Part_Operation_Serialization_Array_Index]
        WHERE PartID = " & ExData.Selected_Area.Selected_Casilla.PartID

    Dim dtSize As DataTable = BeConn.GetDt(sizeQuery)
    ' (rest remains the same)
End Sub
```

**Key Change:** `ISNULL(REMAP.RemappedIndex, IDX.ToIndex)` - If remapping exists for this AreaID/Side, use it; otherwise use original index.

### No Changes to Keyence Check

✅ **Advantage:** Keyence check remains unchanged - still just checks if base config exists!

## Phase 6: Testing Strategy

### Database Testing
```sql
-- Test 1: Verify new table created
SELECT * FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_NAME = 'Part_Operation_Serialization_Array_Index_Remap';

-- Test 2: Create test remapping
INSERT INTO Part_Operation_Serialization_Array_Index_Remap
(PartID, AreaID, Side, OriginalIndex, RemappedIndex)
VALUES
(12345, 5, 'A', 1, 1),  -- No change
(12345, 5, 'A', 2, 3),  -- Reorder
(12345, 5, 'A', 3, 2),  -- Reorder
(12345, 5, 'A', 4, 5),  -- Reorder
(12345, 5, 'A', 5, 4);  -- Reorder

-- Test 3: Query with remapping
SELECT
    IDX.ToIndex AS OriginalIndex,
    ISNULL(REMAP.RemappedIndex, IDX.ToIndex) AS EffectiveIndex
FROM Part_Operation_Serialization_Array_Index IDX
LEFT JOIN Part_Operation_Serialization_Array_Index_Remap REMAP
    ON IDX.PartID = REMAP.PartID
    AND REMAP.AreaID = 5
    AND REMAP.Side = 'A'
    AND IDX.ToIndex = REMAP.OriginalIndex
WHERE IDX.PartID = 12345
ORDER BY ISNULL(REMAP.RemappedIndex, IDX.ToIndex);

-- Expected: Orders by remapped values where they exist
```

### Portal Testing
- Load part with base config → should display original order
- Select AreaID + Side → click "Create Remapping"
- Modify remapped index values → save
- Reload remapping → should show saved values
- Load scanner array with AreaID/Side → should show remapped order
- Delete remapping → area/side returns to default order

### Service Testing
- Part with no remapping → uses default order
- Part with SMT remapping → service at SMT area uses remapped order
- Part with SMT remapping → service at different area uses default order
- Serial number processing → follows remapped ToIndex sequence
- Visual grid → positions appear in remapped order

### Regression Testing
- ✅ Existing parts → continue working (no remapping = original order)
- ✅ No changes to base configuration tables
- ✅ Services default to original order if no remapping exists

## Verification Steps

1. **Database Verification:**
   ```sql
   -- Verify remapping table exists
   SELECT * FROM INFORMATION_SCHEMA.TABLES
   WHERE TABLE_NAME = 'Part_Operation_Serialization_Array_Index_Remap';

   -- Verify indexes created
   SELECT * FROM sys.indexes
   WHERE object_id = OBJECT_ID('Part_Operation_Serialization_Array_Index_Remap');
   ```

2. **Portal Verification:**
   - Open Part Number configuration page
   - Remapping section should appear
   - Select AreaID + Side → Load base configuration
   - Modify remapped indexes → Save
   - Reload → Should show saved remapping

3. **Service Verification:**
   - Run production merge with part that has remapping
   - Verify remapped serialization order is used
   - Run with part without remapping → should use default order

## Migration Strategy

### Backward Compatibility
✅ **Zero Migration Required!**
- New table is created empty
- Existing configurations unchanged
- Services use `LEFT JOIN` so missing remapping = original order
- No impact on existing parts

### Deployment Sequence
1. **Database** (5 min) - Create new remapping table
2. **Portal** (10 min) - Deploy updated models, controllers, views
3. **Service** (15 min) - Deploy updated query logic
4. **Validation** (10 min) - Test remapping functionality

**Total Deployment Time:** ~40 minutes (20 minutes faster than previous approach!)

**Rollback Plan:**
- Drop remapping table (if needed)
- Redeploy previous Portal/Service versions
- No data loss since base tables unchanged

## Critical Files Summary

### Database (NEW)
- `S:\01_Repos\BeFirst_Database_MES_Database\MES\dbo\Tables\Part_Operation_Serialization_Array_Index_Remap.sql` (**NEW TABLE**)

### Portal (UPDATES)
- `S:\01_Repos\BeFirst_Portal\firstronic\Areas\Engineering\Models\PartNumber.cs` (add new entity class after line 2473)
- `S:\01_Repos\BeFirst_Portal\firstronic\Areas\Engineering\Controllers\PartNumberController.cs`:
  - Update `GetActivateScannerArrayData` (line 2960)
  - Add `GetSerializationRemap`, `SaveSerializationRemap`, `DeleteSerializationRemap`, `GetSerializationRemapList` (after line 3150)
- `S:\01_Repos\BeFirst_Portal\firstronic\Areas\Engineering\Views\PartNumber\_CreateOrUpdate.cshtml`:
  - Add remapping UI section (after line 4900)
  - Add remapping JavaScript (after existing scanner array JS)

### Service (UPDATES)
- `S:\01_Repos\BeFirst_Production\BeFirst\Produccion\frm_MergeLabels_MergeKeyence_Positions.vb` (line 396 - update query)

### No Changes Required
✅ Existing base configuration tables
✅ Existing entity classes (except new one)
✅ Existing Add/Delete methods
✅ Keyence configuration check

## Documentation Updates

- `S:\01_Repos\BeFirst_Docs\docs\04_DATABASE.md` - Add remapping table documentation
- `S:\01_Repos\BeFirst_Docs\deliverables\manuals\IT-013-part-number-configuration.md` - Add remapping section
- Create user guide: `USR-ENG-002-serialization-order-remapping.md`

## Benefits of Remapping Approach

1. **Non-Invasive:** No changes to existing tables - zero migration risk
2. **Simple Logic:** Base configuration + optional transformation layer
3. **Backward Compatible:** Parts without remapping use original order automatically
4. **Minimal Code Changes:** Only update queries with LEFT JOIN, no CRUD method changes
5. **Easy to Understand:** "Original index 4 becomes index 5 in SMT" is intuitive
6. **Performance:** Single LEFT JOIN vs complex fallback queries
7. **Storage Efficient:** Only store differences, not full duplicate configurations
8. **Flexible:** Support any area/side combination without structural changes
9. **Service Integration:** Services automatically apply remapping based on current area/side
10. **Rollback Safe:** Can drop remapping table without affecting base system

## Comparison: Remapping vs Full Duplication

| Aspect | Remapping Approach ✅ | Full Duplication ❌ |
|--------|---------------------|-------------------|
| **Migration** | None required | All existing records need AreaID/Side |
| **Storage** | Only differences stored | Full config per area/side |
| **Code Changes** | Minimal (add LEFT JOIN) | Extensive (all CRUD methods) |
| **Deployment Risk** | Low (new table only) | High (schema changes) |
| **Rollback** | Easy (drop table) | Difficult (restore backup) |
| **Understanding** | Intuitive (1→1, 2→3 mapping) | Complex (fallback logic) |
| **Performance** | Single LEFT JOIN | CTE with 3 UNIONs |
| **Maintenance** | Update remapping only | Update multiple configs |
