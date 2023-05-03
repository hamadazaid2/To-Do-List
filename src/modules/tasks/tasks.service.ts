import {
  Body,
  Param,
  ParseIntPipe,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TASKS_REPOSITORY } from '../common/constants/constant';
import { User } from '../users/users.entity';

@Injectable()
export class TasksService {
  constructor(@Inject(TASKS_REPOSITORY) private taskRepository: typeof Task) {}
  async getAll(userId: number) {
    return await this.taskRepository.findAll({
      where: { user_id: userId },
      include: [
        { model: User, attributes: ['id', 'first_name', 'last_name', 'email'] },
      ],
    });
  }

  async getOne(id: number, userId: number) {
    const task = await this.taskRepository.findOne({
      where: {
        id: id,
        user_id: userId,
      },
      include: [{ model: User }],
    });

    if (!task) throw new NotFoundException('No task founded!');
    return task;
  }

  create(@Body() dto: CreateTaskDto, userId: number) {
    return this.taskRepository.create({ ...dto, user_id: userId });
  }

  async update(
    @Param('id') id: number,
    @Body() dto: UpdateTaskDto,
    userId: number,
  ) {
    const task = await this.taskRepository.findOne({
      where: {
        id: id,
        user_id: userId,
      },
    });
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);

    await task.update(dto);

    return task;
  }

  async delete(@Param('id', ParseIntPipe) id: number, userId: number) {
    const task = await this.taskRepository.findOne({
      where: {
        id: id,
        user_id: userId,
      },
    });
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    await task.destroy();
  }
}
