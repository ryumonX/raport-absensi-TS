export class RegisterDto {
  name: string;
  email: string;
  password: string;
  role: string; // bisa "student", "teacher", atau "admin"
  classId?: number; 
}
