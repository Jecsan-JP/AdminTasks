// src/features/login/domain/models/RegisterResponseDto.ts
export interface RegisterResponseDto {
  username: string;
  password: string; // encriptado, no lo necesitas mostrar
  _id: string;
  __v: number;
}
