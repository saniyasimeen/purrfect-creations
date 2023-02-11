import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/user/user.dto';
import { UserService } from '../user/user.service';
import { LocalAuthResponseDto } from './auth.dto';
import { JwtAuthService } from './jwt/jwt-auth.service';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtAuthService: JwtAuthService,
  ) {}

  login(user: UserDto): LocalAuthResponseDto {
    return {
      access_token: this.jwtAuthService.getJwtToken(user),
    };
  }

  async changePassword(
    user: UserDto,
    password: string,
  ): Promise<LocalAuthResponseDto> {
    const hashedPassword = await hash(password, 10);
    await this.userService.updatePassword(user.id, hashedPassword);

    return {
      access_token: this.jwtAuthService.getJwtToken(user),
    };
  }
}
