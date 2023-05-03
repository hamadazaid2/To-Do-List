import { IsString, IsEmpty } from 'class-validator';
import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from '../users/users.entity';

@Table({
  tableName: 'tasks',
  paranoid: true, // enable soft delete
  underscored: true,
})
export class Task extends Model<Task> {
  @Column
  name: string;

  @Column
  description: string;

  @Column
  priority: number;

  @Column
  expected_working_minutes: number;

  @Column
  status: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  user_id: number;
}
