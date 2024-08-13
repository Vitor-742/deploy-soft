import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY, jwtConstants } from './constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { CacheService } from 'src/cache/cache.service';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private jwtService: JwtService,
      private reflector: Reflector,
      private redisCache: CacheService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (isPublic) {
        return true;
      }

      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);

      if (!token) throw new UnauthorizedException();

      const redisToken = await this.redisCache.retrieveData(token);

      if (!redisToken) throw new UnauthorizedException();

      try {
        const payload = await this.jwtService.verifyAsync(
          redisToken,
          {
            secret: jwtConstants.secret
          }
        );

        request['user'] = payload;
        
      } catch ({ name, message }) {
        throw new UnauthorizedException();
      }

      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];

      return type === 'Bearer' ? token : undefined;
    }
  }