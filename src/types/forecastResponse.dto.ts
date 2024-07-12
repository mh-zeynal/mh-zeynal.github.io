import { ForecastDayResponseDto } from './forecastDayResponse.dto';

export interface ForecastResponseDto {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string;
  };
  forecast: {
    forecastday: ForecastDayResponseDto[];
  };
}
