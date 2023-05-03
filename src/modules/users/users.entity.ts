import {
  Table,
  Column,
  Model,
  HasMany,
  BeforeCreate,
  BelongsTo,
  BeforeUpdate,
  BeforeDestroy,
} from 'sequelize-typescript';
import { Task } from '../tasks/tasks.entity';
import { Inject } from '@nestjs/common';
import { Request } from 'express';

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
