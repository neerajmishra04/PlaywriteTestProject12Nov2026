PLAYWRIGHT WRITING TESTS - MANUAL TEST CASES AND AUTOMATION TRACEABILITY
=======================================================================

Purpose
-------
This document defines manual test cases for the Playwright "Writing tests"
documentation page and maps them to the feature scenarios and Playwright
automation. These cases are derived from the scope currently implemented in
the repository; they are not a claim of formal product requirements supplied
by an external requirements-management system.

Application under test: https://playwright.dev/
Target page:            https://playwright.dev/docs/writing-tests
Feature source:         tests/features/writing-tests.feature
UI automated tests:     tests/writing-tests.spec.ts
API automated tests:    tests/writing-tests.api.spec.ts
Page object:            tests/pages/writing-tests.page.ts
Shared UI helper:       tests/support/ui-actions.ts
UI step definitions:    tests/step-definitions/ui/writing-tests-ui.steps.ts
API step definitions:   tests/step-definitions/api/writing-tests-api.steps.ts
Manual test steps:      tests/manual-steps/writing-tests.manual.md

Requirement IDs
---------------
The REQ-WT identifiers below are local traceability IDs introduced for this
test document. They are derived from the feature scenarios and assertions.

REQ-WT-001  A user can navigate from the Playwright home page through Docs
            and the documentation sidebar to the Writing tests page.
REQ-WT-002  The Writing tests page presents the First test section with
            examples for checking the page title and a link.
REQ-WT-003  The Actions section presents Navigation, Interactions, and Basic
            actions guidance, including an accessible-role link locator
            example.
REQ-WT-004  The Assertions section explains waiting async assertions, shows a
            page-title assertion example, and includes Test Isolation guidance.

MANUAL TEST CASES
=================

TC-WT-001 - Navigate to the Writing tests documentation
Requirement: REQ-WT-001
Priority:    High
Precondition: A browser with internet access is available.

Steps:
  1. Navigate to https://playwright.dev/.
  2. Select the "Docs" link.
  3. Select "Writing tests" from the documentation sidebar.
  4. Check the current URL and the main page heading.

Expected result:
  The page URL ends with /docs/writing-tests and the article displays the
  "Writing tests" heading.

TC-WT-002 - Review the First test examples
Requirement: REQ-WT-002
Priority:    Medium
Precondition: TC-WT-001 navigation is completed.

Steps:
  1. Locate the "First test" section in the article.
  2. Inspect the examples in that section.
  3. Find an example named "has title".
  4. Find an example named "get started link".

Expected result:
  The First test section and both examples are visible. The examples
  demonstrate checking a page title and locating/clicking a link.

TC-WT-003 - Review the Actions guidance
Requirement: REQ-WT-003
Priority:    Medium
Precondition: TC-WT-001 navigation is completed.

Steps:
  1. Locate the "Actions" section.
  2. Verify that it contains the "Navigation", "Interactions", and
     "Basic actions" subsections.
  3. Inspect the link-locating code example.

Expected result:
  All three subsections are visible. The code example uses an accessible
  role locator for a link, such as
  page.getByRole('link', { name: 'Get started' }).

TC-WT-004 - Review Assertions and Test Isolation
Requirement: REQ-WT-004
Priority:    Medium
Precondition: TC-WT-001 navigation is completed.

Steps:
  1. Locate the "Assertions" section.
  2. Verify the guidance says async matchers wait for the expected condition.
  3. Find the page-title assertion example.
  4. Locate the "Test Isolation" guidance.

Expected result:
  The section explains waiting async assertions, contains an example using
  toHaveTitle(/Playwright/), and displays the Test Isolation heading.

STEP DEFINITION / AUTOMATION MAPPING
====================================
The Gherkin scenarios in tests/features/writing-tests.feature are the
human-readable scenario specification. The executable automation is currently
implemented with Playwright Test's test.step() blocks in
the UI step-definition module and invoked by tests/writing-tests.spec.ts.
There is no Cucumber/Gherkin runner or Cucumber binding in this project.

The API-level checks use Playwright's APIRequestContext to request the
documentation page and verify its HTTP status, final URL, and response HTML.
Their reusable Given/When/Then-style Playwright step helpers are in
tests/step-definitions/api/writing-tests-api.steps.ts, with scenarios in
tests/writing-tests.api.spec.ts. This checks the page's HTTP response; it does
not add a backend API to the Playwright documentation website.
The UI step helpers are in tests/step-definitions/ui/writing-tests-ui.steps.ts.
The standalone manual procedures are in
tests/manual-steps/writing-tests.manual.md.

Feature scenario: Navigate from Docs to Writing tests
  Given I am on the Playwright home page
    -> WritingTestsPage.openHomePage()
  When I open Docs and select Writing tests from the sidebar
    -> WritingTestsPage.openDocs()
    -> WritingTestsPage.openWritingTestsFromSidebar()
  Then the Writing tests documentation page is displayed
    -> Assert URL ends in /docs/writing-tests
    -> Assert WritingTestsPage.heading('Writing tests') is visible
  And I close the browser
    -> WritingTestsPage.closeBrowser()
    -> Assert page.isClosed() is true

