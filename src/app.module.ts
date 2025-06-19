import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { QrModule } from './qr/qr.module';
import { AttendanceModule } from './attendance/attendance.module';
import { UserModule } from './user/user.module';
import { ClassModule } from './class/class.module';
import { GradeModule } from './grade/grade.module';
import { TeacherModule } from './teacher/teacher.module';
import { SubjectModule } from './subject/subject.module';

@Module({
  imports: [PrismaModule, QrModule, AttendanceModule, UserModule, ClassModule, GradeModule, TeacherModule, SubjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
