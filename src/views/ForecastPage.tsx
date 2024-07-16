import React, { useEffect } from 'react';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import AirRoundedIcon from '@mui/icons-material/AirRounded';
import WbTwilightRoundedIcon from '@mui/icons-material/WbTwilightRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import { Divider } from '@mui/material';
import { ForecastCard } from 'components/forecast/ForecastCard';
import { ItemSlider } from 'components/ItemSlider';
import { HourResponseDto } from 'types/hourResponse.dto';
import { SwiperOptions } from 'swiper/types';
import moment from 'moment';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/storeHooks';
import { fetchForecastData } from 'store/forecastSlice';
import { Dispatch } from '@reduxjs/toolkit';
import { RootState } from 'store';

export function ForecastPage() {
  const [searchParams] = useSearchParams();
  const dispatch: Dispatch<any> = useAppDispatch();
  const { forecastData } = useAppSelector( ( state: RootState ) => state.forecast );
  const swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    grabCursor: false,
    hashNavigation: true,
    centeredSlidesBounds: true,
    normalizeSlideIndex: true,
    effect: 'coverflow',
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: -40
      },
      360: {
        slidesPerView: 1,
        spaceBetween: -30
      },
      412: {
        slidesPerView: 1,
        spaceBetween: -80
      },
      430: {
        slidesPerView: 1,
        spaceBetween: -90
      },
      768: {
        slidesPerView: 2
      },
      1024: {
        slidesPerView: 4,
        allowTouchMove: false
      }
    }
  };

  useEffect( () => {
    const latitude = searchParams.get( 'lat' ) || '';
    const longitude = searchParams.get( 'lng' ) || '';
    const date = moment( +( searchParams.get( 'date' ) || '0' ) );

    dispatch( fetchForecastData( { latitude: +latitude, longitude: +longitude, date: date } ) );
  }, [] );

  return (
    <div className={'flex flex-col h-full gap-1 *:flex'}>
      <div className={'header items-center justify-start gap-2'}>
        <div className={'flex'}>
          <img
            src={forecastData?.forecast?.forecastday[0]?.day?.condition?.icon}
            alt={forecastData?.forecast?.forecastday[0]?.day?.condition?.text}
          />
          <div className={'flex flex-col gap-1'}>
            <span className={'text-lg'}>
              {forecastData?.forecast?.forecastday[0]?.day?.condition?.text}
            </span>
            <span className={'text-sm font-bold text-gray-500'}>
              {forecastData?.forecast?.forecastday[0]?.day?.avgtemp_c}°C
            </span>
          </div>
        </div>
        <Divider orientation='vertical' variant='middle' flexItem />
        <div className={'*:text-sm *:font-bold *:text-gray-500'}>
          <div>
            <KeyboardArrowUpRoundedIcon className={'text-green-500'} />
            <span>
              {forecastData?.forecast?.forecastday[0]?.day?.maxtemp_c}°C
            </span>
          </div>
          <div>
            <KeyboardArrowDownRoundedIcon className={'text-red-500'} />
            <span>
              {forecastData?.forecast?.forecastday[0]?.day?.mintemp_c}°C
            </span>
          </div>
        </div>
        <Divider
          className={'hidden md:block'}
          orientation='vertical'
          variant='middle'
          flexItem
        />
        <div className={'hidden md:block'}>
          <AirRoundedIcon fontSize={'large'} className={'text-gray-400'} />
          <span className={'font-bold text-gray-500'}>
            {forecastData?.forecast?.forecastday[0]?.day?.maxwind_kph} k/h
          </span>
        </div>
        <Divider
          className={'hidden md:block'}
          orientation='vertical'
          variant='middle'
          flexItem
        />
        <div
          className={
            'flex-col *:flex *:gap-1 *:font-bold *:text-gray-500 hidden md:flex'
          }>
          <div>
            <WbTwilightRoundedIcon className={'text-yellow-400'} />
            <span>
              {forecastData?.forecast?.forecastday[0]?.astro?.sunrise}
            </span>
          </div>
          <div>
            <DarkModeRoundedIcon className={'text-blue-400'} />
            <span>{forecastData?.forecast?.forecastday[0]?.astro?.sunset}</span>
          </div>
        </div>
      </div>
      <Divider variant='middle' flexItem />
      <div className={'content grow flex-col gap-3 justify-between'}>
        <div className={'flex flex-col w-full'}>
          <h1 className={'font-bold text-gray-500 text-4xl md:text-3xl'}>
            {forecastData?.location?.name}/{forecastData?.location?.country}
          </h1>
          <span className={'text-lg md:text-xs text-gray-500'}>
            {forecastData?.location?.lat}, {forecastData?.location?.lon}
          </span>
        </div>
        <div className={'block md:hidden'}>
          <AirRoundedIcon
            fontSize={'large'}
            className={'!text-6xl text-gray-400'}
          />
          <span className={'font-bold text-2xl text-gray-500'}>
            {forecastData?.forecast?.forecastday[0]?.day?.maxwind_kph} k/h
          </span>
        </div>
        <div
          className={
            'flex flex-col *:flex *:gap-1 *:font-bold *:text-gray-500 md:hidden'
          }>
          <div className={'flex items-center'}>
            <WbTwilightRoundedIcon className={'!text-6xl text-yellow-400'} />
            <span className={'text-2xl'}>
              {forecastData?.forecast?.forecastday[0]?.astro?.sunrise}
            </span>
          </div>
          <div className={'flex items-center'}>
            <DarkModeRoundedIcon className={'!text-6xl text-blue-400'} />
            <span className={'text-2xl'}>
              {forecastData?.forecast?.forecastday[0]?.astro?.sunset}
            </span>
          </div>
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
