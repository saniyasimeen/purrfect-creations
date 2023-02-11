import { OverviewDto } from './business-metrics.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { AirtableService } from '../airtable/airtable.service';
import { Order, OrderDto, OrderStatus } from '../airtable/orders.dto';
import { BusinessMetricsService } from './business-metrics.service';

describe('BusinessMetricsService', () => {
  let service: BusinessMetricsService;
  let airtableService: AirtableService;

  const recentOrders: OrderDto[] = [
    {
      order_id: 5,
      order_placed: '',
      product_name: 'Kitty Clothes',
      price: 50,
      email: 'meow@cat.com',
      order_status: OrderStatus.PLACED,
    },
  ];

  const allOrders: Order[] = [
    {
      order_id: 3,
      order_placed: '2021-10-05',
      product_name: 'Product 1',
      price: 100,
      email: 'jdoe@email.com',
      order_status: OrderStatus.IN_PROGRESS,
    },
    {
      order_id: 2,
      order_placed: '2021-10-05',
      product_name: 'Product 2',
      price: 200,
      email: 'alexjones@cornell.edu',
      order_status: OrderStatus.PLACED,
    },
    {
      order_id: 1,
      order_placed: '2021-10-04',
      product_name: 'Product 1',
      price: 100,
      email: 'tcharlie@mail.com',
      order_status: OrderStatus.SHIPPED,
    },
  ];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessMetricsService],
    })
      .useMocker((token) => {
        if (token === AirtableService) {
          return {
            getAllOrders: jest.fn().mockResolvedValue(allOrders),
            getRecentOrders: jest.fn().mockResolvedValue(recentOrders),
          };
        }
      })
      .compile();
    service = module.get<BusinessMetricsService>(BusinessMetricsService);
    airtableService = module.get<AirtableService>(AirtableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return overviews', async () => {
    const result = await service.getOverview();
    expect(jest.spyOn(airtableService, 'getAllOrders')).toBeCalled();

    const expectedResult: OverviewDto = {
      totalOrders: 3,
      inProgress: 1,
      revenue: 400,
      ordersThisMonth: 0,
    };

    expect(result).toStrictEqual(expectedResult);
  });
  it('should return recent orders', async () => {
    const result = await service.getRecentOrders();
    expect(jest.spyOn(airtableService, 'getRecentOrders')).toBeCalled();
    expect(result).toBe(recentOrders);
  });
});
