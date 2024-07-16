import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { ForecastResponseDto } from 'types/forecastResponse.dto';
import axios from 'axios';
import axiosConfig from 'configs/axiosConfig';

export interface ForecastState {
  forecastData: ForecastResponseDto | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: ForecastState = {
  forecastData: null,
  error: null,
  isLoading: false,
};

interface FetchForecastParams {
  latitude: number;
  longitude: number;
  date: moment.Moment;
}

export const fetchForecastData = createAsyncThunk<
  ForecastResponseDto,
  FetchForecastParams,
  { rejectValue: string }
>(
  'forecast/getForecast',
  async( { latitude, longitude, date }, { rejectWithValue } ) => {
    try {
      const { data } = await axiosConfig.get<ForecastResponseDto>(
        '/forecast.json',
        {
          params: {
            q: `${ latitude },${ longitude }`,
            days: date.diff( moment(), 'days' ),
          },
        }
      );

      return data;
    } catch ( error ) {
      if ( axios.isAxiosError( error ) && error.response ) {
        const errorMessage: string =
          ( error.response.data as { message?: string } )?.message ||
          'Failed to fetch forecast data';

        return rejectWithValue( errorMessage );
      } else {
        return rejectWithValue( 'Failed to fetch forecast data' );
      }
    }
  }
);

export const forecastSlice = createSlice( {
  name: 'forecast',
  initialState,
  reducers: {},
  extraReducers: ( builder ) => {
    builder
      .addCase( fetchForecastData.pending, ( state ) => {
        state.isLoading = true;
      } )
      .addCase( fetchForecastData.fulfilled, ( state, action ) => {
        state.forecastData = action.payload;
        state.isLoading = false;
        state.error = null;
      } )
      .addCase( fetchForecastData.rejected, ( state, action ) => {
        state.error = action.payload || 'Failed to fetch forecast data';
        state.isLoading = false;
      } );
  },
} );

export default forecastSlice.reducer;
