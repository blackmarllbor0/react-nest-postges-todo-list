import { User } from '../../user.entity';

export class RepositoryMock {
  async findOne() {
    return new User();
  }

  async save() {
    return new User();
  }
}
