import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './weather/weather.module';
import { UnsplashModule } from './unsplash/unsplash.module';
import { ForecastModule } from './forecast/forecast.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), WeatherModule, UnsplashModule, ForecastModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
