import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) { }

  async scanByQrCode(qrcode: string) {
    const user = await this.prisma.user.findUnique({
      where: { qrcode },
      include: { class: true },
    });

    if (!user) throw new NotFoundException('User not found');

    const now = new Date();

    return this.prisma.attendance.create({
      data: {
        userId: user.id,
        date: now,
        time: now,
        method: 'qrcode',
        status: 'present',
        class: user.class?.name ?? 'Unknown',
      },
    });
  }

  async create(createAttendanceDto: CreateAttendanceDto) {
    return this.prisma.attendance.create({
      data: createAttendanceDto,
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit;

  const [data, total] = await this.prisma.$transaction([
    this.prisma.attendance.findMany({
      include: {
        user: true,
      },
      orderBy: {
        time: 'desc',
      },
      skip,
      take: limit,
    }),
    this.prisma.attendance.count(),
  ]);

  return {
    data,
    meta: {
      total,
      page,
      lastPage: Math.ceil(total / limit),
    },
  };
}


  async findOne(id: number) {
    const attendance = await this.prisma.attendance.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!attendance) throw new NotFoundException('Attendance not found');
    return attendance;
  }

  async update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return this.prisma.attendance.update({
      where: { id },
      data: {
        userId: updateAttendanceDto.userId,
        date: updateAttendanceDto.date,
        time: updateAttendanceDto.time,
        method: updateAttendanceDto.method,
        status: updateAttendanceDto.status,
        class: updateAttendanceDto.class,
      },
    });
  }


  async remove(id: number) {
    return this.prisma.attendance.delete({
      where: { id },
    });
  }

  async getUserAttendanceHistory(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException('User not found');

    const attendance = await this.prisma.attendance.findMany({
      where: { userId },
      orderBy: {
        date: 'desc',
      },
      select: {
        id: true,
        date: true,
        time: true,
        method: true,
        status: true,
      },
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      attendance,
    };
  }

  async getTodayAttendance() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // jam 00:00:00

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // jam 00:00:00 besok

    return this.prisma.attendance.findMany({
      where: {
        date: {
          gte: today,
          lt: tomorrow,
        },
      },
      include: {
        user: true,
      },
      orderBy: {
        time: 'asc',
      },
    });
  }
}
