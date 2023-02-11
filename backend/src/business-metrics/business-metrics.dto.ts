import { ApiProperty } from '@nestjs/swagger';

export class OverviewDto {
  @ApiProperty()
  revenue: number;
  @ApiProperty()
  inProgress: number;
  @ApiProperty()
  ordersThisMonth: number;
  @ApiProperty()
  totalOrders: number;
}
