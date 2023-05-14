import {
  IsEmail,
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
} from 'class-validator';
export class EditUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  @IsEnum(['user', 'role'])
  role?: string;

  @IsOptional()
  updatedBy?: number;
}
