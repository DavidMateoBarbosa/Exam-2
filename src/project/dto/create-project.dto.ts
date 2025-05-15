export class CreateProjectDto {
    title: string; // The title of the project
    description: string; // A short description of the project
    budget: number
    start: Date; // The start date of the project
    end: Date; // The end date of the project
    mentorId: number; // The ID of the professor mentoring the project
}