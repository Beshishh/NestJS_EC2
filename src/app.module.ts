import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:Password@dbcluster.zmklrfh.mongodb.net/blog_database',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
