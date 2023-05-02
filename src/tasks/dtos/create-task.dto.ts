import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsEnum,
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
  priority: number;

  @IsNumber()
  @IsNotEmpty()
  expectedWorkingMinutes: number;

  @IsEnum(TaskStatus)
  @IsOptional()
  status: string;
}
