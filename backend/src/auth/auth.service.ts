import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { PostgresErrorCode } from 'src/database/postgres.error-code';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { AuthorizationExecpion } from './exception/authorization.filter';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * this method is responsible for user registration
   * if there is already a user with that email:
   * it returns an error and reports it
   * @param dto the model to be transmitted by the user
   * @returns return the created user
   */
  public async register(dto: RegisterDto): Promise<User> {
    const hashPassword = await hash(dto.password, 10);
    try {
      const newUser = await this.userService.create({
        ...dto,
        password: hashPassword,
      });
      newUser.password = undefined;
      return newUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with what email already exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * method searches for a user by email, then checks passwords
   * entered by the user and hashed from the database
   * it returns either authorized user or invalid data error
   * @param email email of the user to be found
   * @param plainTextPass the password that the user enters
   * @returns return the authorized user
   */
  public async getAuthenticateUser(
    email: string,
    plainTextPass: string,
  ): Promise<User> {
    try {
      const user = await this.userService.getByEmail(email);
      await this.verifyPassword(plainTextPass, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new AuthorizationExecpion();
    }
  }

  /**
   * the method get two passwords: user and hash
   * it checks them, using a special func,
   * and if they don't match, it generates an error
   * about the wrong data
   * @param plainTextPass the password that the user enters
   * @param hashPass password encrypted from the database
   */
  private async verifyPassword(
    plainTextPass: string,
    hashPass: string,
  ): Promise<void> {
    const isPasswordMatching = await compare(plainTextPass, hashPass);
    if (!isPasswordMatching) {
      throw new AuthorizationExecpion();
    }
  }

  /**
   * the method gets the cookie with jwt
   * @param userId user id
   * @returns cookie header
   */
  public getCookieWithJwtToken(userId: number): string {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token};HttpOnly;Path=/;Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  /**
   * clears the cookie
   * @returns logout
   */
  public getCookieForLogOut(): string {
    return `Authentication=;HttpOnly;Path=/;Max-Age=0`;
  }
}
