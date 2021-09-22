import { UpdateTaskDto } from './../dto/update-task.dto';
import { Task, TaskDocument } from './../schemas/task.schema';
import { HttpStatus, Injectable, NotFoundException, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateListDto } from '../dto/create-list.dto';
import { List, ListDocument } from '../schemas/list.schema';
import { UpdateListDto } from '../dto/update-list.dto';
import { CreateTaskDto } from 'src/dto/create-task.dto';

@Injectable()
export class ListsService {
  constructor(
    @InjectModel(List.name)
    public listModel: Model<ListDocument>,

    @InjectModel(Task.name)
    public taskModel: Model<TaskDocument>,
  ) {}

  async create(@Res() res, createListDto: CreateListDto): Promise<List> {
    return await this.listModel.findOneAndUpdate(
      { title: createListDto.title },
      { title: createListDto.title },
      { new: true, upsert: true },
    );
  }

  async updateTask(
    listId: string,
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const updatedTask = await this.taskModel.findOneAndUpdate(
      {
        _listID: listId,
        _id: id,
      },
      updateTaskDto,
    );
    return updatedTask;
  }

  async findAll(): Promise<List[]> {
    return this.listModel.find().exec();
  }

  async findOne(@Res() res, listId: string): Promise<List> {
    const list = await this.listModel.findById({ _id: listId }).exec();
    if (!list) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json(`ID: ${listId} doesn't exist.`);
    }
    return res.status(HttpStatus.OK).json(list);
  }

  async update(
    @Res() res,
    listId: string,
    updateListDto: UpdateListDto,
  ): Promise<List> {
    try {
      const existingList = await this.listModel.findByIdAndUpdate(
        { _id: listId },
        updateListDto,
      );
      existingList.save();
      if (!existingList) {
        throw new NotFoundException('List does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'List has been successfully updated',
        existingList,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: List not updated!',
        status: 400,
      });
    }
  }

  async deleteAll() {
    return await this.listModel.deleteMany();
  }

  async remove(@Res() res, listId: string): Promise<any> {
    if (!listId) {
      throw new NotFoundException('ListID does not exist');
    }
    const deletedList = await this.listModel.findByIdAndRemove(listId);
    if (!deletedList) {
      throw new NotFoundException('List does not exist');
    }
    return res.status(HttpStatus.OK).json({
      deletedList,
    });
  }

  async createTask(
    listId: string,
    createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    createdTask._listID = listId;
    console.log(createdTask._listID);
    createdTask.save();
    return await createdTask;
  }

  async deleteTask(listId: string, id: string) {
    return await this.taskModel.findOneAndDelete(
      { _listID: listId, _id: id },
      { useFindAndModify: false },
    );
  }

  async getSpecificTask(listid: string, id: string) {
    return await this.taskModel.findOne({ _listID: listid, _id: id });
  }

  async findTasks(listid: string) {
    console.log('kviecia');
    return await this.taskModel.find({ _listID: listid });
  }
}
