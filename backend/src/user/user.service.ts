import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async register(dto: UserRegisterDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (user) {
      throw new UnauthorizedException('Such a user already exist');
    }
    const salt = Number(this.configService.get('SALT'));
    return await this.userRepository.save({
      ...dto,
      password: await hash(dto.password, salt),
    });
  }

  public async login(dto: UserLoginDto) {
    // return await this.jwtService.;
  }

  public async validateUser(dto: UserLoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
  }
}
