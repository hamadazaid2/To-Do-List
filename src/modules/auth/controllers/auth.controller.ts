import { Body, Controller, Post, Get,UseInterceptors, Patch, Delete } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto, SignupDto } from '../dto';
import { Public } from 'src/common/decorators/public.decorator';
import { TransactionParam } from 'src/common/decorators/transaction.decorator';
import { Transaction } from 'sequelize';
import { TransactionInterceptor } from 'src/common/interceptors/transaction.interceptor';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/modules/users/entities/users.entity';
import { Serialize } from 'src/common/interceptors';
import { UserDto } from 'src/modules/users/dto';
import { UpdatedUserDto } from '../dto/update-me.dto';
import { UpdatePassword } from '../dto/update-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  signin(@Body() dto: LoginDto) {
    return this.authService.signin(dto.email, dto.password);
  }

  @Public()
  @Post('signup')
  @UseInterceptors(TransactionInterceptor)
  signup(@Body() dto: SignupDto, @TransactionParam() transaction: Transaction) {
    return this.authService.signup(dto, transaction, null);
  }

  @Get('me')
  @Serialize(UserDto)
  getMe(@GetUser() user: User){
    return user;
  }

  @UseInterceptors(TransactionInterceptor)
  @Patch('me')
  updatedMe(@GetUser() user: User, @Body() dto: UpdatedUserDto, transaction: Transaction){
    return this.authService.updateMe(user, dto,transaction )
  }
  @UseInterceptors(TransactionInterceptor)
  @Patch('me/updatePassword')
  updateMyPassword(@GetUser() user: User, @Body() dto: UpdatePassword, transaction: Transaction){
    return this.authService.updateMyPassword(user, dto.password, transaction)
  }
  

  @UseInterceptors(TransactionInterceptor)
  @Delete('me')
  deleteMe(@GetUser() user: User, transaction: Transaction){
    return this.authService.deleteMe(user, transaction);
  }
}
