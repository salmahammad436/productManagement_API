import { IsString, IsNotEmpty, IsNumber,IsMongoId,IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  category: string;

  @IsMongoId()
  createdBy: Types.ObjectId;
}
