import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    return user;
  }

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: 'asc' }, // opsional: bisa diganti ke createdAt jika ada
      }),
      this.prisma.user.count(),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findAllStudents(page = 1, limit = 10) {
    const where = { role: 'student' };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: 'asc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getTotalStudents() {
    const total = await this.prisma.user.count({
      where: { role: 'student' },
    });

    return { total };
  }

  async getTotalTeachers() {
    const total = await this.prisma.user.count({
      where: { role: 'teacher' },
    });

    return { total };
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.prisma.attendance.deleteMany({
      where: { userId: id },
    });
    await this.prisma.grade.deleteMany({
      where: { userId: id },
    });
    await this.prisma.teacher.deleteMany({
      where: { userId: id },
    });
    return this.prisma.user.delete({
      where: { id },
    });
  }

}
