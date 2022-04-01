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
import { CustomersService } from 'src/modules/users/services/customers.service';
// pipes
import { ParseIntPipe } from 'src/common/parse-int.pipe';
// dtos
import {
  CreateCustomersDto,
  UpdateCustomersDto,
} from 'src/modules/users/dtos/customers.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}
  @Get()
  getCustomers(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    const customersFound = this.customersService.findAll();
    return {
      message: `Customers found, Limit: ${limit} offset: ${offset}`,
      data: customersFound,
    };
  }

  @Post()
  createCustomer(@Body() customerDto: CreateCustomersDto) {
    const customerCreated = this.customersService.create(customerDto);
    return {
      message: 'Customer created',
      data: customerCreated,
    };
  }

  @Get(':customerId')
  getCustomer(@Param('customerId', ParseIntPipe) customerId: string) {
    const customerFound = this.customersService.findOne(+customerId);
    return {
      message: `Customer found ${customerId}`,
      data: customerFound,
    };
  }

  @Put(':customerId')
  updateCustomer(
    @Param('customerId', ParseIntPipe) customerId: string,
    @Body() customerDto: UpdateCustomersDto,
  ) {
    const customerUpdated = this.customersService.update(
      +customerId,
      customerDto,
    );
    return {
      message: `Customer ${customerId} updated`,
      data: customerUpdated,
    };
  }

  @Delete(':customerId')
  removeCustomer(@Param('customerId', ParseIntPipe) customerId: string) {
    const customerRemoved = this.customersService.remove(+customerId);
    return {
      message: `Customer ${customerId} removed`,
      data: customerRemoved,
    };
  }
}
