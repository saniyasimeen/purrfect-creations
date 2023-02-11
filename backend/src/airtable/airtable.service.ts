import { Inject, Injectable } from '@nestjs/common';
import { Base } from 'airtable';
import { Order, OrderDto } from './orders.dto';

@Injectable()
export class AirtableService {
  constructor(
    @Inject('Airtable_Base')
    private readonly airtableBase: Base,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    const orders = await this.airtableBase('Orders')
      .select({
        view: 'Grid view',
        fields: Object.keys(Order),
      })
      .all();

    return orders.map((order) => order.fields as unknown as Order);
  }

  async getRecentOrders(): Promise<OrderDto[]> {
    const orders = await this.airtableBase('Orders')
      .select({
        view: 'Grid view',
        fields: Object.keys(Order),
        sort: [{ field: 'order_placed', direction: 'desc' }],
        maxRecords: 10,
      })
      .firstPage();
    return orders.map((order) => order.fields as unknown as OrderDto);
  }
}
