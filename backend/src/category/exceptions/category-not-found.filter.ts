import { NotFoundException } from '@nestjs/common';

export class CategoryNotFoundException extends NotFoundException {
  constructor() {
    super('Category with this id does not exist');
  }
}
