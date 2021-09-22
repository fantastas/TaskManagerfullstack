import { TaskModule } from './../tasks/tasks.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
import { List, ListSchema } from '../schemas/list.schema';

const listsFeature = MongooseModule.forFeature([
  {
    name: List.name,
    schema: ListSchema,
  },
]);

@Module({
  imports: [listsFeature, TaskModule],
  controllers: [ListsController],
  providers: [ListsService],
  exports: [ListsService, listsFeature],
})
export class ListModule {}
