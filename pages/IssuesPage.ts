import { Page, Locator, expect } from '@playwright/test';

export class IssuesPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly createTaskButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByRole('textbox', { name: 'Поиск' });
    this.createTaskButton = page.getByRole('button', { name: 'Создать задачу' }).first();
  }

  async open() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
    await expect(this.page.getByRole('heading', { name: 'Список задач' })).toBeVisible();
    const taskHeadings = this.page.getByRole('heading', { level: 6 });
    await expect(taskHeadings.first()).toBeVisible();
  }

  async openCreateTaskModal() {
    await this.createTaskButton.click();
  }

  taskCardByTitle(title: string): Locator {
    return this.page.getByRole('heading', { name: title, level: 6 }).locator('..');
  }

  async expectTaskVisible(title: string) {
    await expect(this.page.getByRole('heading', { name: title, level: 6 })).toBeVisible();
  }

  async expectTaskNotVisible(title: string) {
    await expect(this.page.getByRole('heading', { name: title, level: 6 })).not.toBeVisible();
  }

  async searchTask(title: string) {
    await this.searchInput.fill(title);
    await this.page.waitForTimeout(500);
  }

  async clearSearch() {
    await this.searchInput.clear();
    await this.page.waitForTimeout(500);
  }

  async openTaskCard(title: string) {
    const taskHeading = this.page.getByRole('heading', { name: title, level: 6 });
    await expect(taskHeading).toBeVisible();
    await taskHeading.click();
  }

  async expectTaskCardOpened(title: string) {
    await expect(this.page.getByText(title).first()).toBeVisible({ timeout: 5000 });
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }
}
