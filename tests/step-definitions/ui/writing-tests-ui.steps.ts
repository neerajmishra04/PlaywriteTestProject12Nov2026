import { expect, test, type Page } from '@playwright/test';
import { WritingTestsPage } from '../../pages/writing-tests.page';

export async function givenOnPlaywrightHomePage(
  writingTests: WritingTestsPage,
): Promise<void> {
  await test.step('Given I am on the Playwright home page', async () => {
    await writingTests.openHomePage();
  });
}

export async function givenViewingWritingTests(
  writingTests: WritingTestsPage,
): Promise<void> {
  await test.step('Given I am viewing the Writing tests documentation', async () => {
    await writingTests.openFromHomePage();
  });
}

export async function whenOpenDocsAndWritingTests(
  writingTests: WritingTestsPage,
): Promise<void> {
  await test.step('When I open Docs and select Writing tests from the sidebar', async () => {
    await writingTests.openDocs();
    await writingTests.openWritingTestsFromSidebar();
  });
}

export async function thenWritingTestsPageIsDisplayed(
  page: Page,
  writingTests: WritingTestsPage,
): Promise<void> {
  await test.step('Then the Writing tests documentation page is displayed', async () => {
    await expect(page).toHaveURL(/\/docs\/writing-tests$/);
    await expect(writingTests.heading('Writing tests')).toBeVisible();
  });
}

export async function thenPageTitleAndLinkExamplesAreDisplayed(
  writingTests: WritingTestsPage,
): Promise<void> {
  await test.step('Then I see an example that checks the page title and a link', async () => {
    await expect(writingTests.codeExample("test('has title'")).toBeVisible();
    await expect(writingTests.codeExample("test('get started link'")).toBeVisible();
  });
}

export async function whenReadSection(
  writingTests: WritingTestsPage,
  section: string,
): Promise<void> {
  await test.step(`When I read the ${section} section`, async () => {
    await expect(writingTests.heading(section)).toBeVisible();
  });
}

export async function thenActionsGuidanceIsDisplayed(
  writingTests: WritingTestsPage,
): Promise<void> {
  await test.step('Then I see guidance for navigation, interactions, and basic actions', async () => {
    await expect(writingTests.heading('Navigation')).toBeVisible();
    await expect(writingTests.heading('Interactions')).toBeVisible();
    await expect(writingTests.heading('Basic actions')).toBeVisible();
  });
}

export async function thenAccessibleRoleLinkExampleIsDisplayed(
  writingTests: WritingTestsPage,
): Promise<void> {
  await test.step('And I see an example that locates a link by its accessible role', async () => {
    await expect(
      writingTests.codeExample("page.getByRole('link', { name: 'Get started' })"),
    ).toBeVisible();
  });
}

export async function thenAsyncAssertionGuidanceIsDisplayed(
  writingTests: WritingTestsPage,
): Promise<void> {
  await test.step('Then I see that async assertions wait for expected conditions', async () => {
    await expect(
      writingTests.text(/async matchers that wait until the expected condition is met/i),
    ).toBeVisible();
  });
}

export async function thenPageTitleAssertionExampleIsDisplayed(
  writingTests: WritingTestsPage,
): Promise<void> {
  await test.step('And I see an example of a page title assertion', async () => {
    await expect(writingTests.codeExample('toHaveTitle(/Playwright/)')).toBeVisible();
  });
}

export async function thenTestIsolationGuidanceIsDisplayed(
  writingTests: WritingTestsPage,
): Promise<void> {
  await test.step('And I see the Test Isolation guidance', async () => {
    await expect(writingTests.heading('Test Isolation')).toBeVisible();
  });
}

export async function andCloseBrowser(
  page: Page,
  writingTests: WritingTestsPage,
): Promise<void> {
  await test.step('And I close the browser', async () => {
    await writingTests.closeBrowser();
    expect(page.isClosed()).toBe(true);
  });
}
