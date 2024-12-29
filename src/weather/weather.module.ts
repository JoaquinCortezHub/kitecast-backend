import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { ForecastService } from 'src/forecast/forecast.service';

@Module({
  controllers: [WeatherController],
  providers: [WeatherService, ForecastService]
})
export class WeatherModule {}
