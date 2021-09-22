import { Prop } from '@nestjs/mongoose';

export class CreateUserDto {
  @Prop()
  email: string;
  @Prop()
  password: string;
}
