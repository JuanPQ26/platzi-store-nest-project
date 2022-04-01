import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from 'src/modules/products/entities/category.entity';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/modules/products/dtos/categories.dto';

@Injectable()
export class CategoriesService {
  private categoryCounter = 1;
  private categories: Category[] = [
    {
      id: 1,
      name: 'Category 1',
    },
  ];

  findAll(): Category[] {
    return this.categories;
  }

  findOne(categoryId: number): Category {
    const categoryFound = this.categories.find(
      (item) => item.id === categoryId,
    );
    if (!categoryFound) {
      throw new NotFoundException(`Category ${categoryId} not found`);
    }
    return categoryFound;
  }

  create(categoryDto: CreateCategoryDto): Category {
    this.categoryCounter = this.categoryCounter + 1;
    const newCategory: Category = {
      id: this.categoryCounter,
      ...categoryDto,
    };
    return newCategory;
  }

  update(categoryId: number, categoryDto: UpdateCategoryDto): Category {
    const categoryFound = this.findOne(categoryId);
    const categoryIndex = this.categories.findIndex(
      (item) => item.id === categoryId,
    );
    this.categories[categoryIndex] = {
      ...categoryFound,
      ...categoryDto,
    };
    return this.categories[categoryIndex];
  }

  remove(categoryId: number): Category {
    const categoryFound = this.findOne(categoryId);
    const categoryIndex = this.categories.findIndex(
      (item) => item.id === categoryId,
    );
    this.categories.splice(categoryIndex);
    return categoryFound;
  }
}
