import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisClientOptions } from 'redis';
import { CacheService } from './cache.service';
import * as dotenv from 'dotenv'
dotenv.config();

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      password: process.env.REDISPASSWORD ?? '',
      username: process.env.REDISUSER ?? 'default',
      socket: {
        host: process.env.REDISHOST ?? 'localhost',
        port: parseInt(process.env.REDISPORT ?? '6379'),
      },
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class AppCacheModule {}