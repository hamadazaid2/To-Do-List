import { IsString, IsEmpty } from 'class-validator';
import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Task } from 'src/tasks/tasks.entity';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  password: string;

  @HasMany(() => Task)
  tasks: Task[];
}
