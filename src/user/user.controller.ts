import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.userService.findAll(
      Number(page),
      Number(limit),
    );
  }

  @Get('students')
  findAllStudents(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.userService.findAllStudents(+page, +limit);
  }

  @Get('total-students')
  getTotalStudents() {
    return this.userService.getTotalStudents();
  }

  @Get('total-teachers')
  getTotalTeachers() {
    return this.userService.getTotalTeachers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
