import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from 'src/auth/auth.module';
import { CaseModule } from 'src/case/case.module';
import { CategoryModule } from 'src/category/category.module';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';
import { ExceptionsLoggerFilter } from 'src/utils/exceptionsLogger.filter';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    DatabaseModule,
    UserModule,
    AuthModule,
    CaseModule,
    CategoryModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
