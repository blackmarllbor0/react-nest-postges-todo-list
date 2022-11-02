import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from './interfaces/user-request.interface';

/**
 * for semilar logic, see the auth.service.ts
 * @file src/auth/auth.service.ts
 */

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  public async register(@Body() dto: RegisterDto): Promise<User> {
    return await this.authService.register(dto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() { user, res }: RequestWithUser): Promise<User> {
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    res.setHeader('Set-Cookie', cookie);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logOut')
  public async logOut(@Req() { res }: RequestWithUser): Promise<Response> {
    res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return res.sendStatus(200);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('authenticate')
  public async authenticate(@Req() { user }: RequestWithUser): Promise<User> {
    return user;
  }
}
