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

  @Column
  created_by: number;

  @Column
  updated_by: number;

  @Column
  deleted_by: number;

  @Column
  created_at: Date;

  @Column
  updated_at: Date;

  @Column
  deleted_at: Date;
}
