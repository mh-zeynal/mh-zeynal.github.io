import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {
  DatePicker,
  DateValidationError,
  LocalizationProvider
} from '@mui/x-date-pickers';
import moment from 'moment/moment';
import React, { useMemo } from 'react';
import { Box } from '@mui/material';

interface DatePickerProps {
  value: moment.Moment | null;
  onValueChange: Function;
  error: DateValidationError;
  onError: Function;
  minDate?: moment.Moment;
  maxDate?: moment.Moment;
  classes?: string;
}

export function DatePickerInput( {
  value,
  onValueChange,
  minDate,
  maxDate,
  classes,
  error,
  onError
}: DatePickerProps ) {
  const errorMessage = useMemo( () => {
    switch ( error ) {
    case 'maxDate':
      return `Select date before ${ moment( maxDate ).add( 1, 'day' )
        .format( 'MM/DD/YYYY' ) }`;

    case 'minDate': {
      return `Select date after ${ moment( minDate ).subtract( 1, 'day' )
        .format( 'MM/DD/YYYY' ) }`;
    }

    case 'invalidDate': {
      return 'Invalid date';
    }

    default: {
      return '';
    }
    }
  }, [
    error, maxDate, minDate
  ] );

  const handleChange = ( newDate: moment.Moment | null ) => {
    if ( newDate ) {
      onValueChange( newDate );
    }
  };

  const handleError = ( newError: DateValidationError | null ) => {
    onError( newError );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box width={246}>
        <DatePicker
          className={`*:rounded-lg ${ classes }`}
          value={value}
          onChange={handleChange}
          maxDate={maxDate}
          minDate={minDate}
          defaultValue={moment( new Date(), 'DD/MM/YYYY' )}
          onError={handleError}
          slotProps={{
            textField: {
              helperText: errorMessage
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
}
