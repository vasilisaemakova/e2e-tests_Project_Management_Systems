import { test, expect } from '../fixtures';
import { TASK_DESCRIPTION, NOT_FOUND_QUERY, EXISTING_TASK_TITLE, generateTaskTitle } from '../utils/dataTest';

test.describe('Страница задач', () => {
  const testTaskDescription = TASK_DESCRIPTION;

  test.beforeEach(async ({ issuesPage }) => {
    await test.step('Открыть список задач', async () => {
      await issuesPage.open();
      await issuesPage.waitForPageLoad();
    });
  });

  test.describe('Создание задачи', () => {
    test('Создание новой задачи', async ({ issuesPage, taskModal, boardsPage }) => {
      const taskTitle = generateTaskTitle();
      let projectName = '';

      await test.step('Нажать "Создать задачу"', async () => {
        await expect(issuesPage.createTaskButton).toBeVisible();
        await issuesPage.createTaskButton.click();
      });
      await test.step('Ожидать открытия модального окна', async () => {
        await taskModal.expectOpened();
      });
      await test.step('Ввести название', async () => {
        await expect(taskModal.titleInput).toBeVisible();
        await taskModal.titleInput.fill(taskTitle);
      });
      await test.step('Ввести описание', async () => {
        await expect(taskModal.descriptionInput).toBeVisible();
        await taskModal.descriptionInput.fill(testTaskDescription);
      });
      await test.step('Выбрать проект', async () => {
        await expect(taskModal.projectSelect).toBeVisible();
        await taskModal.projectSelect.click();
        const option = taskModal.page.getByRole('option').first();
        await expect(option).toBeVisible();
        projectName = (await option.textContent()) || '';
        await option.click();
      });
      await test.step('Выбрать приоритет', async () => {
        await expect(taskModal.prioritySelect).toBeVisible();
        await taskModal.prioritySelect.click();
        const option = taskModal.page.getByRole('option').first();
        await expect(option).toBeVisible();
        await option.click();
      });
      await test.step('Выбрать исполнителя', async () => {
        await expect(taskModal.assigneeSelect).toBeVisible();
        await taskModal.assigneeSelect.click();
        const option = taskModal.page.getByRole('option').first();
        await expect(option).toBeVisible();
        await option.click();
      });
      await test.step('Кнопка "Создать" активна', async () => {
        await expect(taskModal.createButton).toBeEnabled();
      });
      await test.step('Подтвердить создание задачи', async () => {
        await expect(taskModal.createButton).toBeVisible();
        await taskModal.createButton.click();
      });
      await test.step('Проверить, что задача появилась', async () => {
        await issuesPage.expectTaskVisible(taskTitle);
      });
      await test.step('Открыть карточку задачи', async () => {
        const card = issuesPage.taskCardByTitle(taskTitle);
        await expect(card).toBeVisible();
        await card.click();
      });
      await test.step('Кнопка "Перейти на доску" отображается', async () => {
        await expect(taskModal.goToBoardButton).toBeVisible({ timeout: 5000 });
      });
      await test.step('Нажать на кнопку "Перейти на доску"', async () => {
        await taskModal.goToBoardButton.click();
      });
      await test.step('Открылась доска проекта', async () => {
        await boardsPage.expectOpenedForProject(projectName.trim());
      });
      await test.step('Задача отображается на доске', async () => {
        await boardsPage.expectTaskOnBoard(taskTitle);
      });
    });
  });

  test.describe('Открытие карточки задачи', () => {
    test('Открытие карточки созданной задачи', async ({ issuesPage, taskModal, boardsPage }) => {
      const taskTitle = generateTaskTitle();
      let projectName = '';

      await test.step('Нажать "Создать задачу"', async () => {
        await expect(issuesPage.createTaskButton).toBeVisible();
        await issuesPage.createTaskButton.click();
      });
      await test.step('Ожидать открытия модального окна', async () => {
        await taskModal.expectOpened();
      });
      await test.step('Ввести название', async () => {
        await expect(taskModal.titleInput).toBeVisible();
        await taskModal.titleInput.fill(taskTitle);
      });
      await test.step('Ввести описание', async () => {
        await expect(taskModal.descriptionInput).toBeVisible();
        await taskModal.descriptionInput.fill(testTaskDescription);
      });
      await test.step('Выбрать проект', async () => {
        await expect(taskModal.projectSelect).toBeVisible();
        await taskModal.projectSelect.click();
        const option = taskModal.page.getByRole('option').first();
        await expect(option).toBeVisible();
        projectName = (await option.textContent()) || '';
        await option.click();
      });
      await test.step('Выбрать приоритет', async () => {
        await expect(taskModal.prioritySelect).toBeVisible();
        await taskModal.prioritySelect.click();
        const option = taskModal.page.getByRole('option').first();
        await expect(option).toBeVisible();
        await option.click();
      });
      await test.step('Выбрать исполнителя', async () => {
        await expect(taskModal.assigneeSelect).toBeVisible();
        await taskModal.assigneeSelect.click();
        const option = taskModal.page.getByRole('option').first();
        await expect(option).toBeVisible();
        await option.click();
      });
      await test.step('Кнопка "Создать" активна', async () => {
        await expect(taskModal.createButton).toBeEnabled();
      });
      await test.step('Подтвердить создание задачи', async () => {
        await expect(taskModal.createButton).toBeVisible();
        await taskModal.createButton.click();
      });
      await test.step('Проверить, что задача появилась', async () => {
        await issuesPage.expectTaskVisible(taskTitle);
      });
      await test.step('Открыть карточку задачи', async () => {
        const card = issuesPage.taskCardByTitle(taskTitle);
        await expect(card).toBeVisible();
        await card.click();
      });
      await test.step('Убедиться, что карточка открыта', async () => {
        await issuesPage.expectTaskCardOpened(taskTitle);
      });
      await test.step('Кнопка "Перейти на доску" отображается', async () => {
        await expect(taskModal.goToBoardButton).toBeVisible({ timeout: 5000 });
      });
      await test.step('Нажать на кнопку "Перейти на доску"', async () => {
        await taskModal.goToBoardButton.click();
      });
      await test.step('Открылась доска проекта', async () => {
        await boardsPage.expectOpenedForProject(projectName.trim());
      });
      await test.step('Задача отображается на доске', async () => {
        await boardsPage.expectTaskOnBoard(taskTitle);
      });
    });
  });

  test.describe('Поиск задачи', () => {
    test('Поиск существующей задачи', async ({ issuesPage }) => {
      await test.step('Очистить поиск', async () => {
        await expect(issuesPage.searchInput).toBeVisible();
        await issuesPage.searchInput.clear();
      });
      await test.step('Ввести запрос в поиск', async () => {
        await expect(issuesPage.searchInput).toBeVisible();
        await issuesPage.searchInput.fill(EXISTING_TASK_TITLE);
      });
      await test.step('Задача отображается в списке', async () => {
        await issuesPage.expectTaskVisible(EXISTING_TASK_TITLE);
      });
    });

    test('Поиск несуществующей задачи', async ({ issuesPage, taskModal }) => {
      const taskTitle = generateTaskTitle();
      
      await test.step('Ввести несуществующий запрос', async () => {
        await expect(issuesPage.searchInput).toBeVisible();
        await issuesPage.searchInput.fill(NOT_FOUND_QUERY);
      });
      await test.step('Задача не отображается в списке', async () => {
        await issuesPage.expectTaskNotVisible(taskTitle);
      });
    });


  });
});
