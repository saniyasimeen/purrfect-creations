import { Injectable } from '@nestjs/common';
import { AirtableService } from '../airtable/airtable.service';
import { OrderDto, OrderStatus } from '../airtable/orders.dto';
import { OverviewDto } from './business-metrics.dto';

@Injectable()
export class BusinessMetricsService {
  constructor(private airtableService: AirtableService) {}

  async getOverview(): Promise<OverviewDto> {
    const allOrders = await this.airtableService.getAllOrders();

    const today = new Date();
    const firstDayOfCurrentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
    );

    return allOrders.reduce(
      (acc, record) => {
        acc.revenue += record.price;

        if (record.order_status === OrderStatus.IN_PROGRESS)
          acc.inProgress += 1;

        if (new Date(record.order_placed) >= firstDayOfCurrentMonth)
          acc.ordersThisMonth += 1;

        return acc;
      },
      {
        revenue: 0,
        inProgress: 0,
        ordersThisMonth: 0,
        totalOrders: allOrders.length,
      },
    );
  }

  getRecentOrders(): Promise<OrderDto[]> {
    return this.airtableService.getRecentOrders();
  }
}
