import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { response } from 'express';

@Injectable()
export class MapsService {
    private readonly API_KEY = process.env.OPEN_WEATHER_API_KEY;
    private readonly geoUrl = 'http://api.openweathermap.org/geo/1.0/direct';
    private readonly mapUrl = 'https://tile.openweathermap.org/map'
    private readonly windLayer = 'wind_new';
    private readonly precipitationLayer = 'precipitation_new';
    private readonly zoomLevel = 8;

    private async getCoordinates(city: string): Promise<{ lat: number; lon: number }> {
        const normalizedCity = city.toLowerCase().trim();

        const response = await axios.get(
            `${this.geoUrl}?q=${encodeURI(normalizedCity)}&limit=1&appid=${this.API_KEY}`
        );

        if(!response.data) {
            throw new Error('Error fetching API data.')
        };

        const { lat, lon } = response.data[0];
        return { lat, lon };
    };

    private toTileCoordinates(lat: number, lon: number, zoom: number): { x: number; y: number } {
        if(lat === undefined || lon === undefined) {
            throw new Error("Error. One of the coordinates is either missing or undefined.")
        };
        const latRadians = lat * Math.PI / 180;
        const TileNumber = Math.pow(2, zoom);
        const x = Math.floor((lon + 180) / 360 * TileNumber);
        const y = Math.floor((1 - Math.log(Math.tan(latRadians) + 1 / Math.cos(latRadians)) / Math.PI) / 2 * TileNumber);
        return { x, y };
    };

    async getWindMap(city: string) {
        const coordinates = await this.getCoordinates(city);
        const tileCoordinates = this.toTileCoordinates(coordinates.lat, coordinates.lon, this.zoomLevel);

        const tileUrl = `${this.mapUrl}${this.windLayer}/${this.zoomLevel}/${tileCoordinates.x}/${tileCoordinates.y}.png?appid=${this.API_KEY}`
        
        return {
            tileUrl,
            coordinates: {
                lat: coordinates.lat,
                lon: coordinates.lon
            },
            zoom: this.zoomLevel,
            layer: this.windLayer
        };
    };

    async getPrecipitationMap(city: string) {
        const coordinates = await this.getCoordinates(city);
        const tileCoordinates = this.toTileCoordinates(coordinates.lat, coordinates.lon, this.zoomLevel);

        const tileUrl = `${this.mapUrl}/${this.precipitationLayer}/${this.zoomLevel}/${tileCoordinates.x}/${tileCoordinates.y}.png?appid=${this.API_KEY}`

        return {
            tileUrl,
            coordinates: {
                lat: coordinates.lat,
                lon: coordinates.lon
            },
            zoom: this.zoomLevel,
            layer: this.precipitationLayer
        };
    }
}
