import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
  IsInt,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsOptional()
  @IsString()
  destinationCountry?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsInt()
  classId?: number;
}
