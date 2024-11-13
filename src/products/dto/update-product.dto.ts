import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({ example: 'Product Name', required: true })
  name?: string;

  @ApiProperty({
    example: 'This is an product description.',
    required: true,
  })
  description?: string;

  @ApiProperty({ example: 150, required: true })
  price?: number;

  @ApiProperty({ example: 20, required: true })
  stock?: number;
}
