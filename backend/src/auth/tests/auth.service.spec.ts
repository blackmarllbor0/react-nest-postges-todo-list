import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../user/user.entity';
import { UserService } from '../../user/user.service';
import { configServiceMock } from './mocks/configService.mock';
import { jwtServiceMock } from './mocks/jwt.service.mock';
import { UserCreateDto } from '../../user/dto/user-create.dto';
import { userServiceMock } from './mocks/user.service.mock';

describe('AuthService', () => {
  let service: AuthService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useClass: userServiceMock,
        },
        {
          provide: ConfigService,
          useClass: configServiceMock,
        },
        {
          provide: JwtService,
          useClass: jwtServiceMock,
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    let dto: UserCreateDto;
    let user: User;
    beforeEach(() => {
      dto = {
        email: 'test@mail.com',
        name: 'test name',
        password: 'test password',
      };
      user = new User();
    });
    it('should return a new user', async () => {
      const register = await service.register(dto);
      expect(register).toEqual(user);
    });
  });

  describe('getCookieWithJwtToken', () => {
    it('should return a string', () => {
      expect(typeof service.getCookieWithJwtToken(1)).toEqual('string');
    });
  });

  describe('getCookieForLogOut', () => {
    it('should return a string', function () {
      expect(typeof service.getCookieForLogOut()).toEqual('string');
    });
  });
});
