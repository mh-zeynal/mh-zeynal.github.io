import { ConditionResponseDto } from './conditionResponse.dto';

export interface HourResponseDto {
  time: string;
  temp_c: number;
  // temp_f: 65.0;
  condition: ConditionResponseDto;
  wind_kph: number;
  wind_dir: string;
  is_day: boolean;
}
