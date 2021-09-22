import { TaskModule } from './tasks/tasks.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListModule } from './lists/lists.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/TaskManager',
    ),
    ListModule,
    TaskModule,
    UsersModule,
  ],
  controllers: [AppController], // handle http requests
  providers: [AppService],
})
export class AppModule {}
