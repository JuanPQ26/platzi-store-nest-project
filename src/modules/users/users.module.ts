import { Module } from '@nestjs/common';

// modules
import { ProductsModule } from '../products/products.module';
// controllers
import { CustomersController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';
// services
import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [ProductsModule],
  controllers: [CustomersController, UsersController],
  providers: [CustomersService, UsersService],
})
export class UsersModule {}
