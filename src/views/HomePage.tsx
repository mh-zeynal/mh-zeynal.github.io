import Map from 'components/map/Map';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { useState } from 'react';
import { LatLng } from 'leaflet';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const [ selectedDate, setSelectedDate ] = useState<moment.Moment | null>( null );
  const [ selectedCoordinate, setSelectedCoordinate ] = useState<LatLng | null>(
    null
  );
  const navigate = useNavigate();

  function navigateToWeatherInfoPage() {
    if ( !selectedDate || !selectedCoordinate ) return;
    navigate(
      `/forecast?lat=${ selectedCoordinate?.lat }&lng=${ selectedCoordinate?.lng }&date=${ selectedDate?.valueOf() }`
    );
  }

  return (
    <div className='flex flex-col gap-4 pb-24 box-border'>
      <div className='grow flex flex-col md:flex-row w-full items-start gap-4'>
        <Map
          classes='h-96 md:h-full w-full'
          position={selectedCoordinate}
          setPosition={setSelectedCoordinate}
        />
        <div className='h-full w-full flex flex-col gap-2 items-center justify-center'>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              className={'*:rounded-lg'}
              value={selectedDate}
              onChange={newDate => setSelectedDate( newDate )}
              maxDate={moment( new Date(), 'DD-MM-YYYY' ).add( 14, 'days' )}
              minDate={moment( new Date(), 'DD-MM-YYYY' )}
            />
          </LocalizationProvider>
          <Button
            className={'text-white bg-primary h-12 w-60 text-lg rounded-lg'}
            onClick={() => navigateToWeatherInfoPage()}>
            Check weather info
          </Button>
        </div>
      </div>
    </div>
  );
}
