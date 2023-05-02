import { USERS_REPOSITORY } from '../common/constants/constant';
import { User } from './users.entity';

export const usersProviders = [
  {
    provide: USERS_REPOSITORY,
    useValue: User,
  },
];
