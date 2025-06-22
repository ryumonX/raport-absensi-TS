
import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';

@Injectable()
export class GradeService {
  constructor(private prisma: PrismaService) { }

  async createMany(dtos: CreateGradeDto[]) {
    console.log('DTOS:', dtos);
    if (!Array.isArray(dtos)) {
      throw new BadRequestException('Payload must be an array');
    }

    return this.prisma.grade.createMany({
      data: dtos,
    });
  }

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.prisma.$transaction([
      this.prisma.grade.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: {
          user: true,
          subject: true,
          teacher: true,
        },
      }),
      this.prisma.grade.count(),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(id: number) {
    const grade = await this.prisma.grade.findUnique({
      where: { id },
      include: {
        user: true,
        subject: true,
        teacher: true,
      },
    });
    if (!grade) throw new NotFoundException('Grade not found');
    return grade;
  }

  async update(id: number, dto: UpdateGradeDto) {
    const existing = await this.prisma.grade.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Grade not found');

    return this.prisma.grade.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const existing = await this.prisma.grade.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Grade not found');

    await this.prisma.grade.delete({ where: { id } });
    return { message: 'Grade deleted successfully' };
  }

  async getGradesByUser(userId: number) {
    return this.prisma.grade.findMany({
      where: { userId },
      include: {
        subject: true,
        teacher: {
          include: { user: true },
        },
      },
    });
  }

  async findAllByUserId(userId: number, page = 1, limit = 10) {
    const [data, total] = await this.prisma.$transaction([
      this.prisma.grade.findMany({
        where: { userId },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          user: true,
          subject: true,
          teacher: {
            include: {
              user: true, // <-- INI YANG KURANG
            },
          },
        },
          // orderBy: { createdAt: 'desc' },
        }),
      this.prisma.grade.count({
        where: { userId },
      }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

}
