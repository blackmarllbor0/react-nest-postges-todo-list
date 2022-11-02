import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsNumber()
  @IsOptional()
  public id: number;

  @IsString()
  @IsOptional()
  public name: string;
}
