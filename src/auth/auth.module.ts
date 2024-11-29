import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from '../user/schema/user.schema';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { RolesGuard } from './guards/roles.guard';
import { PassportModule } from '@nestjs/passport';
import {JwtStrategy} from './strategies/jwt.strategy';
import {UserRepository} from '../user/repository/user.repository'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret', 
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [UserRepository,
    AuthService, 
    RolesGuard,
    JwtStrategy 
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtModule, JwtStrategy,RolesGuard],
})
export class AuthModule {}