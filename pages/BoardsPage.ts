import { Page, Locator, expect } from '@playwright/test';

export class BoardsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
    const projectsLink = this.page.getByRole('link', { name: 'Проекты' });
    await projectsLink.click();
    await this.page.waitForLoadState('networkidle');
    await expect(this.page.getByRole('heading', { name: 'Проекты' })).toBeVisible();
  }

  async openBoard(name: string) {
    const projectHeading = this.page.getByRole('heading', { name: name, level: 6 });
    const projectCard = projectHeading.locator('..');
    const boardLink = projectCard.getByRole('link', { name: 'Перейти к доске' });
    await expect(boardLink).toBeVisible();
    await boardLink.click();
  }

  async getFirstProjectName(): Promise<string | null> {
    const projectHeadings = await this.page.getByRole('heading', { level: 6 }).all();
    if (projectHeadings.length === 0) {
      return null;
    }
    
    const firstHeading = projectHeadings[0];
    const text = await firstHeading.textContent();
    
    return text;
  }

  async expectProjectsExist() {
    const boardLinks = this.page.getByRole('link', { name: 'Перейти к доске' });
    await expect(boardLinks.first()).toBeVisible();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async expectBoardsPageOpened() {
    await expect(this.page).toHaveURL(/\/boards/);
  }

  async expectOpenedForProject(projectName: string) {
    await expect(this.page).toHaveURL(/\/board\//);
    await expect(this.page.getByRole('heading', { name: projectName })).toBeVisible();
    await expect(this.page.getByText('To Do')).toBeVisible();
    await expect(this.page.getByText('In Progress')).toBeVisible();
    await expect(this.page.getByText('Done')).toBeVisible();
  }

  async expectTaskOnBoard(title: string) {
    await expect(this.page.getByText(title)).toBeVisible();
  }

  async openTaskCardOnBoard(title: string) {
    await this.page.getByText(title).click();
  }
}
