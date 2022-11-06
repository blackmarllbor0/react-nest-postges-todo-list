import { CaseService } from '../case.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Case } from '../case.entity';
import { CreateCaseDto } from '../dto/create-case.dto';
import { User } from '../../user/user.entity';
import { UpdateCaseDto } from '../dto/update-case.dto';

describe('CaseService', () => {
  let service: CaseService;
  let findOne: jest.Mock, save: jest.Mock, find: jest.Mock, update: jest.Mock;
  beforeEach(async () => {
    (findOne = jest.fn()),
      (save = jest.fn()),
      (find = jest.fn()),
      (update = jest.fn());
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CaseService,
        {
          provide: getRepositoryToken(Case),
          useValue: { findOne, save, find, update },
        },
      ],
    }).compile();

    service = module.get<CaseService>(CaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    let dto: CreateCaseDto;
    let post: Case;
    let user: User;
    beforeEach(() => {
      dto = { name: 'testing name', description: 'description' };
      post = new Case();
      user = new User();
      findOne.mockReturnValue(undefined);
      save.mockReturnValue(new Case());
    });
    it('should be return a new case', async () => {
      const create = await service.create(dto, user);
      expect(create).toEqual(post);
    });
  });

  describe('getAllCases', () => {
    let allCases: Case[];
    beforeEach(() => {
      allCases = [new Case()];
      find.mockReturnValue([new Case()]);
    });
    it('should return a cases array', async () => {
      const getAllCases = await service.getAllCases();
      expect(getAllCases).toEqual(allCases);
    });
  });

  describe('getCaseById', () => {
    let post: Case, id: number;
    beforeEach(() => {
      post = new Case();
      findOne.mockReturnValue(new Case());
      id = 1;
    });
    it('should be return a find case', async () => {
      const getCaseById = await service.getCaseById(id);
      expect(getCaseById).toEqual(post);
    });
  });

  describe('getCaseByName', () => {
    let post: Case, name: string;
    beforeEach(() => {
      post = new Case();
      findOne.mockReturnValue(new Case());
      name = 'name';
    });
    it('should be return a find case', async () => {
      const getCaseById = await service.getCaseByName(name);
      expect(getCaseById).toEqual(post);
    });
  });

  describe('updateCase', () => {
    let dto: UpdateCaseDto, id: number;
    let post: Case, newPost: Case;
    beforeEach(() => {
      dto = {
        name: 'name',
        description: 'description',
        id: 1,
      };
      id = 1;
      post = new Case();
      newPost = new Case();
      find.mockReturnValue(post);
      update.mockReturnValue([new Case()]);
    });
    it('should be return updating case', async () => {
      const updateCase = await service.updateCase(id, newPost);
      expect(updateCase).toEqual(new Case());
    });
  });
});
