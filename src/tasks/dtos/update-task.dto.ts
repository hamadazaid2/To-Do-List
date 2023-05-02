import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  Min,
  Max,
} from 'class-validator';

enum TaskStatus {
  QA = 'QA',
  WAITING = 'waiting',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(5)
  priority?: number;

  @IsNumber()
  @IsOptional()
  expectedWorkingMinutes?: number;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: string;
}
