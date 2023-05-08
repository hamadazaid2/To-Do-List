import { USERS_REPOSITORY } from 'src/common/constants';
import { User } from '../entities/users.entity';

export const usersProviders = [
  {
    provide: USERS_REPOSITORY,
    useValue: User,
  },
];
