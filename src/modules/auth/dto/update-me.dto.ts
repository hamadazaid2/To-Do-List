import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class UpdatedUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}
