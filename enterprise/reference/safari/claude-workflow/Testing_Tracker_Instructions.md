# Fourth Shift 8.0E Testing Tracker - User Guide

## Overview
This comprehensive testing tracker has been created to manage and monitor the Fourth Shift 8.0E upgrade testing process. It consolidates all modules, functions, and testing requirements into a single, organized workbook with three integrated worksheets.

## Workbook Structure

### 1. Testing Checklist Tab
**Purpose:** Main testing tracking sheet containing all modules and functions to be tested.

**Columns:**
- **Module:** The Fourth Shift module category
- **Menu Code:** The specific Fourth Shift menu code (e.g., ITMB, COMT, POMT)
- **Function:** Short description of the function
- **Description:** Detailed description of what needs to be tested
- **Assigned To:** Email addresses of personnel responsible for testing
- **Status:** Current testing status (dropdown options: Not Started, In Progress, Completed, Blocked)
- **Test Date:** Date when testing was performed
- **Tested By:** Name of person who performed the test
- **Pass/Fail:** Test result (dropdown options: Pass, Fail, Partial Pass)
- **Notes:** Any additional comments, issues found, or observations

**How to Use:**
1. Review your assigned items (filter by your email in "Assigned To" column)
2. Update Status to "In Progress" when starting a test
3. Enter the Test Date and your name in Tested By
4. Mark Pass/Fail based on test results
5. Add any relevant notes about issues or observations
6. Update Status to "Completed" when done

### 2. Issue Tracking Tab
**Purpose:** Log and track all issues discovered during testing.

**Columns:**
- **Issue #:** Sequential issue number
- **Date Reported:** Date issue was discovered
- **Reporter:** Email of person who found the issue
- **Module:** Related Fourth Shift module
- **Menu Code:** Specific menu code where issue occurred
- **Function:** Function being tested
- **Severity:** Issue priority (Critical, High, Medium, Low)
- **Issue Description:** Detailed description of the problem
- **Steps to Reproduce:** How to recreate the issue
- **Status:** Current status (Open, In Progress, Closed, Deferred)
- **Assigned To:** Person responsible for resolution
- **Resolution Date:** Date issue was resolved
- **Resolution Notes:** How the issue was resolved

**How to Log Issues:**
1. Add a new row for each issue discovered
2. Fill in all relevant information
3. Be specific in the description and reproduction steps
4. Assign appropriate severity:
   - **Critical:** System unusable, data corruption, security breach
   - **High:** Major function not working, significant workaround needed
   - **Medium:** Function works with minor issues, acceptable workaround exists
   - **Low:** Cosmetic issues, minor inconveniences

### 3. Summary Dashboard Tab
**Purpose:** Executive overview of testing progress and issue status.

**Sections:**
1. **Testing Progress by Module**
   - Shows completion percentage for each module
   - Automatically updates from Testing Checklist data
   - Tracks Not Started, In Progress, and Completed items

2. **Issue Summary**
   - Categorizes issues by severity
   - Shows Open vs Closed issues
   - Automatically updates from Issue Tracking data

## Testing Process

### Pre-Testing Setup
1. Ensure you have access to the Fourth Shift test environment
2. Review your assigned modules in the Testing Checklist
3. Coordinate with other testers to avoid conflicts
4. Have test data ready (sample customers, items, orders, etc.)

### Testing Execution
1. **Start with basic transactions:** Enter/modify items, process orders
2. **Test workflows end-to-end:** Follow complete business processes
3. **Verify reports:** Ensure all reports generate correctly
4. **Test integrations:** Check connections with add-on modules
5. **Document everything:** Record all test results and issues

### Key Testing Areas

#### Inventory Module
- Item master maintenance
- Bill of materials
- Lot tracing for raw materials and finished goods
- Physical inventory processes
- Cycle counts with reason codes

#### Order Processing
- Customer order entry and modifications
- Order actions (COAN)
- Pricing and customer item maintenance
- Pick, pack, and ship processes

#### Purchasing
- Purchase order creation with GL restrictions
- Vendor maintenance
- PO receipts and WIP reporting
- Contract management

#### Manufacturing
- Manufacturing order processing
- Pick lists and receipts
- WIP reporting
- Bill summarization

#### Financial Modules
- AP payment processing and aging
- AR invoice and payment application
- GL batch processing
- Month-end procedures
- Cost rolling processes

#### Add-On Systems
- Visibar/Visiwatch transactions
- EDI interfaces
- Shipping integrations (UPS/FedEx)
- Custom reports and applications

## Best Practices

1. **Test in logical sequences:** Follow normal business workflows
2. **Use realistic data:** Test with actual business scenarios
3. **Verify integrations:** Check that data flows correctly between modules
4. **Test user permissions:** Ensure security settings work properly
5. **Document thoroughly:** Provide enough detail for issues to be reproduced
6. **Communicate regularly:** Update status daily and escalate blockers

## Assigned Owner Reference

Based on the consolidated testing plan, primary owners are:

- **Customer Service/Sales:** jmrowell@safaricircuits.com, smbornamann@safaricircuits.com
- **Engineering:** bpwaligora@safaricircuits.com, apmorrissey@safaricircuits.com
- **Finance:** tljohnson@safaricircuits.com
- **Inventory:** arash@safaricircuits.com, dkmcintyre@safaricircuits.com
- **Purchasing:** dsfitzpatrick@safaricircuits.com, gafranckowiak@safaricircuits.com
- **Manufacturing:** crkunze@safaricircuits.com, panickrent@safaricircuits.com
- **Shipping:** jnshreve@safaricircuits.com, Rlsmith@safaricircuits.com
- **IT/Add-Ons:** IT Team

## Important Notes

- **FS GUI/Workplace Testing:** If using Fourth Shift GUI or Workplace, test transactions as users would normally use the system
- **Night Processing:** Coordinate testing of batch/night processes with IT
- **Month-End:** Special attention needed for month-end closing procedures
- **Custom Reports:** Validate all custom reports work as expected post-upgrade

## Support

For questions or issues with:
- Testing process: Contact your module owner
- System access: Contact IT support
- Test data: Coordinate with your team lead
- Tracker updates: Save regularly and use version control

Remember: Thorough testing now prevents production issues later. Take your time and test comprehensively.
