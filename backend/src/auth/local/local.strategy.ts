import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { compare } from 'bcrypt';
import { Strategy } from 'passport-local';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    const isCorrectPassword = await compare(password, user.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    delete user.password;
    return user;
  }
}
