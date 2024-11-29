import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { UserRepository } from '../user/repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Register a new user
   * @param registerDto - Data Transfer Object containing user registration details
   * @returns A success message and the created user
   */
  async register(registerDto: RegisterDto): Promise<any> {
    const { email, password, role } = registerDto;

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Use the repository to create a new user
    const user = await this.userRepository.create({
      email,
      password: hashedPassword,
      role: role || 'User', // Default role is 'User'
    });

    return { message: 'User registered successfully', user };
  }

  /**
   * Login a user and generate a JWT token
   * @param loginDto - Data Transfer Object containing login details
   * @returns A success message and a JWT token
   * @throws UnauthorizedException if the credentials are invalid
   */
  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;

    // Use the repository to find a user by email
    const user = await this.userRepository.findOneByEmail(email);

    // Verify that the user exists and the password matches
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {sub: user._id, email: user.email, role: user.role };

    // Sign the token using the JWT service
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'fallback_secret',
    });

    return { message: 'Logged in successfully', token };
  }
}
