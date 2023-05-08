import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  Scopes,
  DataType,
} from 'sequelize-typescript';
import { User } from '../../users/entities/users.entity';

@Scopes(() => ({
  withUser: {
    include: [
      { model: User, attributes: ['id', 'first_name', 'last_name', 'email'] },
    ],
  },
}))
@Table({
  tableName: 'tasks',
  paranoid: true, // enable soft delete
  underscored: true,
})
export class Task extends Model<Task> {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  //   @Column({
  //     type: DataType.DATE,
  //     allowNull: false,
  //   })
  //   due_to: Date;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 3,
    // Search for max and min, and what is the best datatype
  })
  priority: number;

  @Column
  expected_working_minutes: number;

  @Column({
    type: DataType.ENUM,
    values: ['Done', 'In Progress', 'QA', 'To Do'],
    defaultValue: 'To Do',
  })
  status: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  user_id: number;

  @Column({
    type: DataType.INTEGER,
  })
  created_by: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  updated_by: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  deleted_by: number;

  @Column({
    type: DataType.DATE,
    defaultValue: new Date(),
  })
  created_at: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  updated_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deleted_at: Date;

  // Apply default scope ;)
  static readonly defaultScope = {
    include: [
      { model: User, attributes: ['id', 'first_name', 'last_name', 'email'] },
    ],
  };
}
