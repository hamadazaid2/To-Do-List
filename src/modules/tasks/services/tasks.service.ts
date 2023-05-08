import {
  Body,
  Param,
  ParseIntPipe,
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
      where: { user_id: userId },
      include: [
        { model: User, attributes: ['id', 'first_name', 'last_name', 'email'] },
      ],
    });
  }

  async getOne(id: number, userId: number) {
    const task = await this.taskRepository.scope('withUser').findOne({
      where: {
        id: id,
        user_id: userId,
      },
      include: [{ model: User }],
    });

    if (!task) throw new NotFoundException('No task founded!');
    return task;
  }

  create(@Body() dto: CreateTaskDto, userId: number, transaction: Transaction) {
    return this.taskRepository.create(
      {
        ...dto,
        user_id: userId,
        created_by: userId,
      },
      { transaction },
    );
  }

  async update(
    @Param('id') id: number,
    @Body() dto: UpdateTaskDto,
    userId: number,
    transaction: Transaction,
  ) {
    const task = await this.taskRepository.findOne({
      where: {
        id: id,
        user_id: userId,
      },
    });
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);

    await task.update(
      { ...dto, updated_by: userId, updated_at: new Date() },
      { transaction },
    );

    return task;
  }

  async delete(
    @Param('id', ParseIntPipe) id: number,
    userId: number,
    transaction: Transaction,
  ) {
    const task = await this.taskRepository.findOne({
      where: {
        id: id,
        user_id: userId,
      },
    });
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    await task.update({ deleted_by: userId }, { transaction });
    await task.destroy({ transaction });
  }
}
