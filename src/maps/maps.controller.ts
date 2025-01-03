import { Controller, Get, Query } from '@nestjs/common';
import { MapsService } from './maps.service';
import { MapDto } from './dto/mapDto.dto';

@Controller('maps')
export class MapsController {
    constructor(private readonly mapsService: MapsService) {}

    @Get('wind')
    async getWindMap(@Query() mapDto: MapDto) {
        const { city } = mapDto;
        return this.mapsService.getWindMap(city);
    }

    @Get('precipitation')
    async getPrecipitationMap(@Query() mapDto: MapDto) {
        const { city } = mapDto;
        return this.mapsService.getPrecipitationMap(city);
    }
}
