import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from 'src/modules/users/entities/customer.entity';
import {
  CreateCustomersDto,
  UpdateCustomersDto,
} from 'src/modules/users/dtos/customers.dto';

@Injectable()
export class CustomersService {
  private counterId = 1;
  private customers: Customer[] = [
    {
      id: 1,
      firstName: 'Juan',
      lastName: 'Pablo',
      phone: '3011122345',
    },
  ];

  findAll(): Customer[] {
    return this.customers;
  }

  findOne(customerId: number): Customer {
    const customerFound = this.customers.find((item) => item.id === customerId);
    if (!customerFound) {
      throw new NotFoundException(`Customer ${customerId} not found`);
    }
    return customerFound;
  }

  create(customerDto: CreateCustomersDto): Customer {
    this.counterId = this.counterId + 1;
    const newCustomer = {
      id: this.counterId,
      ...customerDto,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  update(customerId: number, customerDto: UpdateCustomersDto): Customer {
    const customerFound = this.findOne(customerId);
    const customerIndex = this.customers.findIndex(
      (item) => item.id === customerId,
    );
    this.customers[customerId] = {
      ...customerFound,
      ...customerDto,
    };
    return this.customers[customerIndex];
  }

  remove(customerId: number): Customer {
    const customerFound = this.findOne(customerId);
    const customerIndex = this.customers.findIndex(
      (item) => item.id === customerId,
    );
    this.customers.splice(customerIndex);
    return customerFound;
  }
}
