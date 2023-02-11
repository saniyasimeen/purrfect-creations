import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthModule } from './jwt/jwt-auth.module';
import { LocalAuthModule } from './local/local.module';

@Module({
  imports: [UserModule, JwtAuthModule, LocalAuthModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
