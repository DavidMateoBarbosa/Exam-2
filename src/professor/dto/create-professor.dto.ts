export class CreateProfessorDto {
    cc: number; // ID number of the professor (type int)
    name: string; // Full name of the professor
    department: string; // Department of the professor
    extension: number; // Extension number (type int)
    evaluated: boolean; // Whether the professor is pair evaluated or not
}