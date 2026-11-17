import type { Locator, Page } from '@playwright/test';
import { clickLinkByName } from '../support/ui-actions';

export class WritingTestsPage {
  readonly article: Locator;

  constructor(private readonly page: Page) {
    this.article = page.locator('article');
  }

  async openHomePage(): Promise<void> {
    await this.page.goto('https://playwright.dev/');
  }

  async openDocs(): Promise<void> {
    await clickLinkByName(this.page, 'Docs');
  }

  async openWritingTestsFromSidebar(): Promise<void> {
    await clickLinkByName(this.page, 'Writing tests');
  }

  async openFromHomePage(): Promise<void> {
    await this.openHomePage();
    await this.openDocs();
    await this.openWritingTestsFromSidebar();
  }

  async closeBrowser(): Promise<void> {
    await this.page.close();
  }

  heading(name: string): Locator {
    return this.article.getByRole('heading', { name }).first();
  }

  text(content: RegExp | string): Locator {
    return this.article.getByText(content);
  }

  codeExample(content: string): Locator {
    return this.article.locator('pre').filter({ hasText: content }).first();
  }
}
