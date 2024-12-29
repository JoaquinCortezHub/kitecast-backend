import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CoordinatesDto } from './dto/coordinatesDto.dto';
import { ForecastDto } from './dto/forecastDto.dto';

interface Coordinates {
    lat: number;
    lon: number;
};

@Injectable()
export class ForecastService {
    async getCoordinates(city: string): Promise<Coordinates> {
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${process.env.OPEN_WEATHER_API_KEY}`;

        try {
            const { data } = await axios.get<CoordinatesDto[]>(url);

            if(!data.length) {
                throw new Error('No coordinates found.');
            };
            
            const { lat, lon } = data[0];
            return { lat, lon };

        } catch (error) {
            if(axios.isAxiosError(error)) {
                throw new Error('Failed to get coordinates.');
            }
            throw Error('Error fetching data.')
            
        };
    };

    async getForecast(city: string): Promise<any> {
        const coordinates = await this.getCoordinates(city)
        const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=hourly,minutely,current,alerts&appid=${process.env.OPEN_WEATHER_API_KEY}`
        
        try {
            const { data } = await axios.get(url);
            console.log(data)

            if(!data || !data.daily) {
                throw new Error('Daily forecast data fetch failed.');  
            }

            return data.daily;
        } catch (error) {
            if(axios.isAxiosError(error)) {
                throw new HttpException('Axios couldnt fetch the data', HttpStatus.NOT_FOUND);
            }
            throw new Error('Error fetching data.')
        }
    }
}
