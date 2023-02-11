import { Controller, UseGuards, Get } from '@nestjs/common';
import {
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrderDto } from '../airtable/orders.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { OverviewDto } from './business-metrics.dto';
import { BusinessMetricsService } from './business-metrics.service';

@Controller('business-metrics')
@ApiTags('Business Metrics')
export class BusinessMetricsController {
  constructor(private readonly metricsService: BusinessMetricsService) {}

  @ApiOperation({
    summary: 'Business overview',
    description: 'Get an overview of the business using key metrics',
  })
  @ApiResponse({ type: OverviewDto })
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @Get()
  async getOverview(): Promise<OverviewDto> {
    return this.metricsService.getOverview();
  }

  @ApiOperation({
    summary: 'Recent orders',
    description: 'Get recent orders',
  })
  @ApiResponse({ type: OrderDto, isArray: true })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('recent-orders')
  async getRecentOrders(): Promise<OrderDto[]> {
    return this.metricsService.getRecentOrders();
  }
}
