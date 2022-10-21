import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserLoginDto {
  @IsEmail({}, { message: 'Your email is not valid' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}
