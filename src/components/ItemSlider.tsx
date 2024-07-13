import React, { useEffect, useRef } from 'react';
import { SwiperOptions } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

interface ItemSliderProps<T> {
  data: T[];
  // eslint-disable-next-line no-unused-vars
  renderItem: ( item: T ) => React.ReactNode;
  swiperConfig: SwiperOptions;
}

export function ItemSlider<T>( { data, renderItem, swiperConfig }: ItemSliderProps<T> ) {
  const swiperContainerRef = useRef<HTMLDivElement>( null );

  useEffect( () => {
    if ( swiperContainerRef.current ) {
      new Swiper( swiperContainerRef.current, {
        modules: [ Navigation, Pagination ],
        speed: 400,
        spaceBetween: 30,
        rewind: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'bullets'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        ...swiperConfig
      } );
    }
  }, [swiperConfig] );

  return (
    <div className="overflow-hidden w-full relative pb-7">
      <div ref={swiperContainerRef} className="swiper w-full !overflow-visible">
        <div className="swiper-wrapper">
          {data.map( ( item: T, index: number ) => (
            <div className="swiper-slide" key={index}>
              {renderItem( item )}
            </div>
          ) )}
        </div>
        <div className="swiper-pagination absolute !-bottom-7 md:hidden" />
        <div className="swiper-button-next !hidden md:!block" />
        <div className="swiper-button-prev !hidden md:!block" />
      </div>
    </div>
  );
}
