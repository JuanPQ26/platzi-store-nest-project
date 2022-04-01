import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCustomersDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  lastName: string;

  @IsNumberString()
  @MaxLength(10)
  @IsNotEmpty()
  phone: string;
}

export class UpdateCustomersDto extends PartialType(CreateCustomersDto) {}
