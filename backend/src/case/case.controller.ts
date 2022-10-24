import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Case } from './case.entity';
import { CaseService } from './case.service';
import { CreateCaseDto } from './dto/create-case.dto';

@Controller('case')
export class CaseController {
  constructor(private readonly caseService: CaseService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  @UseGuards(JwtAuthGuard)
  public async create(@Body() dto: CreateCaseDto): Promise<Case> {
    return this.caseService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('getAllCases')
  public async getAllCases(): Promise<Case[]> {
    return this.caseService.getAllCases();
  }

  @HttpCode(HttpStatus.OK)
  @Get('getCaseById/:id')
  public async getCaseById(@Param('id') id: number): Promise<Case> {
    return this.caseService.getCaseById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('getCaseByName/:name')
  public async getCaseByName(@Param('name') name: string): Promise<Case> {
    return this.caseService.getCaseByName(name);
  }
}
