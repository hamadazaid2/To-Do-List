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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { User } from './users.entity';
import { parse } from 'path';

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

  @Post()
  create(
    @Param('id', ParseIntPipe) userCreatedId: number,
    @Body() dto: CreateUserDto,
  ) {
    return this.userService.create(userCreatedId, dto);
  }

  @Patch('/:id')
  update(
    @GetUser('id', ParseIntPipe) userUpdatedId,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditUserDto,
  ) {
    return this.userService.update(userUpdatedId, id, dto);
  }

  @Delete('/:id')
  delete(
    @GetUser('id', ParseIntPipe) userDeletedBy: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.delete(userDeletedBy, id);
  }
}
