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
  UseInterceptors,
} from '@nestjs/common';
import { Transaction } from 'sequelize';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { TransactionParam } from 'src/common/decorators/transaction.decorator';
import { TransactionInterceptor } from 'src/common/interceptors/transaction.interceptor';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAll(@GetUser('id') userId: number) {
    return this.tasksService.getAll(userId);
  }

  @Get('/:id')
  getOne(@Param('id', ParseIntPipe) id: number, @GetUser('id') userId: number) {
    return this.tasksService.getOne(id, userId);
  }

  @UseInterceptors(TransactionInterceptor)
  @Post()
  create(
    @Body() dto: CreateTaskDto,
    @GetUser('id') userId: number,
    @TransactionParam() transaction: Transaction,
  ) {
    return this.tasksService.create(dto, userId, transaction);
  }

  @UseInterceptors(TransactionInterceptor)
  @Patch('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto,
    @GetUser('id') userId: number,
    @TransactionParam() transaction: Transaction,
  ) {
    return this.tasksService.update(id, dto, userId, transaction);
  }

  @UseInterceptors(TransactionInterceptor)
  @Delete('/:id')
  delete(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') userId: number,
    @TransactionParam() transaction: Transaction,
  ) {
    return this.tasksService.delete(id, userId, transaction);
  }
}
