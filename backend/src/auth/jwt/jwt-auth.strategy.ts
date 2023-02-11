import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

export type JwtPayload = {
  sub: string;
  username: string;
};

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  // Validates and sets decoded JWT in the request object
  async validate(user: JwtPayload, done: VerifiedCallback) {
    const userFromDb = await this.userService.findByUsername(user.username);
    if (!userFromDb) {
      return done(new UnauthorizedException('User not found'), false);
    }
    done(null, user);
  }
}
