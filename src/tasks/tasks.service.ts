import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
  ParseIntPipe,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Task } from './tasks.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private taskModel: typeof Task) {}
  async getAll(userId: number) {
    return await this.taskModel.findAll({ where: { userId } });
  }

  async getOne(id: number, userId: number) {
    console.log(id);
    return await this.taskModel.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });
  }

  create(@Body() dto: CreateTaskDto, userId: number) {
    return this.taskModel.create({ ...dto, userId });
  }

  async update(
    @Param('id') id: number,
    @Body() dto: UpdateTaskDto,
    userId: number,
  ) {
    const task = await this.taskModel.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);

    await task.update(dto);

    return task;
  }

  async delete(@Param('id', ParseIntPipe) id: number, userId: number) {
    const task = await this.taskModel.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    await task.destroy();
  }
}
