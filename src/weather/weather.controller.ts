import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CityDto } from './dto/weatherDto.dto';

@Controller('weather')
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) {}
    @Get()
    @UsePipes(new ValidationPipe)
    async getWeather(@Query() cityDto: CityDto): Promise<any> {
        const { city } = cityDto;
        return this.weatherService.getWeather(city);
    };
}
