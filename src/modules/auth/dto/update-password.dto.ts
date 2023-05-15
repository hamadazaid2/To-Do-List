import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdatePassword {
  @IsString()
  @IsNotEmpty()
  password: string;
}
