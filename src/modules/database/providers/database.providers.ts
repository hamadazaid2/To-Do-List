import {
  SEQUELIZE,
  TEST,
  PRODUCTION,
  DEVELOPMENT,
} from '../../../common/constants';
import { databaseConfig } from '../database.config';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/modules/users/entities/users.entity';
import { Task } from 'src/modules/tasks/entities/tasks.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.development;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, Task]);
      // await sequelize.sync();
      return sequelize;
    },
  },
];
