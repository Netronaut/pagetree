import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './enities/user/user.module';
import { PageModule } from './enities/page/page.module';

const dbString = process.env.DB_CONNECTION_STRING;

@Module({
  imports: [
      ConfigModule.forRoot({}),
      MongooseModule.forRoot(dbString),
      UserModule,
      PageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
