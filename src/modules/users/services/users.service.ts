import { Injectable, NotFoundException } from '@nestjs/common';

// services
import { ProductsService } from 'src/modules/products/services/products.service';
// entities
import { User } from 'src/modules/users/entities/user.entity';
import { Order } from '../entities/order.entity';
// dtos
import { CreateUserDto, UpdateUserDto } from 'src/modules/users/dtos/users.dto';

@Injectable()
export class UsersService {
  constructor(private productsService: ProductsService) {}

  counterId = 1;

  users: User[] = [
    {
      id: 1,
      username: 'juanpq',
      password: '123456789',
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(userId: number): User {
    const userFound = this.users.find((item) => item.id === userId);
    if (!userFound) throw new NotFoundException(`User ${userId} found`);
    return userFound;
  }

  getOrdersByUser(userId: number): Order {
    const userFound = this.findOne(userId);
    return {
      date: new Date(),
      user: userFound,
      products: this.productsService.findAll(),
    };
  }

  create(userDto: CreateUserDto): User {
    this.counterId = this.counterId + 1;

    const newUser: User = {
      id: this.counterId,
      ...userDto,
    };
    this.users.push(newUser);

    return newUser;
  }

  update(userId: number, userDto: UpdateUserDto): User {
    const userFound = this.findOne(userId);

    const userIndex = this.users.findIndex((item) => item.id == userId);
    this.users[userIndex] = {
      ...userFound,
      ...userDto,
    };

    return this.users[userIndex];
  }

  remove(userId: number): User {
    const userFound = this.findOne(userId);
    const userIndex = this.users.findIndex((item) => item.id == userId);
    this.users.splice(userIndex);
    return userFound;
  }
}
