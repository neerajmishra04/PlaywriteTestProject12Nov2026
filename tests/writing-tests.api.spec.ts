import { test } from '@playwright/test';
import {
  givenWritingTestsPageUrl,
  thenResponseContains,
  thenResponseIsSuccessful,
  thenResponseUsesExpectedUrl,
  whenRequestWritingTestsPage,
} from './steps/writing-tests-api.steps';

test('TC-WT-001: API returns the Writing tests documentation page', async ({ request }) => {
  const url = await givenWritingTestsPageUrl();
  const response = await whenRequestWritingTestsPage(request, url);

  await thenResponseIsSuccessful(response);
  await thenResponseUsesExpectedUrl(response);
  await thenResponseContains(response, 'Writing tests', 'Then the page heading is present');
});

test('TC-WT-002: API response contains the First test examples', async ({ request }) => {
  const url = await givenWritingTestsPageUrl();
  const response = await whenRequestWritingTestsPage(request, url);

  await thenResponseIsSuccessful(response);
  await thenResponseContains(response, 'First test', 'Then the First test section is present');
  await thenResponseContains(response, 'has title', 'And the page-title example is present');
  await thenResponseContains(response, 'get started link', 'And the link example is present');
});

test('TC-WT-003: API response contains the Actions guidance', async ({ request }) => {
  const url = await givenWritingTestsPageUrl();
  const response = await whenRequestWritingTestsPage(request, url);

  await thenResponseIsSuccessful(response);
  await thenResponseContains(response, 'Navigation', 'Then the Navigation guidance is present');
  await thenResponseContains(response, 'Interactions', 'And the Interactions guidance is present');
  await thenResponseContains(response, 'Basic actions', 'And the Basic actions guidance is present');
  await thenResponseContains(response, 'getByRole', 'And the accessible-role locator example is present');
});

test('TC-WT-004: API response contains Assertions and Test Isolation guidance', async ({ request }) => {
  const url = await givenWritingTestsPageUrl();
  const response = await whenRequestWritingTestsPage(request, url);

  await thenResponseIsSuccessful(response);
  await thenResponseContains(response, 'Assertions', 'Then the Assertions section is present');
  await thenResponseContains(
    response,
    'async matchers that wait until the expected condition is met',
    'And waiting async assertion guidance is present',
  );
  await thenResponseContains(response, 'toHaveTitle', 'And the page-title assertion example is present');
  await thenResponseContains(response, 'Test Isolation', 'And Test Isolation guidance is present');
});
