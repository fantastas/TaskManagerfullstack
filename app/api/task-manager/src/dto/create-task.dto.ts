import { Prop } from '@nestjs/mongoose';

export class CreateTaskDto {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  _listId: string;
  @Prop()
  completed: boolean;
}
