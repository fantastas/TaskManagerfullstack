import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task, TaskSchema } from '../schemas/task.schema';

const tasksFeature = MongooseModule.forFeature([
  {
    name: Task.name,
    schema: TaskSchema,
  },
]);

@Module({
  imports: [tasksFeature],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService, tasksFeature],
})
export class TaskModule {}
