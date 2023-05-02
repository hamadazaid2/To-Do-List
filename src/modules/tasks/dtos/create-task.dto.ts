import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  Max,
  Min,
} from 'class-validator';

enum TaskStatus {
  QA = 'QA',
  WAITING = 'waiting',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(5)
  priority: number;

  @IsNumber()
  @IsNotEmpty()
  expected_working_minutes: number;

  @IsEnum(TaskStatus)
  @IsOptional()
  status: string;
}
