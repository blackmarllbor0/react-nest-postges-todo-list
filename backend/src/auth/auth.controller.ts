import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
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
  public async login(
    @Req() request: RequestWithUser,
    @Res() responce: Response,
  ) {
    const user = request.user;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    responce.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return responce.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logOut')
  public async logOut(
    @Req() request: RequestWithUser,
    @Res() responce: Response,
  ): Promise<Response> {
    responce.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return responce.sendStatus(200);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('authenticate')
  public async authenticate(@Req() request: RequestWithUser): Promise<User> {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
