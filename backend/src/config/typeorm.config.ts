import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function typeormConfig(
  configService: ConfigService,
): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    password: String(configService.get('POSTGRES_PASSWORD')),
    username: configService.get('POSTGRES_USER'),
    database: configService.get('POSTGRES_DB'),
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
  };
}
