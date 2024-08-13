import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppCacheModule } from './cache/cache.module';
import { KafkaModule } from './kafka/kafka.module';
import { LogConsumer } from './kafka/log.consumer';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, AppCacheModule, KafkaModule],
  controllers: [AppController],
  providers: [LogConsumer],
})
export class AppModule {}
