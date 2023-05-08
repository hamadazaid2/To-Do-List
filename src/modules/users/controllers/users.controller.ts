import {
  Controller,
  Get,
  ParseIntPipe,
  Patch,
  Param,
  Body,
  Post,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { EditUserDto } from '../dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { TransactionParam } from 'src/common/decorators/transaction.decorator';
import { Transaction } from 'sequelize';
import { TransactionInterceptor } from 'src/common/interceptors/transaction.interceptor';

@UseGuards(AuthGuard, AdminGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @UseInterceptors(TransactionInterceptor)
  @Post()
  create(
    @GetUser('id') userCreatedId: number,
    @Body() dto: CreateUserDto,
    @TransactionParam() transaction: Transaction,
  ) {
    return this.userService.create(userCreatedId, dto, transaction);
  }

  @UseInterceptors(TransactionInterceptor)
  @Patch('/:id')
  update(
    @GetUser('id') userUpdatedId,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditUserDto,
    @TransactionParam() transaction: Transaction,
  ) {
    return this.userService.update(userUpdatedId, id, dto, transaction);
  }

  @UseInterceptors(TransactionInterceptor)
  @Delete('/:id')
  delete(
    @GetUser('id') userDeletedBy: number,
    @Param('id', ParseIntPipe) id: number,
    @TransactionParam() transaction: Transaction,
  ) {
    return this.userService.delete(userDeletedBy, id, transaction);
  }
}