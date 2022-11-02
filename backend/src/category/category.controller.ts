import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Put,
} from '@nestjs/common';
import { FindOneParams } from 'src/utils/find-one-param';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @HttpCode(HttpStatus.OK)
  @Get('getAllCategories')
  public async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @HttpCode(HttpStatus.OK)
  @Get('getCategoryById/:id')
  public async getCategoryById(
    @Param() { id }: FindOneParams,
  ): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

  @Patch('updateCategory/:id')
  public async updateCategorya(
    @Param() { id }: FindOneParams,
    @Body() dto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateCategorya(id, dto);
  }
}
