import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from 'src/modules/products/entities/brand.entity';
import {
  CreateBrandDto,
  UpdateBrandDto,
} from 'src/modules/products/dtos/brands.dto';

@Injectable()
export class BrandsService {
  private counterId = 1;
  private brands: Brand[] = [
    {
      id: 1,
      name: 'Brand 1',
      image: 'https://i.imgur.com/U4iGx1j.jpeg',
    },
  ];

  findAll(): Brand[] {
    return this.brands;
  }

  findOne(brandId: number): Brand {
    const brandFound = this.brands.find((item) => item.id === brandId);
    if (!brandFound) throw new NotFoundException(`Brand ${brandId} not found`);
    return brandFound;
  }

  create(brandDto: CreateBrandDto): Brand {
    this.counterId = this.counterId + 1;
    const newBrand = {
      id: this.counterId,
      ...brandDto,
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  update(brandId: number, brandDto: UpdateBrandDto): Brand {
    const brandFound = this.findOne(brandId);
    const brandIndex = this.brands.findIndex((item) => item.id === brandId);
    this.brands[brandIndex] = {
      ...brandFound,
      ...brandDto,
    };

    return this.brands[brandIndex];
  }

  remove(brandId: number): Brand {
    const brandFound = this.findOne(brandId);
    const brandIndex = this.brands.findIndex((item) => item.id === brandId);
    this.brands.splice(brandIndex);
    return brandFound;
  }
}
