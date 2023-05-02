import { IsString, IsEmpty } from 'class-validator';
import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Task } from '../tasks/tasks.entity';

@Table({
  tableName: 'users',
  paranoid: true, // enable soft delete
  underscored: true,
})
export class User extends Model<User> {
  @Column
  first_name: string;

  @Column
  last_name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column({ defaultValue: 'user' })
  role: string;

  @HasMany(() => Task)
  tasks: Task[];
}
