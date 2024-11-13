import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'testuser', required: true })
  username: string;

  @ApiProperty({ example: 'password', required: true })
  password: string;
}
