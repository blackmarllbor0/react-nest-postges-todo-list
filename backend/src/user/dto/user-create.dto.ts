import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class UserCreateDto {
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(15, {
    message: 'Your name cannot be more than 15 characters long',
  })
  name: string;

  @IsEmail({}, { message: 'Your email is not valid' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}
