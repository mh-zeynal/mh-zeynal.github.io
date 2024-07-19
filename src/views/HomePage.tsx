import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LatLng } from 'leaflet';
import { Button } from '@mui/material';
import { DateValidationError } from '@mui/x-date-pickers';
import Map from 'components/map/Map';
import moment from 'moment';
import { DatePickerInput } from 'components/home/datepicker/DatePickerInput';

export function HomePage() {
  const [ selectedDate, setSelectedDate ] = useState<moment.Moment | null>( moment() );
  const [ dateError, setDateError ] = useState<DateValidationError | null>( null );
  const [ selectedCoordinate, setSelectedCoordinate ] = useState<LatLng | null>( null );
  const [ showMapError, setShowMapError ] = useState( false );
  const navigate = useNavigate();

  const navigateToWeatherInfoPage = () => {
    if ( dateError || !selectedDate || !selectedCoordinate ) {
      setShowMapError( !selectedCoordinate ); // Show error if no coordinate is selected
      return;
    }

    const queryParams = {
      lat: String( selectedCoordinate.lat ),
      lng: String( selectedCoordinate.lng ),
      date: String( selectedDate.valueOf() )
    };

    navigate( `/forecast?${ new URLSearchParams( queryParams ).toString() }` );
  };

  const handleMapInteraction = () => {
    if ( showMapError ) {
      setShowMapError( false );
    }
  };

  return (
    <div className="flex flex-col gap-4 pb-20 box-border">
      <div className="grow flex flex-col md:flex-row w-full items-start gap-4">
        <Map
          classes="h-full w-full"
          position={selectedCoordinate}
          setPosition={setSelectedCoordinate}
          showError={showMapError}
          onMapInteraction={handleMapInteraction}
        />
        <div className="h-full w-full flex flex-col gap-5 items-center justify-center">
          <DatePickerInput
            value={selectedDate}
            onValueChange={setSelectedDate}
            maxDate={moment().add( 14, 'days' )}
            minDate={moment()}
            error={dateError}
            onError={setDateError}
            classes={'dark:*:text-white'}
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
