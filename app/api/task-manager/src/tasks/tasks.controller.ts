import { Delete } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Delete()
  public async deleteTasks() {
    return await this.taskService.deleteTasks();
  }
}
