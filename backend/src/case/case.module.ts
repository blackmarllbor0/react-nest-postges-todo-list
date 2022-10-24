import { Module } from '@nestjs/common';
import { CaseService } from './case.service';
import { CaseController } from './case.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Case } from './case.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Case])],
  providers: [CaseService],
  controllers: [CaseController],
})
export class CaseModule {}
