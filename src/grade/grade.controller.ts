import {
  Controller, Get, Post, Body, Param, Delete, Query, Put
} from '@nestjs/common';
import { GradeService } from './grade.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';

@Controller('grades')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Post()
  async create(@Body() dtos: CreateGradeDto[]) {
  return this.gradeService.createMany(dtos);
}

  @Get('user/:userId')
  findAllByUserId(
  @Param('userId') userId: string,
  @Query('page') page = '1',
  @Query('limit') limit = '10',
) {
  return this.gradeService.findAllByUserId(Number(userId), Number(page), Number(limit));
}


  @Get()
  findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.gradeService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gradeService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateGradeDto: UpdateGradeDto) {
    return this.gradeService.update(+id, updateGradeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gradeService.remove(+id);
  }
}
