import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('orderQueue')
export class OrderProcessor extends WorkerHost {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {
    super();
  }

  async process(job: Job<Order>) {
    const order = job.data;

    const paymentSuccess = await this.simulatePayment();

    if (paymentSuccess) {
      order.status = OrderStatus.CONFIRMED;
    } else {
      order.status = OrderStatus.FAILED;
      const product = await this.productRepository.findOne({
        where: { id: order.product.id },
      });
      if (product) {
        product.stock += order.quantity;
        await this.productRepository.save(product);
      }
    }

    await this.orderRepository.save(order);
  }

  // Simulates the payment process
  async simulatePayment(): Promise<boolean> {
    return Math.random() > 0.4;
  }
}
