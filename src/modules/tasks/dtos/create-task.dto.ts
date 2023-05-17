import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  Max,
  Min,
} from 'class-validator';

import { Transform } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  // It will transform the '20' before it reach the dto
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(5)
  priority: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  expected_working_minutes: number;

  @Transform(({ value }) => String(value).toUpperCase())
  @IsEnum(['QA', 'DONE', 'WAITING', 'IN PROGRESS'])
  @IsOptional()
  status: string;
}
