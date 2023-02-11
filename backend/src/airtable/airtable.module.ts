import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Airtable from 'airtable';
import { AirtableService } from './airtable.service';

@Module({
  providers: [
    AirtableService,
    {
      provide: 'Airtable_Base',
      useFactory: (configService: ConfigService) => {
        return new Airtable({
          apiKey: configService.get<string>('AIRTABLE_API_KEY'),
        }).base(configService.get<string>('AIRTABLE_BASE'));
      },
      inject: [ConfigService],
    },
  ],

  exports: [AirtableService],
})
export class AirtableModule {}
