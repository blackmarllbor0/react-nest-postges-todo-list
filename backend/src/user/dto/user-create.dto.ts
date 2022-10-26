import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
