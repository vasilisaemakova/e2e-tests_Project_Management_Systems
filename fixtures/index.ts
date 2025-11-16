import { test as base } from '@playwright/test';
import { IssuesPage } from '../pages/IssuesPage';
import { TaskModal } from '../pages/TaskModal';
import { BoardsPage } from '../pages/BoardsPage';

type Fixtures = {
  issuesPage: IssuesPage;
  taskModal: TaskModal;
  boardsPage: BoardsPage;
};

export const test = base.extend<Fixtures>({
  issuesPage: async ({ page }, use) => {
    await use(new IssuesPage(page));
  },
  taskModal: async ({ page }, use) => {
    await use(new TaskModal(page));
  },
  boardsPage: async ({ page }, use) => {
    await use(new BoardsPage(page));
  },
});

export const expect = test.expect;
