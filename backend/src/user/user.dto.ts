import { OmitType } from '@nestjs/swagger';
import { User } from './user.entity';

export class UserDto extends OmitType(User, ['password'] as const) {}
