import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from '../schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    public taskModel: Model<TaskDocument>,
  ) {}

  async findAll() {
    return await this.taskModel.find().exec();
  }

  async deleteTasks() {
    return await this.taskModel.deleteMany();
  }
}
