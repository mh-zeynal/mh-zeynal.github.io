import { ConditionResponseDto } from './conditionResponse.dto';
import { HourResponseDto } from './hourResponse.dto';

export interface ForecastDayResponseDto {
  date: string,
  day: {
    maxtemp_c: number,
    // maxtemp_f: 76.2,
    mintemp_c: number,
    // mintemp_f: 60.6,
    avgtemp_c: number,
    // avgtemp_f: 68.6,
    maxwind_kph: number,
    condition: ConditionResponseDto;
  },
  astro: {
    sunrise: string,
    sunset: string,
    moonrise: string,
    moonset: string,
  },
  hour: HourResponseDto[];
}
