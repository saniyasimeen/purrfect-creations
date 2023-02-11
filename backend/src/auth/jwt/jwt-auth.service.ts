import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/user.dto';
import { JwtPayload } from './jwt-auth.strategy';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  getJwtToken(user: UserDto) {
    const { id, username } = user;

    const payload: JwtPayload = {
      sub: id,
      username,
    };
    return this.jwtService.sign(payload);
  }

  async decodeJwtToken(token: string) {
    try {
      return this.jwtService.verify(token) as JwtPayload;
    } catch (error) {
      throw new BadRequestException('Invalid token');
    }
  }
}
