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
    type: DataType.UUIDV4,
    allowNull: false,
    defaultValue: DataType.UUIDV4, // Generate a UUID v4 as the default value
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
  expectedWorkingMinutes: number;

  @Column({
    type: DataType.ENUM,
    values: ['Done', 'In Progress', 'QA', 'To Do'],
    defaultValue: 'To Do',
  })
  status: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  userId: string;

  @Column({
    type: DataType.STRING,
  })
  createdBy: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  updatedBy: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  deletedBy: string;

  @Column({
    type: DataType.DATE,
    defaultValue: new Date(),
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updatedAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deletedAt: Date;

  // Apply default scope ;)
  static readonly defaultScope = {
    include: [
      { model: User, attributes: ['id', 'first_name', 'last_name', 'email'] },
    ],
  };
}
