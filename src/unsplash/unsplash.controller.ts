import { Controller, Get, Query } from '@nestjs/common';
import { UnsplashService } from './unsplash.service';

@Controller('unsplash')
export class UnsplashController {
    constructor(private readonly unsplashService: UnsplashService) {}

    @Get('getSpotImage')
    async getSpotImage(@Query('spot') spot: string) {
        return this.unsplashService.fetchPhotos(spot);
    }
}
