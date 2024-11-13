import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret:
        'fb149ce96d0ab544338291e60ae9f65eb8b6b8f90be6929c574304cea3d04a599b4f2cce4894f2fbdceb5a6753fdadd4a9e39d2c70e03b78bdc588771899b8fc',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
