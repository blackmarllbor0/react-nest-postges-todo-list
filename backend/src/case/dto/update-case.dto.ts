import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCaseDto {
  @IsNumber()
  @IsOptional()
  public id: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public description: string;
}
