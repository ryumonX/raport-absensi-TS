import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateClassDto) {
    return this.prisma.class.create({
      data: { name: dto.name }
    });
  }

  async findAll() {
    return this.prisma.class.findMany({
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    });
  }

  async findOne(id: number) {
    const kelas = await this.prisma.class.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    });

    if (!kelas) throw new NotFoundException('Kelas tidak ditemukan');
    return kelas;
  }

  async update(id: number, dto: UpdateClassDto) {
    return this.prisma.class.update({
      where: { id },
      data: dto
    });
  }

  async delete(id: number) {
    return this.prisma.class.delete({
      where: { id }
    });
  }
}
