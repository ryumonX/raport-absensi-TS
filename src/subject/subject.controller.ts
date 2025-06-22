import { Controller, Post, Get, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { AssignTeacherDto } from './dto/assign-teacher.dto';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) { }

  @Post()
  create(@Body() dto: CreateSubjectDto) {
    return this.subjectService.create(dto);
  }

  @Get()
  findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10'
  ) {
    return this.subjectService.findAll(Number(page), Number(limit));
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSubjectDto) {
    return this.subjectService.update(+id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.subjectService.delete(+id);
  }

  @Post(':id/assign-teacher')
  assignTeacher(@Param('id') id: string, @Body() dto: AssignTeacherDto) {
    return this.subjectService.assignTeacher(+id, dto);
  }

  @Post(':id/unassign-teacher')
  unassignTeacher(@Param('id') id: string, @Body() dto: AssignTeacherDto) {
    return this.subjectService.unassignTeacher(+id, dto);
  }
}
