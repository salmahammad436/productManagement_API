import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../Decorators/roles.decorator'; 
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector, // Used to retrieve metadata set by custom decorators
    private jwtService: JwtService, // Service to handle JWT operations
  ) {}

  /**
   * Determines whether a request can proceed based on the user's role and the required roles for the route.
   * @param context - Provides details about the current execution context.
   * @returns {Promise<boolean>} - True if access is granted, false otherwise.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Retrieve the roles metadata defined for the route or controller
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(), // Metadata at the method level
      context.getClass(), // Metadata at the class level
    ]);

    // If no roles are required, allow unrestricted access
    if (!requiredRoles) {
      return true;
    }

    // Extract the HTTP request object from the execution context
    const request = context.switchToHttp().getRequest();

    // Retrieve the JWT from the Authorization header
    const token = request.headers['authorization']?.split(' ')[1];

    // If no token is found in the request headers, deny access
    if (!token) {
      throw new ForbiddenException('No token provided');
    }
    try {
      // Fetch the secret key for JWT verification (default or environment variable)
      const secretOrKey = process.env.JWT_SECRET || 'fallback_secret';

      // Verify and decode the JWT to extract its payload
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: secretOrKey,
      });

      // Extract the user's role from the decoded payload
      const userRole = decoded.role;

      // Check if the user's role is included in the required roles for this route
      if (!requiredRoles.includes(userRole)) {
        throw new ForbiddenException('Insufficient permissions'); // Deny access for unauthorized roles
      }

      // If the role matches one of the required roles, grant access
      return true;
    } catch (err) {
      // Handle cases where token verification fails or any other error occurs
      throw new ForbiddenException('Invalid token');
    }
  }
}
