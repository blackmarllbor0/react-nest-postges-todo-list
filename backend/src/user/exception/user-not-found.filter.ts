import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(fieldName: string) {
    super(`User with this ${fieldName} does not exist`);
  }
}
