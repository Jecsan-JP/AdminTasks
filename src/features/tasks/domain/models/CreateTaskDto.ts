// src/features/tasks/domain/models/CreateTaskDto.ts
export interface CreateTaskDto {
  title: string;
  description: string;
  status: string;
  parentTaskId?: string; // Opcional, solo para subtareas
}
