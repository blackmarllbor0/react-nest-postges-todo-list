import { UnauthorizedException } from '@nestjs/common';

export class AuthorizationExecpion extends UnauthorizedException {
  constructor() {
    super('Wrong credentials provided');
  }
}
