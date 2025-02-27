import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      Roles,
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true; // No roles required, allow access
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    const token = authHeader.split(' ')[1]; // Extract JWT token

    let decoded: any;

    try {
      decoded = await this.jwtService.decode(token); // Decode JWT
    } catch (err) {
      throw new ForbiddenException('Invalid token');
    }
    const user = await this.userService.findOne(decoded.userId)

    if (
      !user ||
      !user.role ||
      !requiredRoles.some((role) => user.role.includes(role))
    ) {
      throw new ForbiddenException(
        'You do not have permission to access this resource ',
      );
    }

    return true;
  }
}
