import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryNotFoundException } from './exceptions/category-not-found.filter';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  public async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['cases'] });
  }

  public async getCategoryById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (category) {
      return category;
    }
    throw new CategoryNotFoundException();
  }

  public async updateCategorya(
    id: number,
    category: UpdateCategoryDto,
  ): Promise<Category> {
    await this.categoryRepository.update(id, category);
    const updateCategory = await this.categoryRepository.findOne({
      where: { id },
      relations: ['cases'],
    });
    if (updateCategory) {
      return updateCategory;
    }
    throw new CategoryNotFoundException();
  }
}
