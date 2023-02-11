import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    protected repository: Repository<User>,
  ) {}

  findByUsername(username: string) {
    return this.repository.findOne({
      where: {
        username,
      },
    });
  }

  updatePassword(id: string, hashedPassword: string) {
    return this.repository.update(id, { password: hashedPassword });
  }
}
