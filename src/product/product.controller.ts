import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async findAllProducts() {
    const products = await this.productService.find();
    return { message: 'Products retrieved successfully', data: products };
  }

  @Get(':id')
  async findOneProduct(@Param('id') id: string) {
    const product = await this.productService.findOne(id);
    return { message: 'Product found successfully', data: product };
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);
    return { message: 'Product created successfully', data: product };
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const updatedProduct = await this.productService.update(
      id,
      updateProductDto,
    );
    return { message: 'Product updated successfully', data: updatedProduct };
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('Admin')
  async deleteProduct(@Param('id') id: string) {
    await this.productService.delete(id);
    return { message: `Product with ID ${id} deleted successfully` };
  }
}

