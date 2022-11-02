import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FindOneParams, FindOneParamsByName } from 'src/utils/find-one-param';
import { Case } from './case.entity';
import { CaseService } from './case.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { RequestWithUser } from '../auth/interfaces/user-request.interface';
import { UpdateCaseDto } from './dto/update-case.dto';

@Controller('case')
export class CaseController {
  constructor(private readonly caseService: CaseService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  @UseGuards(JwtAuthGuard)
  public async create(
    @Body() dto: CreateCaseDto,
    @Req() { user }: RequestWithUser,
  ): Promise<Case> {
    return this.caseService.create(dto, user);
  }

  @HttpCode(HttpStatus.OK)
  @Get('getAllCases')
  public async getAllCases(): Promise<Case[]> {
    return this.caseService.getAllCases();
  }

  @HttpCode(HttpStatus.OK)
  @Get('getCaseById/:id')
  public async getCaseById(@Param() { id }: FindOneParams): Promise<Case> {
    return this.caseService.getCaseById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('getCaseByName/:name')
  public async getCaseByName(
    @Param() { name }: FindOneParamsByName,
  ): Promise<Case> {
    return this.caseService.getCaseByName(name);
  }

  @HttpCode(200)
  @Put('updateCase/:id')
  @UseGuards(JwtAuthGuard)
  public async updateCase(
    @Param() { id }: FindOneParams,
    @Body() updateCase: UpdateCaseDto,
  ): Promise<Case[]> {
    return this.caseService.updateCase(id, updateCase);
  }
}
