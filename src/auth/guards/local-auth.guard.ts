import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('dsds', process.env.AUTH_TOKEN);
    
    return !!process.env.AUTH_TOKEN;
  }
}
