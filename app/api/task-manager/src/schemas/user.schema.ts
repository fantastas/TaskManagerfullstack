import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, trim: true, unique: true, minlength: 1 })
  email: string;
  @Prop({ required: true, minlength: 5 })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
