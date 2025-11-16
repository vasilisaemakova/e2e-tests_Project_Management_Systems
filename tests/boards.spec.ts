import { test, expect } from '../fixtures';

test.describe('Страница досок проектов', () => {
  test.beforeEach(async ({ boardsPage }) => {
    await test.step('Открыть страницу Проекты', async () => {
      await boardsPage.open();
      await boardsPage.waitForPageLoad();
    });
  });

  test.describe('Переход на доску проекта', () => {
    test('Переход на доску первого проекта', async ({ boardsPage }) => {
      await test.step('Список проектов отображается', async () => {
        await boardsPage.expectProjectsExist();
      });
      
      const firstProjectName = (await boardsPage.getFirstProjectName())?.trim() || '';
      
      await test.step('Клик по ссылке "Перейти к доске"', async () => {
        const heading = boardsPage['page'].getByRole('heading', { name: firstProjectName });
        await expect(heading).toBeVisible();
        const card = heading.locator('..');
        const toBoard = card.getByRole('link', { name: 'Перейти к доске' });
        await expect(toBoard).toBeVisible();
        await toBoard.click();
      });

      await test.step('Открылась доска нужного проекта', async () => {
        await boardsPage.expectOpenedForProject(firstProjectName);
      });
    });
  });
});

