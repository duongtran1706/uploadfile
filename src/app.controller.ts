import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { TokenInterceptor } from './auth/token.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @UseGuards(LocalAuthGuard)
  @Post('/upload')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('data'))
  @UseInterceptors(TokenInterceptor)
  upload(@UploadedFile() file) {
    console.log('file', file);
    return 'done';
  }
}
