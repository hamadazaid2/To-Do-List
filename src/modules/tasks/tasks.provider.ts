import { TASKS_REPOSITORY } from '../common/constants/constant';
import { Task } from './tasks.entity';

export const tasksProviders = [
  {
    provide: TASKS_REPOSITORY,
    useValue: Task,
  },
];
