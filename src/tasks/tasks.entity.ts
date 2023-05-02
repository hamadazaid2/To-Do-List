import { IsString, IsEmpty } from 'class-validator';
import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/users/users.entity';

@Table({ tableName: 'tasks' })
export class Task extends Model<Task> {
  @Column
  name: string;

  @Column
  description: string;

  @Column
  priority: number;

  @Column
  expectedWorkingMinutes: number;

  @Column
  status: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  userId: number;
}
