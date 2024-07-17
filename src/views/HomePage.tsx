import Map from 'components/map/Map';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { useState } from 'react';
import { LatLng } from 'leaflet';
import { Button as BaseButton, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const [ selectedDate, setSelectedDate ] = useState<moment.Moment | null>( null );
  const [ selectedCoordinate, setSelectedCoordinate ] = useState<LatLng | null>( null );
  const navigate = useNavigate();

  function navigateToWeatherInfoPage() {
    if ( !selectedDate || !selectedCoordinate )
      return;
    navigate( `/forecast?lat=${ selectedCoordinate?.lat }&lng=${ selectedCoordinate?.lng }&date=${ selectedDate?.valueOf() }` );
  }

  const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
  };

  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };

  const Button = styled( BaseButton )(
    ( { theme } ) => `
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5;
  background-color: ${ blue[500] };
  padding: 8px 16px;
  border-radius: 10px;
  color: white;
  min-width: 240px;
  transition: all 150ms ease;
  text-transform: capitalize;
  cursor: pointer;
  border: 1px solid ${ blue[500] };

  &:hover {
    background-color: ${ blue[600] };
  }

  &:active {
    background-color: ${ blue[700] };
    box-shadow: none;
    transform: scale(0.99);
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${ theme.palette.mode === 'dark' ? blue[300] : blue[200] };
    outline: none;
  }

  &.base--disabled {
    background-color: ${ theme.palette.mode === 'dark' ? grey[700] : grey[200] };
    color: ${ theme.palette.mode === 'dark' ? grey[200] : grey[700] };
    border: 0;
    cursor: default;
    box-shadow: none;
    transform: scale(1);
  }
`,
  );

  return (
    <div className='flex flex-col h-full gap-4'>
      <div className='grow flex flex-col md:flex-row w-full items-start gap-4'>
        <Map
          classes='h-96 md:h-full w-full'
          position={selectedCoordinate}
          setPosition={setSelectedCoordinate}
        />
        <div className='h-full w-full flex flex-col gap-2 items-center justify-center'>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              value={selectedDate}
              onChange={newDate => setSelectedDate( newDate )}
              maxDate={moment( new Date(), 'DD-MM-YYYY' ).add( 14, 'days' )}
              minDate={moment( new Date(), 'DD-MM-YYYY' )}
            />
          </LocalizationProvider>
          <Button onClick={() => navigateToWeatherInfoPage()}>Check weather info</Button>
        </div>
      </div>
    </div>
  );
}
