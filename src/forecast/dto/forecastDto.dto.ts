class WeatherDto {
    id: number;
    main: string;
    description: string;
    icon: string;
};

class DailyTempDto {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
};

class DailyFeelsLikeDto {
    day: number;
    night: number;
    eve: number;
    morn: number;
};

class DailyForecastDto {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    summary: string;
    temp: DailyTempDto;
    feels_like: DailyFeelsLikeDto;
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: WeatherDto[];
    clouds: number;
    pop: number;
    rain?: number;
    uvi: number;
};

export class ForecastDto {
    daily: DailyForecastDto[];
};
