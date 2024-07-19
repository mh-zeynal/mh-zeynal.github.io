import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LatLng } from 'leaflet';
import { Button } from '@mui/material';
import { DateValidationError } from '@mui/x-date-pickers';
import Map from 'components/map/Map';
import moment from 'moment';
import { DatePickerInput } from 'components/home/datepicker/DatePickerInput';
import { Driver, driver as DriverConstructor } from 'driver.js';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';


export function HomePage() {
  const [ selectedDate, setSelectedDate ] = useState<moment.Moment | null>( moment() );
  const [ dateError, setDateError ] = useState<DateValidationError | null>( null );
  const [ selectedCoordinate, setSelectedCoordinate ] = useState<LatLng | null>( null );
  const [ showMapError, setShowMapError ] = useState( false );
  const navigate = useNavigate();

  useEffect( () => {
    const isFirstVisit = localStorage.getItem( 'isFirstVisit' ) !== 'false';

    if ( isFirstVisit ) {
      startGuide();
      localStorage.setItem( 'isFirstVisit', 'false' );
    }
  }, [] );

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

  const startGuide = () => {
    const driver: Driver = DriverConstructor( {
      allowClose: true,
      showProgress: true,
      nextBtnText: 'Next',
      prevBtnText: 'Previous'
    } );

    driver.setSteps( [
      {
        popover: {
          title: 'Welcome to Weather Forecast!',
          description: 'This guide will help you get started with selecting a date and location for your weather forecast.',
          side: 'over',
          align: 'center',
          doneBtnText: 'Skip',
        }
      },
      {
        element: '.map-box',
        popover: {
          title: 'Map',
          description: 'Select a coordinate on the map.',
          side: 'top',
          doneBtnText: 'Skip',
        }
      },
      {
        element: '.datepicker-input',
        popover: {
          title: 'Date Picker',
          description: 'Pick a date for the weather forecast.',
          side: 'top',
          doneBtnText: 'Skip',
        }
      },
      {
        element: '.submit-button',
        popover: {
          title: 'Submit',
          description: 'Click here to submit your selected date and location.',
          side: 'top',
          doneBtnText: 'Done'
        }
      }
    ] );
    driver.drive();
  };

  return (
    <div className="relative flex flex-col gap-4 pb-20 box-border">
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
            classes={'dark:*:text-white datepicker-input'}
          />
          <Button
            className="text-white bg-primary h-12 w-60 text-lg rounded-lg submit-button"
            onClick={navigateToWeatherInfoPage}
          >
            Submit
          </Button>
        </div>
      </div>
      <Button
        className="absolute top-2 right-2 text-white bg-secondary h-12 w-12 !min-w-0 p-0 rounded-full"
        onClick={startGuide}
      >
        <HelpRoundedIcon />
      </Button>
    </div>
  );
}
