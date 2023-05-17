import {
  Body,
  Param,
  HttpStatus,
  HttpCode,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { Transaction } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { Task } from '../entities/tasks.entity';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { TASKS_REPOSITORY } from 'src/common/constants';
import { User } from '../../users/entities/users.entity';

@Injectable()
export class TasksService {
  constructor(@Inject(TASKS_REPOSITORY) private taskRepository: typeof Task) {}
  async getAll(userId: number) {
    return await this.taskRepository.scope('withUser').findAll({
      where: { userId: userId },
      include: [
        { model: User, attributes: ['id', 'first_name', 'last_name', 'email'] },
      ],
    });
  }

  async getOne(id: string, userId: string) {
    const task = await this.taskRepository.scope('withUser').findOne({
      where: {
        id: id,
        userId: userId,
      },
      include: [{ model: User }],
    });

    if (!task) throw new NotFoundException('No task founded!');
    return task;
  }

  create(@Body() dto: CreateTaskDto, userId: string, transaction: Transaction) {
    return this.taskRepository.create(
      {
        ...dto,
        userId: userId,
        createdBy: userId,
      },
      { transaction },
    );
  }

  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
    userId: string,
    transaction: Transaction,
  ) {
    const task = await this.taskRepository.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);

    await task.update(
      { ...dto, updatedBy: userId, updatedAt: new Date() },
      { transaction },
    );

    return task;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    id: string,
    userId: string,
    transaction: Transaction,
  ) {
    const task = await this.taskRepository.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    await task.update({ deletedBy: userId }, { transaction });
    await task.destroy({ transaction });
  }
}
