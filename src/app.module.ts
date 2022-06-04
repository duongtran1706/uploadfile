import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { extname } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

export const multerOptions = {
  limits: {
    fileSize: 1024 * 1024 * 10,
  },

  // Check the mimetypes to allow for upload
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif|pdf)$/)) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },

  storage: diskStorage({
    destination: 'tmp/',

    // File modification details
    filename: (req: any, file: any, cb: any) => {
      cb(null, `${new Date().getTime()}${extname(file.originalname)}`);
    },
  }),
};

@Module({
  imports: [
    MulterModule.register(multerOptions),
    AuthModule,
    // imagesModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/uploadfile'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
