import { CategoryService } from '../category.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from '../category.entity';

describe('CategoryService', () => {
  let service: CategoryService;
  let find: jest.Mock, findOne: jest.Mock, update: jest.Mock;
  beforeEach(async () => {
    (find = jest.fn()), (findOne = jest.fn()), (update = jest.fn());
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: { find, findOne, update },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllCategories', () => {
    let result: Category[];
    beforeEach(() => {
      result = [new Category()];
      find.mockReturnValue([new Category()]);
    });
    it('should be return all categories', async () => {
      const getAllCategories = await service.getAllCategories();
      expect(getAllCategories).toEqual(result);
    });
  });

  describe('getCategoryById', () => {
    let id: number;
    let result: Category;
    beforeEach(() => {
      id = 1;
      result = new Category();
      findOne.mockReturnValue(new Category());
    });
    it('should be return a find category', async () => {
      const getCategoryById = await service.getCategoryById(id);
      expect(getCategoryById).toEqual(result);
    });
  });

  describe('updateCategory', () => {
    let id: number, category: Category;
    let result: Category;
    beforeEach(() => {
      id = 1;
      category = new Category();
      result = new Category();
      update.mockReturnValue(new Category());
      findOne.mockReturnValue(new Category());
    });
    it('should be return updating cayegory', async () => {
      const updateCategory = await service.updateCategory(id, category);
      expect(updateCategory).toEqual(result);
    });
  });
});
