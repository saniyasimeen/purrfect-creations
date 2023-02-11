import { ApiProperty } from '@nestjs/swagger';

export enum OrderStatus {
  PLACED = 'placed',
  SHIPPED = 'shipped',
  IN_PROGRESS = 'in_progress',
  CANCELLED = 'cancelled',
}

export class Order {
  @ApiProperty()
  'order_id': number;
  @ApiProperty()
  'order_placed': string;
  @ApiProperty()
  'product_name': string;
  @ApiProperty()
  'price': number;
  @ApiProperty()
  'email': string;
  @ApiProperty({ enum: OrderStatus })
  'order_status': OrderStatus;
}

export class OrderDto extends Order {}
