import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  category?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
