import { Test, TestingModule } from '@nestjs/testing';
import { OrderDto, OrderStatus } from '../airtable/orders.dto';
import { BusinessMetricsController } from './business-metrics.controller';
import { OverviewDto } from './business-metrics.dto';
import { BusinessMetricsService } from './business-metrics.service';

describe('BusinessMetricsController', () => {
  let controller: BusinessMetricsController;

  const overview: OverviewDto = {
    revenue: 500,
    inProgress: 3,
    ordersThisMonth: 1,
    totalOrders: 40,
  };

  const orders: OrderDto[] = [
    {
      order_id: 5,
      order_placed: '',
      product_name: 'Kitty Clothes',
      price: 50,
      email: 'meow@cat.com',
      order_status: OrderStatus.PLACED,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessMetricsController],
    })
      .useMocker((token) => {
        if (token === BusinessMetricsService) {
          return {
            getOverview: jest.fn().mockResolvedValue(overview),
            getRecentOrders: jest.fn().mockResolvedValue(orders),
          };
        }
      })
      .compile();

    controller = module.get<BusinessMetricsController>(
      BusinessMetricsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return overviews', async () => {
    const result = await controller.getOverview();
    expect(result).toBe(overview);
  });
  it('should return recent orders', async () => {
    const result = await controller.getRecentOrders();
    expect(result).toBe(orders);
  });
});
