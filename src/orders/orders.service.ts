import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderStatus } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobQueueService } from '../job-queue/job-queue.service';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private readonly productService: ProductsService,
    private jobQueueService: JobQueueService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { productId, quantity } = createOrderDto;
    const product = await this.productService.findOne(productId);

    if (!product) throw new NotFoundException('Product not found');
    if (product.stock < quantity)
      throw new BadRequestException('Not enough stock');

    // Reduce stock
    product.stock -= quantity;
    await this.productService.create(product);

    // Create the order
    const order = this.orderRepository.create({
      product,
      quantity,
      totalPrice: product.price * quantity,
      status: OrderStatus.PENDING,
    });
    await this.orderRepository.save(order);

    // Simulate payment asynchronously
    this.jobQueueService.addOrderToQueue(order);

    return order;
  }

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: number) {
    return this.orderRepository.findOne({ where: { id } });
  }
}
