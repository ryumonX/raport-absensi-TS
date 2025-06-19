import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GradeService } from './grade.service';
import { CreateGradeDto } from './dto/create-grade.dto';

@Controller('grades')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Post()
  create(@Body() dto: CreateGradeDto) {
    return this.gradeService.createGrade(dto);
  }

  @Get('user/:userId')
  getUserGrades(@Param('userId') userId: string) {
    return this.gradeService.getGradesByUser(Number(userId));
  }
}
