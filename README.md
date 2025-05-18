# 📘 Part 1 - Point 4: API Documentation (10%)

All endpoints use the base prefix: **`/exam/v1.0.0`**

---

## 📚 Student

- <span style="color:#00c47c">POST</span> `/exam/v1.0.0/students` `application/json` - `CreateStudentDto` - `StudentEntity`
- <span style="color:#ff6c6c">DELETE</span> `/exam/v1.0.0/students/:id` `none` - `string` - `DeleteResult`

---

## 🧑‍🏫 Professor

- <span style="color:#00c47c">POST</span> `/exam/v1.0.0/professors` `application/json` - `CreateProfessorDto` - `ProfessorEntity`
- <span style="color:#906cff">PATCH</span> `/exam/v1.0.0/professors/:professor-id/project=:project-id` `none` - `Params` - `ProfessorEntity`
- <span style="color:#ff6c6c">DELETE</span> `/exam/v1.0.0/professors/:id` `none` - `string` - `DeleteResult`

---

## 📁 Project

- <span style="color:#00c47c">POST</span> `/exam/v1.0.0/projects` `application/json` - `CreateProjectDto` - `ProjectEntity`
- <span style="color:#906cff">PATCH</span> `/exam/v1.0.0/projects/:id/advance` `none` - `string` - `ProjectEntity`
- <span style="color:#00c47c">GET</span> `/exam/v1.0.0/projects/:id/students` `none` - `string` - `StudentEntity[]`

---

## 📝 Evaluation

- <span style="color:#00c47c">POST</span> `/exam/v1.0.0/evaluations` `application/json` - `CreateEvaluationDto` - `EvaluationEntity`
- <span style="color:#00c47c">GET</span> `/exam/v1.0.0/evaluations` `none` - `none` - `EvaluationEntity[]`
- <span style="color:#00c47c">GET</span> `/exam/v1.0.0/evaluations/:id` `none` - `string` - `EvaluationEntity`
- <span style="color:#906cff">PATCH</span> `/exam/v1.0.0/evaluations/:id` `application/json` - `UpdateEvaluationDto` - `EvaluationEntity`
- <span style="color:#ff6c6c">DELETE</span> `/exam/v1.0.0/evaluations/:id` `none` - `string` - `DeleteResult`

---

## ✏️ DTO Descriptions

### `CreateStudentDto`
- `document` (int) 
- `name` (string)
- `semester` (int)
- `program` (string)
- `average` (float)
- `projects` (string[])

### `CreateProfessorDto`
- `document` (int)
- `name` (string)
- `department` (string)
- `extension` (5-digit int)
- `peer` (boolean)
- `evaluations` (string[])
- `mentorships` (string[])

### `CreateProjectDto`
- `title` (string > 15 chars)
- `area` (string)
- `budget` (float > 0)
- `grade?` (float)
- `status?` (int)
- `start?` (ISO string)
- `end?` (ISO string)
- `leader` (string)
- `mentor` (string)
- `evaluations?` (string[])

### `CreateEvaluationDto`
- `evaluator` (string)
- `project` (string)

### `UpdateEvaluationDto`
- `evaluator?` (string)
- `project?` (string)
