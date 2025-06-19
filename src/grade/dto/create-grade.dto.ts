// create-grade.dto.ts
export class CreateGradeDto {
  userId: number;
  subjectId: number;
  semester: string;
  teacherId: number;
  score: number;
  remarks?: string;
}
