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
  first_name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsString()
  @IsOptional()
  @IsEnum(['user', 'role'])
  role?: string;

  @IsOptional()
  updated_by?: number;
}
