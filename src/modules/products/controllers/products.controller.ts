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
// services
import { ProductsService } from 'src/modules/products/services/products.service';
// pipes.
import { ParseIntPipe } from 'src/common/parse-int.pipe';
// dtos
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/modules/products/dtos/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  getProducts(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    const productsFound = this.productService.findAll();
    return {
      statusCode: 200,
      message: `Products found, Limit: ${limit} offset: ${offset}`,
      data: productsFound,
    };
  }

  @Post()
  createProduct(@Body() productDto: CreateProductDto) {
    const productCreated = this.productService.create(productDto);

    return {
      statusCode: 201,
      message: 'Product created',
      data: productCreated,
    };
  }

  @Get(':productId')
  getProduct(@Param('productId', ParseIntPipe) productId: string) {
    const productFound = this.productService.findOne(+productId);
    return {
      statusCode: 200,
      message: `Product found ${productId}`,
      data: productFound,
    };
  }

  @Put(':productId')
  updateProduct(
    @Param('productId', ParseIntPipe) productId: string,
    @Body() productDto: UpdateProductDto,
  ) {
    const productUpdated = this.productService.update(+productId, productDto);
    return {
      statusCode: 201,
      message: `Product ${productId} updated`,
      data: productUpdated,
    };
  }

  @Delete(':productId')
  removeProduct(@Param('productId', ParseIntPipe) productId: string) {
    const productRemoved = this.productService.remove(+productId);
    return {
      statusCode: 200,
      message: `Product ${productId} removed`,
      data: productRemoved,
    };
  }
}
