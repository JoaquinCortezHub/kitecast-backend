import { IsString, IsNotEmpty } from "class-validator";

export class CityDto {
    @IsString()
    @IsNotEmpty({ message: 'City name is required.' })
    city: string;
}