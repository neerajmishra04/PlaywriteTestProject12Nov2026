import type { Page } from '@playwright/test';

export async function clickLinkByName(page: Page, name: string): Promise<void> {
  await page.getByRole('link', { name, exact: true }).click();
}
