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
import { BrandsService } from 'src/modules/products/services/brands.service';
// dtos
import {
  CreateBrandDto,
  UpdateBrandDto,
} from 'src/modules/products/dtos/brands.dto';

@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  getBrands(@Query('offset') offset = 0, @Query('limit') limit = 100) {
    const brandsFound = this.brandsService.findAll();
    return {
      message: `Brands found, Limit: ${limit} offset: ${offset}`,
      data: brandsFound,
    };
  }

  @Post()
  createBrand(@Body() brandDto: CreateBrandDto) {
    const brandCreated = this.brandsService.create(brandDto);
    return {
      message: 'Brand created',
      data: brandCreated,
    };
  }

  @Get(':brandId')
  getBrand(@Param('brandId', ParseIntPipe) brandId: string) {
    const brandFound = this.brandsService.findOne(+brandId);
    return {
      message: `Brand found ${brandId}`,
      data: brandFound,
    };
  }

  @Put(':brandId')
  updateBrand(
    @Param('brandId', ParseIntPipe) brandId: string,
    @Body() brandDto: UpdateBrandDto,
  ) {
    const brandUpdated = this.brandsService.update(+brandId, brandDto);
    return {
      message: `Brand ${brandId} updated`,
      data: brandUpdated,
    };
  }

  @Delete(':brandId')
  removeBrand(@Param('brandId', ParseIntPipe) brandId: string) {
    const brandRemoved = this.brandsService.remove(+brandId);
    return {
      message: `Brand ${brandId} removed`,
      data: brandRemoved,
    };
  }
}
