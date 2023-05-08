import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto, SignupDto } from '../dto';
import { Public } from 'src/common/decorators/public.decorator';
import { TransactionParam } from 'src/common/decorators/transaction.decorator';
import { Transaction } from 'sequelize';
import { TransactionInterceptor } from 'src/common/interceptors/transaction.interceptor';

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
    return this.authService.signup(null, dto, transaction);
  }
}
