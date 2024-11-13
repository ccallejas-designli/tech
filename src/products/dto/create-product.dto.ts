import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
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
