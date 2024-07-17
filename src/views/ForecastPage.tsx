import React, { useEffect } from 'react';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import AirRoundedIcon from '@mui/icons-material/AirRounded';
import WbTwilightRoundedIcon from '@mui/icons-material/WbTwilightRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import { Divider, Skeleton } from '@mui/material';
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
  const { forecastData, isLoading } = useAppSelector(
    ( state: RootState ) => state.forecast
  );
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

    dispatch(
      fetchForecastData( {
        latitude: +latitude,
        longitude: +longitude,
        date: date
      } )
    );
  }, [] );

  return (
    <div className={'flex flex-col h-full gap-1 *:flex'}>
      <div className={'header items-center justify-start gap-2'}>
        <div className={'flex gap-1'}>
          {isLoading ? (
            <Skeleton
              variant='rounded'
              sx={{ width: '60px', height: '60px' }}
            />
          ) : (
            <img
              src={forecastData?.forecast?.forecastday[0]?.day?.condition?.icon}
              alt={forecastData?.forecast?.forecastday[0]?.day?.condition?.text}
            />
          )}
          <div className={'flex flex-col gap-1'}>
            {isLoading ? (
              <Skeleton
                variant='text'
                sx={{ fontSize: '1rem', width: '48px' }}
              />
            ) : (
              <span className={'text-lg'}>
                {forecastData?.forecast?.forecastday[0]?.day?.condition?.text}
              </span>
            )}
            {isLoading ? (
              <Skeleton
                variant='text'
                sx={{ fontSize: '1rem', width: '48px' }}
              />
            ) : (
              <span className={'text-sm font-bold text-gray-500'}>
                {forecastData?.forecast?.forecastday[0]?.day?.avgtemp_c}°C
              </span>
            )}
          </div>
        </div>
        <Divider orientation='vertical' variant='middle' flexItem />
        <div
          className={
            'flex flex-col gap-1 *:text-sm *:font-bold *:text-gray-500 *:flex *:gap-1'
          }>
          <div>
            <KeyboardArrowUpRoundedIcon className={'text-green-500'} />
            {isLoading ? (
              <Skeleton
                variant='text'
                sx={{ fontSize: '1rem', width: '30px' }}
              />
            ) : (
              <span>
                {forecastData?.forecast?.forecastday[0]?.day?.maxtemp_c}°C
              </span>
            )}
          </div>
          <div>
            <KeyboardArrowDownRoundedIcon className={'text-red-500'} />
            {isLoading ? (
              <Skeleton
                variant='text'
                sx={{ fontSize: '1rem', width: '30px' }}
              />
            ) : (
              <span>
                {forecastData?.forecast?.forecastday[0]?.day?.mintemp_c}°C
              </span>
            )}
          </div>
        </div>
        <Divider
          className={'hidden md:block'}
          orientation='vertical'
          variant='middle'
          flexItem
        />
        <div className={'hidden md:flex gap-1 items-center'}>
          <AirRoundedIcon fontSize={'large'} className={'text-gray-400'} />
          {isLoading ? (
            <Skeleton variant='text' sx={{ fontSize: '2rem', width: '40px' }} />
          ) : (
            <span className={'font-bold text-gray-500'}>
              {forecastData?.forecast?.forecastday[0]?.day?.maxwind_kph} k/h
            </span>
          )}
        </div>
        <Divider
          className={'hidden md:block'}
          orientation='vertical'
          variant='middle'
          flexItem
        />
        <div
          className={
            'flex-col *:flex *:gap-1 *:font-bold *:text-gray-500 *:items-center hidden md:flex'
          }>
          <div>
            <WbTwilightRoundedIcon className={'text-yellow-400'} />
            {isLoading ? (
              <Skeleton
                variant='text'
                sx={{ fontSize: '1rem', width: '30px' }}
              />
            ) : (
              <span>
                {forecastData?.forecast?.forecastday[0]?.astro?.sunrise}
              </span>
            )}
          </div>
          <div>
            <DarkModeRoundedIcon className={'text-blue-400'} />
            {isLoading ? (
              <Skeleton
                variant='text'
                sx={{ fontSize: '1rem', width: '30px' }}
              />
            ) : (
              <span>
                {forecastData?.forecast?.forecastday[0]?.astro?.sunset}
              </span>
            )}
          </div>
        </div>
      </div>
      <Divider variant='middle' flexItem />
      <div className={'content grow flex-col gap-3 justify-between'}>
        <div className={'flex flex-col w-full'}>
          {isLoading ? (
            <Skeleton
              variant='text'
              sx={{ fontSize: '2rem', width: '200px' }}
            />
          ) : (
            <span className={'font-bold text-gray-500 text-4xl md:text-3xl'}>
              {forecastData?.location?.name}/{forecastData?.location?.country}
            </span>
          )}
          {isLoading ? (
            <Skeleton variant='text' sx={{ fontSize: '1rem', width: '30px' }} />
          ) : (
            <span className={'text-lg md:text-xs text-gray-500'}>
              {forecastData?.location?.lat}, {forecastData?.location?.lon}
            </span>
          )}
        </div>
        <div className={'flex gap-1 items-center md:hidden'}>
          <AirRoundedIcon
            fontSize={'large'}
            className={'!text-6xl text-gray-400'}
          />
          {isLoading ? (
            <Skeleton variant='text' sx={{ fontSize: '2rem', width: '70px' }} />
          ) : (
            <span className={'font-bold text-2xl text-gray-500'}>
              {forecastData?.forecast?.forecastday[0]?.day?.maxwind_kph} k/h
            </span>
          )}
        </div>
        <div
          className={
            'flex flex-col *:flex *:gap-1 *:items-center *:font-bold *:text-gray-500 md:hidden'
          }>
          <div className={'flex items-center'}>
            <WbTwilightRoundedIcon className={'!text-6xl text-yellow-400'} />
            {isLoading ? (
              <Skeleton
                variant='text'
                sx={{ fontSize: '2rem', width: '70px' }}
              />
            ) : (
              <span className={'text-2xl'}>
                {forecastData?.forecast?.forecastday[0]?.astro?.sunrise}
              </span>
            )}
          </div>
          <div className={'flex items-center'}>
            <DarkModeRoundedIcon className={'!text-6xl text-blue-400'} />
            {isLoading ? (
              <Skeleton
                variant='text'
                sx={{ fontSize: '2rem', width: '70px' }}
              />
            ) : (
              <span className={'text-2xl'}>
                {forecastData?.forecast?.forecastday[0]?.astro?.sunset}
              </span>
            )}
          </div>
        </div>
        {isLoading ? <ItemSlider<number>
          data={Array.from( Array( 24 ).keys() )}
          renderItem={() => ( <Skeleton variant='rounded' sx={{ width: '288px', height: '450px', borderRadius: '15px' }} /> )}
          swiperConfig={swiperConfig}
        /> :
          <ItemSlider<HourResponseDto>
            data={forecastData?.forecast?.forecastday[0]?.hour || []}
            renderItem={( hourData: HourResponseDto ) => (
              <ForecastCard forecastData={hourData} />
            )}
            swiperConfig={swiperConfig}
          />
        }
      </div>
    </div>
  );
}
