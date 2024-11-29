import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  /**
   * Creates a new user by delegating to the repository.
   * @param email - User's email address
   * @param password - User's password
   * @param role - User's role (e.g., admin, user)
   * @returns The newly created user document
   */
  async create(email: string, password: string, role: string): Promise<User> {
    return this.userRepository.create({ email, password, role });
  }

  /**
   * Finds a user by their email address.
   * @param email - Email to search for
   * @returns The user document if found, or `null` otherwise
   */
  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneByEmail(email);
  }

  /**
   * Finds a user by their ID.
   * @param id - User's unique identifier
   * @returns The user document if found
   * @throws NotFoundException if no user is found with the provided ID
   */
  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  /**
   * Updates a user by their ID.
   * @param id - User's unique identifier
   * @param updateData - Fields to update in the user document
   * @returns The updated user document
   * @throws NotFoundException if no user is found with the provided ID
   */
  async update(id: string, updateData: Partial<User>): Promise<User> {
    const user = await this.userRepository.updateById(id, updateData);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }
}
