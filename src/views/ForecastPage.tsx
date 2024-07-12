import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosConfig from 'configs/axiosConfig';
import moment from 'moment';
import { ForecastResponseDto } from 'types/forecastResponse.dto';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import AirRoundedIcon from '@mui/icons-material/AirRounded';
import WbTwilightRoundedIcon from '@mui/icons-material/WbTwilightRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import { Divider } from '@mui/material';
import { ForecastCard } from 'components/forecast/ForecastCard';
import { ItemSlider } from '../components/ItemSlider';
import { HourResponseDto } from '../types/hourResponse.dto';
import { SwiperOptions } from 'swiper/types';

export function ForecastPage() {
  const [searchParams] = useSearchParams();
  const [ forecastData, setForecastData ] = useState<ForecastResponseDto | null>(
    null
  );

  const swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    grabCursor: false,
    hashNavigation: true,
    breakpoints: {
      768: {
        slidesPerView: 2,
        navigation: false
      },
      1024: {
        slidesPerView: 4,
        allowTouchMove: false
      }
    }
  };

  useEffect( () => {
    ( async() => {
      try {
        const latitude = searchParams.get( 'lat' ) || '';
        const longitude = searchParams.get( 'lng' ) || '';
        const date = moment( +( searchParams.get( 'date' ) || '0' ) );

        const { data } = await axiosConfig.get<ForecastResponseDto>(
          '/forecast.json',
          {
            params: {
              q: `${ latitude },${ longitude }`,
              days: date.diff( new Date(), 'days' )
            }
          }
        );

        setForecastData( data );
      } catch ( err ) {
        console.log( 'Error occurred when fetching forecast data' );
      }
    } )();
  }, [] );

  return (
    <div className={'flex flex-col h-full gap-1 *:flex'}>
      <div className={'header items-center justify-start gap-2'}>
        <div className={'flex'}>
          <img
            src={forecastData?.forecast.forecastday[0].day.condition.icon}
            alt={forecastData?.forecast.forecastday[0].day.condition.text}
          />
          <div className={'flex flex-col gap-1'}>
            <span className={'text-lg'}>
              {forecastData?.forecast.forecastday[0].day.condition.text}
            </span>
            <span className={'text-sm font-bold text-gray-500'}>
              {forecastData?.forecast.forecastday[0].day.avgtemp_c}°C
            </span>
          </div>
        </div>
        <Divider orientation='vertical' variant='middle' flexItem />
        <div className={'*:text-sm *:font-bold *:text-gray-500'}>
          <div>
            <KeyboardArrowUpRoundedIcon className={'text-green-500'} />
            <span>{forecastData?.forecast.forecastday[0].day.maxtemp_c}°C</span>
          </div>
          <div>
            <KeyboardArrowDownRoundedIcon className={'text-red-500'} />
            <span>{forecastData?.forecast.forecastday[0].day.mintemp_c}°C</span>
          </div>
        </div>
        <Divider orientation='vertical' variant='middle' flexItem />
        <div>
          <AirRoundedIcon fontSize={'large'} className={'text-gray-400'} />
          <span className={'font-bold text-gray-500'}>
            {forecastData?.forecast.forecastday[0].day.maxwind_kph} k/h
          </span>
        </div>
        <Divider orientation='vertical' variant='middle' flexItem />
        <div
          className={
            'flex flex-col *:flex *:gap-1 *:font-bold *:text-gray-500'
          }>
          <div>
            <WbTwilightRoundedIcon className={'text-yellow-400'} />
            <span>{forecastData?.forecast.forecastday[0].astro.sunrise}</span>
          </div>
          <div>
            <DarkModeRoundedIcon className={'text-blue-400'} />
            <span>{forecastData?.forecast.forecastday[0].astro.sunset}</span>
          </div>
        </div>
      </div>
      <Divider variant='middle' flexItem />
      <div className={'content grow flex-col gap-3'}>
        <div className={'flex flex-col w-full'}>
          <h1 className={'font-bold text-gray-500 text-3xl'}>
            {forecastData?.location.name}/{forecastData?.location.country}
          </h1>
          <span className={'text-xs text-gray-500'}>
            {forecastData?.location.lat}, {forecastData?.location.lon}
          </span>
        </div>
        <ItemSlider<HourResponseDto>
          data={forecastData?.forecast?.forecastday[0]?.hour || []}
          renderItem={( hourData: HourResponseDto ) => (
            <ForecastCard forecastData={hourData} />
          )}
          swiperConfig={swiperConfig}
        />
      </div>
    </div>
  );
}
