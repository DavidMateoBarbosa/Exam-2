export class CreateStudentDto {
    cc: number; // ID number of the student (type int)
    name: string; // Full name of the student
    major: string; // Major of the student
    semester: number; // Current semester of the student (type int)
    average: number; // Average score of the student (type float)
}