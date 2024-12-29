export class LocalNamesDto {
    [key: string]: string;
    ascii?: string;
    feature_name?: string;
};

export class CoordinatesDto {
    name: string;
    local_names?: LocalNamesDto;
    lat: number;
    lon: number;
    country: string;
    state?: string;
};
