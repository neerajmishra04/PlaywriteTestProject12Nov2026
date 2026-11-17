import type { APIRequestContext } from '@playwright/test';
import { expect, test } from '@playwright/test';

export const WRITING_TESTS_PAGE_URL = 'https://playwright.dev/docs/writing-tests';

export interface WritingTestsPageApiResponse {
  readonly status: number;
  readonly url: string;
  readonly html: string;
}

export async function givenWritingTestsPageUrl(): Promise<string> {
  return test.step('Given the Writing tests documentation endpoint', async () => {
    return WRITING_TESTS_PAGE_URL;
  });
}

export async function whenRequestWritingTestsPage(
  request: APIRequestContext,
  url: string,
): Promise<WritingTestsPageApiResponse> {
  return test.step('When I send a GET request to the documentation endpoint', async () => {
    const response = await request.get(url);
    return {
      status: response.status(),
      url: response.url(),
      html: await response.text(),
    };
  });
}

export async function thenResponseIsSuccessful(
  response: WritingTestsPageApiResponse,
): Promise<void> {
  await test.step('Then the endpoint returns HTTP 200', async () => {
    expect(response.status).toBe(200);
  });
}

export async function thenResponseUsesExpectedUrl(
  response: WritingTestsPageApiResponse,
): Promise<void> {
  await test.step('Then the response URL is the Writing tests page', async () => {
    expect(response.url).toBe(WRITING_TESTS_PAGE_URL);
  });
}

export async function thenResponseContains(
  response: WritingTestsPageApiResponse,
  expectedContent: string,
  stepDescription: string,
): Promise<void> {
  await test.step(stepDescription, async () => {
    expect(response.html).toContain(expectedContent);
  });
}
