import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'testuser', required: true })
  username: string;

  @ApiProperty({ example: 'password', required: true })
  password: string;
}
