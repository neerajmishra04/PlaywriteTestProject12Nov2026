import { test, expect } from '@playwright/test';
import { WritingTestsPage } from './pages/writing-tests.page';

test('navigate from Docs to Writing tests', async ({ page }) => {
  const writingTests = new WritingTestsPage(page);

  await test.step('Given I am on the Playwright home page', async () => {
    await writingTests.openHomePage();
  });

  await test.step('When I open Docs and select Writing tests from the sidebar', async () => {
    await writingTests.openDocs();
    await writingTests.openWritingTestsFromSidebar();
  });

  await test.step('Then the Writing tests documentation page is displayed', async () => {
    await expect(page).toHaveURL(/\/docs\/writing-tests$/);
    await expect(writingTests.heading('Writing tests')).toBeVisible();
  });

  await test.step('And I close the browser', async () => {
    await writingTests.closeBrowser();
    expect(page.isClosed()).toBe(true);
  });
});

test('review the first test example', async ({ page }) => {
  const writingTests = new WritingTestsPage(page);

  await test.step('Given I am viewing the Writing tests documentation', async () => {
    await writingTests.openFromHomePage();
  });

  await test.step('When I read the First test section', async () => {
    await expect(writingTests.heading('First test')).toBeVisible();
  });

  await test.step('Then I see an example that checks the page title and a link', async () => {
    await expect(writingTests.codeExample("test('has title'")).toBeVisible();
    await expect(writingTests.codeExample("test('get started link'")).toBeVisible();
  });

  await test.step('And I close the browser', async () => {
    await writingTests.closeBrowser();
    expect(page.isClosed()).toBe(true);
  });
});

test('review the actions guidance', async ({ page }) => {
  const writingTests = new WritingTestsPage(page);

  await test.step('Given I am viewing the Writing tests documentation', async () => {
    await writingTests.openFromHomePage();
  });

  await test.step('When I read the Actions section', async () => {
    await expect(writingTests.heading('Actions')).toBeVisible();
  });

  await test.step('Then I see guidance for navigation, interactions, and basic actions', async () => {
    await expect(writingTests.heading('Navigation')).toBeVisible();
    await expect(writingTests.heading('Interactions')).toBeVisible();
    await expect(writingTests.heading('Basic actions')).toBeVisible();
  });

  await test.step('And I see an example that locates a link by its accessible role', async () => {
    await expect(
      writingTests.codeExample("page.getByRole('link', { name: 'Get started' })"),
    ).toBeVisible();
  });

  await test.step('And I close the browser', async () => {
    await writingTests.closeBrowser();
    expect(page.isClosed()).toBe(true);
  });
});

test('review assertions and test isolation', async ({ page }) => {
  const writingTests = new WritingTestsPage(page);

  await test.step('Given I am viewing the Writing tests documentation', async () => {
    await writingTests.openFromHomePage();
  });

  await test.step('When I read the Assertions section', async () => {
    await expect(writingTests.heading('Assertions')).toBeVisible();
  });

  await test.step('Then I see that async assertions wait for expected conditions', async () => {
    await expect(writingTests.text(/async matchers that wait until the expected condition is met/i))
      .toBeVisible();
  });

  await test.step('And I see an example of a page title assertion', async () => {
    await expect(writingTests.codeExample('toHaveTitle(/Playwright/)')).toBeVisible();
  });

  await test.step('And I see the Test Isolation guidance', async () => {
    await expect(writingTests.heading('Test Isolation')).toBeVisible();
  });

  await test.step('And I close the browser', async () => {
    await writingTests.closeBrowser();
    expect(page.isClosed()).toBe(true);
  });
});
