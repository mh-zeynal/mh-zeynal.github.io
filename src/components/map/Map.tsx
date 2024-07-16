import React from 'react';
import { MapContainer, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import { MapMarker } from './MapMarker';
import { LatLng, LeafletMouseEvent, LocationEvent } from 'leaflet';

interface MapProps {
  classes?: string;
  position: LatLng | null;
  setPosition: Function;
}

export default function Map( {
  classes = 'h-96 w-96',
  position,
  setPosition,
}: MapProps ) {
  function LocationMarker() {
    const mapEvents = useMapEvents( {
      click( e: LeafletMouseEvent ) {
        setPosition( e.latlng );
        mapEvents.flyTo( e.latlng, mapEvents.getZoom() );
      },
      locationfound( e: LocationEvent ) {
        setPosition( e.latlng );
        mapEvents.flyTo( e.latlng, mapEvents.getZoom() );
      },
    } );

    return position ? (
      <MapMarker position={position}>
        <Popup>You clicked here</Popup>
      </MapMarker>
    ) : null;
  }

  return (
    <div className={`map-box rounded-xl overflow-hidden ${ classes }`}>
      <MapContainer
        center={[ 35.699648, 51.338359 ]}
        zoom={12}
        scrollWheelZoom={true}
        touchZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}
