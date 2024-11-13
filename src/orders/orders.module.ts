import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ProductsModule } from '../products/products.module';
import { JobQueueModule } from '../job-queue/job-queue.module';
import { OrderProcessor } from './order.processor';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [
    ProductsModule,
    JobQueueModule,
    TypeOrmModule.forFeature([Order, Product]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderProcessor],
  exports: [OrdersService, OrderProcessor],
})
export class OrdersModule {}
