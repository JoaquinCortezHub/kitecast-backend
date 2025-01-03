import { HttpException, HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import { promises as fs } from "fs";
import { OpenWeatherResponse } from 'src/weather/types/api-response';

interface GeocodingCache {
    [city: string]: {
        lat: number;
        lon: number;
        timestamp: number;
    };
};

@Injectable()
export class WeatherService implements OnModuleInit {
    private readonly apiKey = process.env.OPEN_WEATHER_API_KEY;
    private readonly baseUrl = 'https://api.openweathermap.org/data/2.5';
    private readonly geoUrl = 'http://api.openweathermap.org/geo/1.0/direct';
    private readonly CACHE_TTL = 30 * 24 * 60 * 60 * 1000;
    private geocodingCache: GeocodingCache = {};

    onModuleInit() {
        this.loadCache();
        this.cleanupCache();
    };

    private async getCoordinates(city: string): Promise<{ lat: number; lon: number }> {
        const normalizedCity = city.toLowerCase().trim();

        if(this.geocodingCache[normalizedCity]) {
            const cached = this.geocodingCache[normalizedCity];
            if(Date.now() - cached.timestamp < this.CACHE_TTL) {
                return { lat: cached.lat, lon: cached.lon };
            };

            delete this.geocodingCache[normalizedCity];
        };

        const geoResponse = await axios.get(
            `${this.geoUrl}?q=${encodeURI(normalizedCity)}&limit=1&appid=${this.apiKey}`
        );

        const { lat, lon } = geoResponse.data[0];
        this.geocodingCache[normalizedCity] = {
            lat,
            lon,
            timestamp: Date.now(),
        };

        this.cleanupCache();
        await this.saveCache();
        return { lat, lon };
    }

    async getWeather(city: string): Promise<OpenWeatherResponse> {
        if (!city || city.trim().length === 0) {
            throw new HttpException(
            'City parameter is either missing or undefined.',
            HttpStatus.BAD_REQUEST,
            );
        };

        try {
            const { lat, lon } = await this.getCoordinates(city);

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

    private async loadCache(): Promise<void> {
        try {
            const data = await fs.readFile('geocoding-cache.json', 'utf-8');
            this.geocodingCache = JSON.parse(data);
        } catch (error) {
            this.geocodingCache = {};
        };
    };

    private async saveCache(): Promise<void> {
        try {
            await fs.writeFile(
                'geocoding-cache.json',
                JSON.stringify(this.geocodingCache),
                'utf-8'
            );
        } catch (error) {
            console.error('Failed to save geocoding cache:', error);
        }
    };

    private cleanupCache(): void {
        const maxEntries = 500;
        const entries = Object.entries(this.geocodingCache);

        if(entries.length > maxEntries) {
            const sortedEntries = entries.sort((a, b) => b[1].timestamp - a[1].timestamp);
            this.geocodingCache = Object.fromEntries(sortedEntries.slice(0, maxEntries));
        }
    }
}
