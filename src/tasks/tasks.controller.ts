import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAll(@GetUser('id', ParseIntPipe) userId: number) {
    return this.tasksService.getAll(userId);
  }

  @Get('/:id')
  getOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id', ParseIntPipe) userId: number,
  ) {
    console.log(userId);
    return this.tasksService.getOne(id, userId);
  }

  @Post()
  create(
    @Body() dto: CreateTaskDto,
    @GetUser('id', ParseIntPipe) userId: number,
  ) {
    return this.tasksService.create(dto, userId);
  }

  @Patch('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto,
    @GetUser('id', ParseIntPipe) userId: number,
  ) {
    return this.tasksService.update(id, dto, userId);
  }

  @Delete('/:id')
  delete(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id', ParseIntPipe) userId: number,
  ) {
    return this.tasksService.delete(id, userId);
  }
}
