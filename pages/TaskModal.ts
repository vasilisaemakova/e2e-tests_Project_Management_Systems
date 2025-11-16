import { Page, Locator, expect } from '@playwright/test';

export class TaskModal {
  readonly page: Page;
  readonly titleInput: Locator;
  readonly descriptionInput: Locator;
  readonly projectSelect: Locator;
  readonly prioritySelect: Locator;
  readonly assigneeSelect: Locator;
  readonly createButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleInput = page.getByRole('textbox', { name: 'Название' });
    this.descriptionInput = page.getByRole('textbox', { name: 'Описание' });
    const modal = page.getByRole('heading', { name: 'Создание задачи' }).locator('..');
    this.projectSelect = modal.locator('text=Проект').locator('..').getByRole('combobox').first();
    this.prioritySelect = modal.locator('text=Приоритет').locator('..').getByRole('combobox').first();
    this.assigneeSelect = modal.locator('text=Исполнитель').locator('..').getByRole('combobox').first();
    this.createButton = page.getByRole('button', { name: 'Создать' });
  }

  async expectOpened() {
    await expect(this.titleInput).toBeVisible({ timeout: 5000 });
  }
}
