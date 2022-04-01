import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
// pipes
import { ParseIntPipe } from 'src/common/parse-int.pipe';
// services
import { CategoriesService } from 'src/modules/products/services/categories.service';
// dtos
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/modules/products/dtos/categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategories(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    const categoriesFound = this.categoriesService.findAll();
    return {
      message: `Categories found, Limit ${limit} offset ${offset}`,
      data: categoriesFound,
    };
  }

  @Post()
  createCategory(@Body() categoryDto: CreateCategoryDto) {
    const categoryCreated = this.categoriesService.create(categoryDto);
    return {
      message: 'Category created',
      data: categoryCreated,
    };
  }

  @Get(':categoryId/')
  getCategory(@Param('categoryId', ParseIntPipe) categoryId: string) {
    const categoryFound = this.categoriesService.findOne(+categoryId);
    return {
      message: `Category found ${categoryId}`,
      data: categoryFound,
    };
  }

  @Put(':categoryId')
  updateCategory(
    @Param('categoryId', ParseIntPipe) categoryId: string,
    @Body() categoryDto: UpdateCategoryDto,
  ) {
    const categoryUpdated = this.categoriesService.update(
      +categoryId,
      categoryDto,
    );
    return {
      message: `Category ${categoryId} updated`,
      data: categoryUpdated,
    };
  }

  @Delete(':categoryId')
  removeCategory(@Param(':categoryId', ParseIntPipe) categoryId: string) {
    const categoryRemoved = this.categoriesService.remove(+categoryId);
    return {
      message: `Category ${categoryId} removed`,
      data: categoryRemoved,
    };
  }
}
