import { TASKS_REPOSITORY } from 'src/common/constants';
import { Task } from '../entities/tasks.entity';

export const tasksProviders = [
  {
    provide: TASKS_REPOSITORY,
    useValue: Task,
  },
];
