import { Injectable } from '@nestjs/common';
// import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor() {}

  async validateUser(): Promise<any> {
    return true;
  }
}
