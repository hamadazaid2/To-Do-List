import { Sequelize } from 'sequelize-typescript';
import { Task } from 'src/modules/tasks/tasks.entity';
import { User } from 'src/modules/users/users.entity';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'to_do_list',
        define: {
          paranoid: true, // To enable soft delete
          timestamps: true, // Enable timestamps
          underscored: true,
        },
      });
      sequelize.addModels([Task, User]);
      // await sequelize.sync();
      return sequelize;
    },
  },
];
