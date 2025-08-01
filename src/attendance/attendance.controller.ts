import {
  Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, Query
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Controller('attendances')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) { }

  @Post('scan')
  scanByQRCode(@Body() body: { qrcode: string }) {
    return this.attendanceService.scanByQrCode(body.qrcode);
  }

  @Get('today')
  getTodayAttendance() {
    return this.attendanceService.getTodayAttendance();
  }

  @Post()
  async create(@Body() createAttendanceDto: CreateAttendanceDto) {
    const attendance = await this.attendanceService.create(createAttendanceDto);
    return {
      message: 'Attendance successfully created',
      data: attendance,
    };
  }

  @Get('total-today')
  getTotalAttendanceToday() {
    return this.attendanceService.getTotalAttendanceToday();
  }

  @Get('total-this-week')
  getTotalAttendanceThisWeek() {
    return this.attendanceService.getTotalAttendanceThisWeek();
  }

  @Get('students')
  getAllStudents() {
    return this.attendanceService.findAllStudents();
  }

  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    return this.attendanceService.findAll(pageNumber, limitNumber);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.attendanceService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAttendanceDto,
  ) {
    return this.attendanceService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.attendanceService.remove(id);
  }

  @Get('history/:userId')
  getHistory(@Param('userId') userId: string) {
    return this.attendanceService.getUserAttendanceHistory(+userId);
  }

}
