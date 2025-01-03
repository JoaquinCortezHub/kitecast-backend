import { IsString, IsNotEmpty } from "class-validator";

export class MapDto {
    @IsString()
    @IsNotEmpty({ message: 'City name is required.' })
    city: string;
}