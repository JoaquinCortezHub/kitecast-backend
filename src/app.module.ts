import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './weather/weather.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { UnsplashModule } from './unsplash/unsplash.module';
import { ForecastModule } from './forecast/forecast.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), WeatherModule, UserModule, AuthModule, UnsplashModule, ForecastModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
