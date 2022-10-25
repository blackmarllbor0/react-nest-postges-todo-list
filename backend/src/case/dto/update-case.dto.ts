import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCaseDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;
}
