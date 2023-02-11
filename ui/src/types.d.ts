export enum OrderStatus {
  PLACED = 'placed',
  SHIPPED = 'shipped',
  IN_PROGRESS = 'in_progress',
  CANCELLED = 'cancelled',
}

export class Order {
  'order_id': number;
  'order_placed': string;
  'product_name': string;
  'price': number;
  'email': string;
  'order_status': OrderStatus;
}

export class LocalAuthResponseDto {
  access_token: string;
}

export class LoginDto {
  username: string;
  password: string;
}

export class OverviewDto {
  revenue: number;
  inProgress: number;
  ordersThisMonth: number;
  totalOrders: number;
}
