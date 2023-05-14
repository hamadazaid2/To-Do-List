import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  Min,
  Max,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(5)
  priority?: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  expectedWorkingMinutes?: number;

  @Transform(({ value }) => String(value).toUpperCase())
  @IsEnum(['QA', 'DONE', 'WAITING', 'IN PROGRESS'], {
    message: 'Status must be one of the following: [QA, DONE, WAITING, IN PROGRESS]'
  })
  @IsOptional()
  status?: string;
}
