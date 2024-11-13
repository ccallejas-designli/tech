import { Injectable } from '@nestjs/common';

import { Order } from '../orders/entities/order.entity';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class JobQueueService {
  constructor(@InjectQueue('orderQueue') private orderQueue: Queue) {}

  async addOrderToQueue(order: Order) {
    await this.orderQueue.add('processOrder', order, {
      attempts: 5,
      backoff: { type: 'exponential', delay: 1000 },
    });
  }
}
