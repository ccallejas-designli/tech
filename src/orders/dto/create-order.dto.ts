import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: 1, required: true })
  productId: number;

  @ApiProperty({ example: 1, required: true })
  quantity: number;
}
