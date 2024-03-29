import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { usersProviders } from './providers/users.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule], //
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService],
})
export class UsersModule {}
