import {
  Controller,
  Get,
  ParseUUIDPipe,
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
import { EditUserDto, UserDto } from '../dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { TransactionParam } from 'src/common/decorators/transaction.decorator';
import { Transaction } from 'sequelize';
import { TransactionInterceptor } from 'src/common/interceptors/transaction.interceptor';
import { Serialize } from '../../../common/interceptors';
import { UpdatePassword } from '../dto/update-password.dto';

// @Serialize(UserDto)
@UseGuards(AuthGuard, AdminGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @UseInterceptors(TransactionInterceptor)
  @Post()
  create(
    @GetUser('id') userCreatedId: string,
    @Body() dto: CreateUserDto,
    @TransactionParam() transaction: Transaction,
  ) {
    return this.userService.create(userCreatedId, dto, transaction);
  }

  @UseInterceptors(TransactionInterceptor)
  @Patch('/:id')
  update(
    @GetUser('id') userUpdatedId,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: EditUserDto,
    @TransactionParam() transaction: Transaction,
  ) {
    return this.userService.update(userUpdatedId, id, dto, transaction);
  }

  @UseInterceptors(TransactionInterceptor)
  @Patch('/updatePassword/:id')
  updatePassword(
    @GetUser('id') userUpdatedId,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePassword,
    @TransactionParam() transaction: Transaction,
  ) {
    return this.userService.updatedPassword(userUpdatedId, id, dto.password, transaction)
  }
  
  @UseInterceptors(TransactionInterceptor)
  @Delete('/:id')
  delete(
    @GetUser('id') userDeletedBy: string,
    @Param('id', ParseUUIDPipe) id: string,
    @TransactionParam() transaction: Transaction,
  ) {
    return this.userService.delete(userDeletedBy, id, transaction);
  }
}
