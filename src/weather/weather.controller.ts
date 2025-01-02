import { Controller, Get, HttpException, HttpStatus, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CityDto } from './dto/weatherDto.dto';
import { ForecastService } from 'src/forecast/forecast.service';

@Controller('weather')
export class WeatherController {
    constructor(
        private readonly weatherService: WeatherService,
        private readonly forecastService: ForecastService
    ) {}
    @Get()
    @UsePipes(new ValidationPipe)
    async getWeather(@Query() cityDto: CityDto): Promise<any> {
        const { city } = cityDto;

        try {
            const [ currentWeather, forecast ] = await Promise.all([
                this.weatherService.getWeather(city),
                this.forecastService.getForecast(city),
            ]);

            return {
                currentWeather,
                forecast
            };
        } catch (error) {
            throw new HttpException(
                'Failed to fetch weather data.',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    };
}
