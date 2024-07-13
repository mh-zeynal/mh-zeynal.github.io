import { HourResponseDto } from 'types/hourResponse.dto';

interface ForecastProps {
  forecastData: HourResponseDto;
}

export function ForecastCard( { forecastData }: ForecastProps ) {
  return (
    <div
      className={`relative flex flex-col h-[450px] w-72 bg-gradient-to-b rounded-xl shadow-lg backdrop-blur-md border p-4 *:z-10 first:z-0 ${ forecastData.is_day ? 'from-blue-400 to-gray-100 *:text-gray-600 border-blue-300' : 'from-blue-900 to-gray-400 *:text-white border-gray-400' }`}>
      <img
        className={'absolute h-40 opacity-50 top-5 -right-1'}
        src={forecastData.condition.icon}
        alt={forecastData.condition.text}
      />
      <div className='flex flex-col'>
        <span className={'text-2xl'}>
          {forecastData.condition.text}
        </span>
        <span className={'font-bold text-xl'}>
          {forecastData?.time?.split( ' ' )[1]}
        </span>
      </div>
      <div className='grow flex justify-center items-center'>
        <span className={'text-5xl'}>
          {forecastData.temp_c}
        </span>
      </div>
    </div>
  );
}
