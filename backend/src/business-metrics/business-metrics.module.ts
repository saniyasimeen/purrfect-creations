import { Module } from '@nestjs/common';
import { AirtableModule } from 'src/airtable/airtable.module';
import { BusinessMetricsController } from './business-metrics.controller';
import { BusinessMetricsService } from './business-metrics.service';

@Module({
  imports: [AirtableModule],
  controllers: [BusinessMetricsController],
  providers: [BusinessMetricsService],
})
export class BusinessMetricsModule {}
