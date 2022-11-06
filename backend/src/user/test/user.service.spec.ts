import { UserService } from '../user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { UserCreateDto } from '../dto/user-create.dto';
import { RepositoryMock } from './mocks/repository.mock';

describe('UserService', () => {
  let userService: UserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: RepositoryMock,
        },
      ],
    }).compile();
    userService = await module.get(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('getByEmail', () => {
    let user: User;
    beforeEach(() => {
      user = new User();
    });
    it('should return the user', async () => {
      const fetchUser = await userService.getByEmail('test@mail.ru');
      expect(fetchUser).toEqual(user);
    });
  });

  describe('getById', () => {
    let user: User;
    beforeEach(() => {
      user = new User();
    });
    it('should return the user', async () => {
      const fetchUser = await userService.getById(1);
      expect(fetchUser).toEqual(user);
    });
  });

  describe('create', () => {
    let dto: UserCreateDto, user: User;
    beforeEach(() => {
      dto = {
        email: 'ertyu@mail.ru',
        name: 'name',
        password: 'password',
      };
      user = new User();
    });
    it('should return a created user', async () => {
      const createNewUser = await userService.create(dto);
      expect(createNewUser).toEqual(user);
    });
  });
});
