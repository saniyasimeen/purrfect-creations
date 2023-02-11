import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserDto } from 'src/user/user.dto';
import { JwtPayload } from './jwt/jwt-auth.strategy';

export class LocalAuthenticatedRequest {
  user: UserDto;
}

export class JwtAuthenticatedRequest {
  user: JwtPayload;
}

export class LocalAuthResponseDto {
  @ApiProperty()
  access_token: string;
}

export class LoginDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}

export class ChangePasswordDto extends PickType(LoginDto, [
  'password',
] as const) {}
