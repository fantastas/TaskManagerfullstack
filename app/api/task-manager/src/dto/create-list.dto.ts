import { Prop } from '@nestjs/mongoose';

export class CreateListDto {
  @Prop()
  title: string;
}
