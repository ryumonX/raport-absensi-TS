export class CreateGradeDto {
  userId: number;
  subjectId: number;
  teacherId: number;
  semester: string;
  score: number;
  remarks?: string | null;
}
