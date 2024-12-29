export class MainWeatherDto {
    temp: number;
    feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export class WeatherConditionDto {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export class CloudsDto {
  all: number;
}

export class WindDto {
  speed: number;
  deg: number;
  gust: number;
}

export class SysDto {
  pod: string;
}

export class ForecastItemDto {
  dt: number;
  main: MainWeatherDto;
  weather: WeatherConditionDto[];
  clouds: CloudsDto;
  wind: WindDto;
  visibility: number;
  pop: number;
  sys: SysDto;
  dt_txt: string;
}

export class CityCoordinatesDto {
  lat: number;
  lon: number;
}

export class CityDto {
  id: number;
  name: string;
  coord: CityCoordinatesDto;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export class ForecastDto {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItemDto[];
  city: CityDto;
}
