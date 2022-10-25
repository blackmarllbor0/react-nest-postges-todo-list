import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/user/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  /**
   * func for local strategy
   * @param email user email
   * @param password user password
   * @returns user model
   */
  public async validate(email: string, password: string): Promise<User> {
    return await this.authService.getAuthenticateUser(email, password);
  }
}
