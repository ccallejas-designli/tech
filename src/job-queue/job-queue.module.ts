import { Module } from '@nestjs/common';
import { JobQueueService } from './job-queue.service';
import { BullModule } from '@nestjs/bullmq';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Order]),
    BullModule.registerQueue({
      name: 'orderQueue',
    }),
  ],
  providers: [JobQueueService],
  exports: [JobQueueService],
})
export class JobQueueModule {}