Feature scenario: Review the first test example
  Given I am viewing the Writing tests documentation
    -> WritingTestsPage.openFromHomePage()
  When I read the First test section
    -> Assert WritingTestsPage.heading('First test') is visible
  Then I see an example that checks the page title and a link
    -> Assert codeExample("test('has title'") is visible
    -> Assert codeExample("test('get started link'") is visible
  And I close the browser
    -> closeBrowser(); assert page.isClosed()

Feature scenario: Review the actions guidance
  Given I am viewing the Writing tests documentation
    -> WritingTestsPage.openFromHomePage()
  When I read the Actions section
    -> Assert WritingTestsPage.heading('Actions') is visible
  Then I see guidance for navigation, interactions, and basic actions
    -> Assert headings Navigation, Interactions, and Basic actions are visible
  And I see an example that locates a link by its accessible role
    -> Assert codeExample("page.getByRole('link', { name: 'Get started' })")
       is visible
  And I close the browser
    -> closeBrowser(); assert page.isClosed()

Feature scenario: Review assertions and test isolation
  Given I am viewing the Writing tests documentation
    -> WritingTestsPage.openFromHomePage()
  When I read the Assertions section
    -> Assert WritingTestsPage.heading('Assertions') is visible
  Then I see that async assertions wait for expected conditions
    -> Assert the article contains the async matcher waiting guidance
  And I see an example of a page title assertion
    -> Assert codeExample('toHaveTitle(/Playwright/)') is visible
  And I see the Test Isolation guidance
    -> Assert WritingTestsPage.heading('Test Isolation') is visible
  And I close the browser
    -> closeBrowser(); assert page.isClosed()

PAGE OBJECT MODEL (POM)
=======================
The automation uses the Page Object Model to keep page-specific navigation
and locators out of the scenario assertions:

  WritingTestsPage
    - Stores the Playwright Page and scopes article content to the article
      locator.
    - openHomePage(), openDocs(), and
      openWritingTestsFromSidebar() perform navigation.
    - openFromHomePage() composes those navigation actions for scenarios
      that begin on the documentation page.
    - heading(), text(), and codeExample() expose reusable, article-scoped
      locators used by assertions.
    - closeBrowser() closes the scenario's page.

  clickLinkByName (tests/support/ui-actions.ts)
    - Shared UI action that finds a link by its exact accessible name and
      clicks it. The page object uses it for Docs and Writing tests navigation.

Each automated test receives an isolated Playwright Page fixture and creates
its own WritingTestsPage instance. Assertions remain in the test file, while
page navigation and selectors remain in the page object.

RUNNING THE AUTOMATED TESTS
==========================
From the repository root, run:

  npx playwright test

To run only the API-level checks:

  npx playwright test tests/writing-tests.api.spec.ts

The suite is configured for Chromium, Firefox, and WebKit. It exercises the
public Playwright documentation website and therefore requires network access.

ADDING A FILE, CREATING A PR, AND MERGING
=========================================
Use this workflow when adding a file or other change to the repository. Work
on a feature branch; do not commit directly to main.

1. Create or update the file
   Add the new file to the repository and review its contents. Check the
   working tree to confirm the intended files are the only changes:

     git status --short
     git diff --check

2. Create a feature branch
   Start from the latest main branch, then create and switch to a descriptive
   branch:

     git switch main
     git pull origin main
     git switch -c <branch-name>

   If the change is already on a feature branch, keep using that branch and
   make sure it is based on the latest main as appropriate.

3. Stage and commit the change
   Stage the intended file(s), inspect what is staged, and commit:

     git add <file-path>
     git diff --cached --check
     git diff --cached
     git commit -m "Describe the change"

   Use `git add -A` only when every change in the working tree is intended for
   this commit. Check `git status` after committing.

4. Push the branch to GitHub

     git push -u origin <branch-name>

5. Open a pull request
   On GitHub, open the repository's "Pull requests" tab and select "New pull
   request" (or use the compare page). Select `main` as the base branch and
   the feature branch as the compare/head branch. Review the changed-file list,
   enter a clear title and summary, then select "Create pull request".

6. Review the PR and check for conflicts
   Review the PR diff and confirm it contains only the intended changes.
   Check GitHub's merge/conflict status and required CI checks. Continue only
   when GitHub reports that the branch can be merged automatically and required
   checks have passed. If there are conflicts, do not merge: update the feature
   branch from `main`, resolve the conflicts, test the result, commit and push
   the resolution, then review the updated PR again.

7. Merge and verify
   When the review is complete, the PR is conflict-free, and required checks
   pass, use the repository's approved merge method on GitHub to merge the PR
   into `main`. Verify that the PR shows as merged and that `main` contains
   the resulting change. After confirming the merge succeeded, close the
   browser window or tab used for the PR.