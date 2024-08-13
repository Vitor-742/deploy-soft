import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ConsumerService } from './consumer.service';
import { LogConsumer } from './log.consumer';

@Module({
    providers: [ProducerService, ConsumerService, LogConsumer],
    exports: [ProducerService, ConsumerService, LogConsumer],
})
export class KafkaModule {}
