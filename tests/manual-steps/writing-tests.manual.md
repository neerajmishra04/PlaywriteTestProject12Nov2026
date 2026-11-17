# Manual Test Steps: Writing Tests Documentation

**Application:** https://playwright.dev/
**Target page:** https://playwright.dev/docs/writing-tests
**Requirements:** REQ-WT-001 through REQ-WT-004
**Precondition:** A browser with internet access is available.

## TC-WT-001 — Navigate to the Writing tests documentation

1. Open `https://playwright.dev/`.
2. Select the **Docs** link.
3. Select **Writing tests** from the documentation sidebar.
4. Verify the URL ends with `/docs/writing-tests`.
5. Verify the page displays the **Writing tests** heading.

**Expected result:** The Writing tests documentation page loads successfully
and displays its heading.

## TC-WT-002 — Review the First test examples

1. Open the Writing tests documentation page.
2. Locate the **First test** section.
3. Verify it contains the **has title** example.
4. Verify it contains the **get started link** example.

**Expected result:** Both examples are present in the First test section and
demonstrate checking the page title and a link.

## TC-WT-003 — Review the Actions guidance

1. Open the Writing tests documentation page.
2. Locate the **Actions** section.
3. Verify the **Navigation**, **Interactions**, and **Basic actions**
   subsections are present.
4. Verify an example locates a link by its accessible role.

**Expected result:** The three subsections and an accessible-role link locator
example are present.

## TC-WT-004 — Review Assertions and Test Isolation

1. Open the Writing tests documentation page.
2. Locate the **Assertions** section.
3. Verify it explains that async matchers wait for expected conditions.
4. Verify it contains a page-title assertion using `toHaveTitle`.
5. Verify the **Test Isolation** guidance is present.

**Expected result:** The Assertions section describes waiting async
assertions, includes a `toHaveTitle` example, and includes Test Isolation
guidance.
