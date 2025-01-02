import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { OpenWeatherResponse } from 'src/weather/types/api-response';

@Injectable()
export class WeatherService {
    private readonly apiKey = process.env.OPEN_WEATHER_API_KEY;
    private readonly baseUrl = 'https://api.openweathermap.org/data/2.5';
    private readonly geoUrl = 'http://api.openweathermap.org/geo/1.0/direct';

    async getWeather(city: string): Promise<OpenWeatherResponse> {
        if (!city || city.trim().length === 0) {
            throw new HttpException(
            'City parameter is either missing or undefined.',
            HttpStatus.BAD_REQUEST,
            );
        };

        try {
            const geoResponse = await axios.get(
                `${this.geoUrl}?q=${encodeURI(city)}&limit=1&appid=${this.apiKey}`
            );
            if (!geoResponse.data?.[0]) {
                throw new HttpException(
                    `City not found: ${city}`,
                    HttpStatus.NOT_FOUND,
                );
            };

            const { lat, lon } = geoResponse.data[0];

            const weatherResponse = await axios.get<OpenWeatherResponse>(
                `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`,
            );

            if (!weatherResponse.data) {
                throw new HttpException(
                    `Weather data not found for ${city}`,
                    HttpStatus.NOT_FOUND,
                );
            };

            return weatherResponse.data;

        } catch (error) {
            const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
            const message = error.response?.data?.message || 'Error fetching weather data.';
            throw new HttpException(message, status);
        }
    };
}
