import { Injectable, NotFoundException } from '@nestjs/common';
// entities
import { Product } from 'src/modules/products/entities/product.entity';
// dtos
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/modules/products/dtos/products.dto';

@Injectable()
export class ProductsService {
  private counterId = 1;

  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'This is product 1',
      price: 200,
      stock: 2,
      image: '',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(productId: number) {
    const productFound = this.products.find((item) => item.id === productId);
    if (!productFound) {
      throw new NotFoundException(`Product ${productId} not found`);
    }
    return productFound;
  }

  create(productDto: CreateProductDto) {
    this.counterId = this.counterId + 1;
    const newProduct: Product = {
      id: this.counterId,
      ...productDto,
    };
    this.products.push(newProduct);

    return newProduct;
  }

  update(productId: number, productDto: UpdateProductDto) {
    const productFound = this.findOne(productId);

    const productIndex = this.products.findIndex(
      (item) => item.id === productId,
    );
    this.products[productIndex] = {
      ...productFound,
      ...productDto,
    };
    return this.products[productIndex];
  }

  remove(productId: number) {
    const productFound = this.findOne(productId);

    const productIndex = this.products.findIndex(
      (item) => item.id === productId,
    );
    this.products.splice(productIndex);
    return productFound;
  }
}
