import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  paranoid: true, // enable soft delete
  underscored: true,
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM,
    values: ['user', 'admin'],
  })
  role: string;

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
}
