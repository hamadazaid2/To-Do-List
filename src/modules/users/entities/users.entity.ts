import { Table, Column, Model, DataType, Scopes } from 'sequelize-typescript';

@Scopes(() => ({
  withoutPassword: {
    attributes: { exclude: ['password'] },
  },
}))

@Table({
  tableName: 'users',
  paranoid: true, // enable soft delete
  underscored: true,
})
export class User extends Model<User> {
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
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

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
    allowNull: true,
  })
  createdBy: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  updatedBy: string;

  @Column({
    type: DataType.INTEGER,
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
}
