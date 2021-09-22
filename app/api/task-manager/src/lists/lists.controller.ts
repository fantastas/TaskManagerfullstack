import { UpdateTaskDto } from './../dto/update-task.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { List } from '../schemas/list.schema';
import { ListsService } from './lists.service';
import { CreateListDto } from '../dto/create-list.dto';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { Task } from 'src/schemas/task.schema';

@Controller('lists')
export class ListsController {
  constructor(private readonly listService: ListsService) {}

  @Get()
  public async getLists(): Promise<List[]> {
    return await this.listService.findAll();
  }

  @Get('/:listId/tasks')
  public async findAll(@Param('listId') listId: string): Promise<Task[]> {
    return await this.listService.findTasks(listId);
  }

  @Post()
  public async addList(@Res() res, @Body() createListDto: CreateListDto) {
    const newList = await this.listService.create(res, createListDto);
    res.status(200).json(newList);
  }

  @Post('/:listId/tasks')
  public async addTask(
    @Param('listId') listId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return await this.listService.createTask(listId, createTaskDto);
  }

  @Patch('/:listId/tasks/:id')
  public async editTask(
    @Param('listId') listId: string,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Res() res,
  ) {
    const updatedTask = await this.listService.updateTask(
      listId,
      id,
      updateTaskDto,
    );
    res.status(200).json(updatedTask);
  }

  @Delete('/:listId/tasks/:id')
  public async deleteTask(
    @Param('listId') listId: string,
    @Param('id') id: string,
  ) {
    return await this.listService.deleteTask(listId, id);
  }

  @Delete()
  public async deleteAll() {
    return await this.listService.deleteAll();
  }

  @Get('/:listId/tasks/:id')
  public async getSpecificTask(
    @Param('listId') listId: string,
    @Param('id') id: string,
  ) {
    return await this.listService.getSpecificTask(listId, id);
  }

  @Delete('/:id')
  public async deleteList(@Res() res, @Param('id') listId: string) {
    return await this.listService.remove(res, listId);
  }
}
