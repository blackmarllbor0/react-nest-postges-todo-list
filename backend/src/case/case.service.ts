import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Case } from './case.entity';
import { CreateCaseDto } from './dto/create-case.dto';
import { CaseNotFoundException } from './exceptions/case-not-found.filter';
import { UpdateCaseDto } from './dto/update-case.dto';

@Injectable()
export class CaseService {
  constructor(
    @InjectRepository(Case) private readonly caseRepository: Repository<Case>,
  ) {}

  /**
   * created a new case
   * @param dto generated by the new case
   * @returns Or a new case, or an error if there
   * are already cases with what name
   */
  public async create(dto: CreateCaseDto, user: User): Promise<Case> {
    const post = await this.caseRepository.findOne({
      where: { name: dto.name },
    });
    if (post) {
      throw new HttpException(
        'A case with that name already exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.caseRepository.save({ ...dto, author: user });
  }

  /**
   * looking for things to do
   * @returns found cases or 404 error
   */
  public async getAllCases(): Promise<Case[]> {
    const cases = await this.caseRepository.find({ relations: ['author'] });
    if (cases.length) return cases;
    throw new HttpException('No cases found', HttpStatus.NOT_FOUND);
  }

  /**
   * searching for a case by id
   * @param id id by which the case will be searced for
   * @returns found case or 404 error
   */
  public async getCaseById(id: number): Promise<Case> {
    const post = await this.caseRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (post) return post;
    throw new CaseNotFoundException('id');
  }

  /**
   * searching for a case by name
   * @param name name by which the case will be searced for
   * @returns found case or 404 error
   */
  public async getCaseByName(name: string): Promise<Case> {
    const post = await this.caseRepository.findOne({ where: { name } });
    if (post) return post;
    throw new CaseNotFoundException('name');
  }

  public async updateCase(id: number, post: UpdateCaseDto): Promise<Case[]> {
    await this.caseRepository.update(id, post);
    const updatePost = await this.caseRepository.find({
      where: { id },
      relations: ['author'],
    });
    if (updatePost) {
      return updatePost;
    }
    throw new CaseNotFoundException('id');
  }
}
