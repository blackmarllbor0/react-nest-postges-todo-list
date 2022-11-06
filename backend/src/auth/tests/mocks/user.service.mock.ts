import { UserCreateDto } from '../../../user/dto/user-create.dto';
import { User } from '../../../user/user.entity';

export class userServiceMock {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(_user: UserCreateDto) {
    return new User();
  }
}
