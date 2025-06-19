import { IsDateString, IsInt, IsString } from 'class-validator';

export class CreateAttendanceDto {
  @IsInt()
  userId: number;

  @IsDateString()
  date: string;

  @IsDateString()
  time: string;

  @IsString()
  method: string;

  @IsString()
  status: string;

  @IsString()
  class: string;
  
}
