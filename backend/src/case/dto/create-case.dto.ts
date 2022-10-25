import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCaseDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  description: string;
}
