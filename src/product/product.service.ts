// src/product/product.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './repository/product.repository';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product } from './schema/product.schema';

@Injectable()
export class ProductService {
  // Injecting the ProductRepository to interact with the database
  constructor(private readonly productRepository: ProductRepository) {}

  /**
   * Get all products from the repository.
   * Calls the repository's findAll method to retrieve all products.
   */
  async find() {
    return await this.productRepository.findAll();
  }

  /**
   * Get a single product by its ID.
   * First, attempts to find the product by ID in the repository.
   * If the product is not found, throws a NotFoundException.
   * @param id - The ID of the product to find.
   */
  async findOne(id: string) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return product;
  }

  /**
   * Create a new product using the provided data.
   * Uses the CreateProductDto to create a new product.
   * @param createProductDto - The data required to create the new product.
   */
  async create(createProductDto: CreateProductDto) {
    return await this.productRepository.create(createProductDto);
  }

  /**
   * Update an existing product by its ID.
   * Calls the repository's update method to update the product.
   * If the product is not found, throws a NotFoundException.
   * @param id - The ID of the product to update.
   * @param updateProductDto - The data to update the product.
   */
  async update(id: string, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.productRepository.update(id, updateProductDto);
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return updatedProduct;
  }

  /**
   * Delete a product by its ID.
   * Calls the repository's delete method to remove the product.
   * If the product is not found, throws a NotFoundException.
   * @param id - The ID of the product to delete.
   */
  async delete(id: string) {
    const deletedProduct = await this.productRepository.delete(id);
    if (!deletedProduct) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return { message: `Product with ID "${id}" deleted successfully` };
  }
}
