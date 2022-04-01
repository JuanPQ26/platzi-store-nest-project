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
import { UsersService } from 'src/modules/users/services/users.service';
// dtos
import { CreateUserDto, UpdateUserDto } from 'src/modules/users/dtos/users.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    const usersFound = this.usersService.findAll();
    return {
      message: `Users found, Limit ${limit} offset ${offset}`,
      data: usersFound,
    };
  }

  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    const userCreated = this.usersService.create(userDto);
    return {
      message: 'User created',
      data: userCreated,
    };
  }

  @Get(':userId')
  getUser(@Param('userId', ParseIntPipe) userId: string) {
    const userFound = this.usersService.findOne(+userId);
    return {
      message: `User ${userId} found`,
      data: userFound,
    };
  }
  @Get(':userId/orders')
  getOrders(@Param('userId', ParseIntPipe) userId: string) {
    const orderFound = this.usersService.getOrdersByUser(+userId);
    return {
      message: `User ${userId} found`,
      data: orderFound,
    };
  }

  @Put(':userId')
  updateUser(
    @Param('userId', ParseIntPipe) userId: string,
    @Body() userDto: UpdateUserDto,
  ) {
    const userUpdated = this.usersService.update(+userId, userDto);
    return {
      message: `User ${userId} updated`,
      data: userUpdated,
    };
  }

  @Delete(':userId')
  removeUser(@Param('userId', ParseIntPipe) userId: string) {
    const userRemoved = this.usersService.remove(+userId);
    return {
      message: `User ${userId} removed`,
      data: userRemoved,
    };
  }
}
