import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGradeDto } from './dto/create-grade.dto';

@Injectable()
export class GradeService {
  constructor(private prisma: PrismaService) {}

  async createGrade(dto: CreateGradeDto) {
    // Cek apakah guru mengajar subject tersebut
    const isAllowed = await this.prisma.subject.findFirst({
      where: {
        id: dto.subjectId,
        teachers: {
          some: { id: dto.teacherId }
        }
      }
    });

    if (!isAllowed) {
      throw new ForbiddenException('Guru ini tidak mengajar subject ini');
    }

    // Buat grade langsung (tanpa subtest)
    await this.prisma.grade.create({
      data: {
        userId: dto.userId,
        subjectId: dto.subjectId,
        semester: dto.semester,
        teacherId: dto.teacherId,
        score: dto.score,
        remarks: dto.remarks,
      }
    });

    return { message: 'Grade created successfully' };
  }

  async getGradesByUser(userId: number) {
    return this.prisma.grade.findMany({
      where: { userId },
      include: {
        subject: true,
        teacher: {
          include: {
            user: true
          }
        }
      }
    });
  }
}
