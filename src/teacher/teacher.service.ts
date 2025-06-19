import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTeacherDto) {
    const user = await this.prisma.user.findUnique({ where: { id: dto.userId } });
    if (!user || user.role !== 'teacher') {
      throw new NotFoundException('User tidak ditemukan atau bukan guru');
    }

    const teacher = await this.prisma.teacher.create({
      data: { userId: dto.userId }
    });

    return teacher;
  }

  async findAll() {
    return this.prisma.teacher.findMany({
      include: {
        user: true,
        subjects: true,
      }
    });
  }

  async findOne(id: number) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { id },
      include: {
        user: true,
        subjects: true,
        grades: {
          include: {
            subject: true,
          }
        }
      }
    });

    if (!teacher) {
      throw new NotFoundException('Guru tidak ditemukan');
    }

    return teacher;
  }

  async delete(id: number) {
    return this.prisma.teacher.delete({
      where: { id },
    });
  }
}
