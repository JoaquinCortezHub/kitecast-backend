import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { WeatherApiResponse } from './types/api-response';

@Injectable()
export class WeatherService {
    private readonly apiKey = process.env.WEATHER_API_KEY;
    async getWeather(city: string): Promise<WeatherApiResponse> {  
        if(!city || city.trim().length === 0) {
            throw new HttpException("City parameter is either missing or undefined.", HttpStatus.BAD_REQUEST);
        }

        const url = `http://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${encodeURI(city)}&aqi=no`;

        try{
            const response = await axios.get<WeatherApiResponse>(url);
            if(!response.data) {
                throw new HttpException(`Weather data not found for ${city}`, HttpStatus.NOT_FOUND)
            }
            return response.data;
        } catch(error) {
            const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
            const message = error.response?.data?.error?.message || 'Error fetching data from WeatherAPI.';
            console.log(status);    
            throw new HttpException(error, message);
        };
    };
};
