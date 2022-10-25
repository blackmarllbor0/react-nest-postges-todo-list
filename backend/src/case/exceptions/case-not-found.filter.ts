import { NotFoundException } from '@nestjs/common';

export class CaseNotFoundException extends NotFoundException {
  constructor(fieldName: string) {
    super(`Case with this ${fieldName} does not exist`);
  }
}
