import { test } from '@playwright/test';
import { WritingTestsPage } from './pages/writing-tests.page';
import {
  andCloseBrowser,
  givenOnPlaywrightHomePage,
  givenViewingWritingTests,
  thenAccessibleRoleLinkExampleIsDisplayed,
  thenActionsGuidanceIsDisplayed,
  thenAsyncAssertionGuidanceIsDisplayed,
  thenPageTitleAndLinkExamplesAreDisplayed,
  thenPageTitleAssertionExampleIsDisplayed,
  thenTestIsolationGuidanceIsDisplayed,
  thenWritingTestsPageIsDisplayed,
  whenOpenDocsAndWritingTests,
  whenReadSection,
} from './step-definitions/ui/writing-tests-ui.steps';

test('navigate from Docs to Writing tests', async ({ page }) => {
  const writingTests = new WritingTestsPage(page);

  await givenOnPlaywrightHomePage(writingTests);
  await whenOpenDocsAndWritingTests(writingTests);
  await thenWritingTestsPageIsDisplayed(page, writingTests);
  await andCloseBrowser(page, writingTests);
});

test('review the first test example', async ({ page }) => {
  const writingTests = new WritingTestsPage(page);

  await givenViewingWritingTests(writingTests);
  await whenReadSection(writingTests, 'First test');
  await thenPageTitleAndLinkExamplesAreDisplayed(writingTests);
  await andCloseBrowser(page, writingTests);
});

test('review the actions guidance', async ({ page }) => {
  const writingTests = new WritingTestsPage(page);

  await givenViewingWritingTests(writingTests);
  await whenReadSection(writingTests, 'Actions');
  await thenActionsGuidanceIsDisplayed(writingTests);
  await thenAccessibleRoleLinkExampleIsDisplayed(writingTests);
  await andCloseBrowser(page, writingTests);
});

test('review assertions and test isolation', async ({ page }) => {
  const writingTests = new WritingTestsPage(page);

  await givenViewingWritingTests(writingTests);
  await whenReadSection(writingTests, 'Assertions');
  await thenAsyncAssertionGuidanceIsDisplayed(writingTests);
  await thenPageTitleAssertionExampleIsDisplayed(writingTests);
  await thenTestIsolationGuidanceIsDisplayed(writingTests);
  await andCloseBrowser(page, writingTests);
});
