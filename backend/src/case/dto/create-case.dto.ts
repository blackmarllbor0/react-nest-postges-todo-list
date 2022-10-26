import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCaseDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  public name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  public description: string;
}
