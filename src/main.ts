import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './common/guards/auth.guard';
import { Reflector } from '@nestjs/core';
import { UsersService } from './modules/users/services/users.service';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // In order to delete any new value not specified in DTO
    }),
  );

  const reflector = app.get(Reflector);
  const userService = app.get(UsersService);
  const jwtService = app.get(JwtService);
  const authGuard = app.get(AuthGuard);

  app.useGlobalGuards(authGuard);

  await app.listen(3000);
}
bootstrap();
