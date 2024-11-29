import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import {MongooseModule} from '@nestjs/mongoose'
import {Product,ProductSchema} from './schema/product.schema';
import { AuthModule } from '../auth/auth.module';
import {ProductRepository} from './repository/product.repository'


@Module({
  imports:[MongooseModule.forFeature([{name:Product.name,schema:ProductSchema}]),AuthModule],
  providers: [ProductRepository,ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
