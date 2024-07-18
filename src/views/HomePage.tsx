import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LatLng } from 'leaflet';
import { Button } from '@mui/material';
import { DateValidationError } from '@mui/x-date-pickers';
import Map from 'components/map/Map';
import moment from 'moment';
import { DatePickerInput } from 'components/home/DatePickerInput';

export function HomePage() {
  const [ selectedDate, setSelectedDate ] = useState<moment.Moment | null>( null );
  const [ dateError, setDateError ] = useState<DateValidationError | null>( null );
  const [ selectedCoordinate, setSelectedCoordinate ] = useState<LatLng | null>( null );
  const navigate = useNavigate();

  const navigateToWeatherInfoPage = () => {
    if ( dateError || !selectedDate || !selectedCoordinate ) {
      return;
    }

    const queryParams = {
      lat: String( selectedCoordinate.lat ),
      lng: String( selectedCoordinate.lng ),
      date: String( selectedDate.valueOf() )
    };

    navigate( `/forecast?${ new URLSearchParams( queryParams ).toString() }` );
  };

  return (
    <div className="flex flex-col gap-4 pb-20 box-border">
      <div className="grow flex flex-col md:flex-row w-full items-start gap-4">
        <Map
          classes="h-96 h-full w-full"
          position={selectedCoordinate}
          setPosition={setSelectedCoordinate}
        />
        <div className="h-full w-full flex flex-col gap-2 items-center justify-center">
          <DatePickerInput
            value={selectedDate}
            onValueChange={setSelectedDate}
            maxDate={moment().add( 14, 'days' )}
            minDate={moment()}
            error={dateError}
            onError={setDateError}
          />
          <Button
            className="text-white bg-primary h-12 w-60 text-lg rounded-lg"
            onClick={navigateToWeatherInfoPage}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
