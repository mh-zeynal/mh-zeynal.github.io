import React from 'react';
import { MapContainer, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import { MapMarker } from './MapMarker';
import { LatLng, LeafletMouseEvent, LocationEvent } from 'leaflet';
import './Map.scss';

interface MapProps {
  classes?: string;
  position: LatLng | null;
  setPosition: Function;
  showError: boolean;
  onMapInteraction: () => void;
}

export default function Map( {
  classes = 'h-96 w-96',
  position,
  setPosition,
  showError,
  onMapInteraction,
}: MapProps ) {
  function LocationMarkerComponent() {
    const mapEvents = useMapEvents( {
      click( e: LeafletMouseEvent ) {
        setPosition( e.latlng );
        mapEvents.flyTo( e.latlng, mapEvents.getZoom() );
      },
      locationfound( e: LocationEvent ) {
        setPosition( e.latlng );
        mapEvents.flyTo( e.latlng, mapEvents.getZoom() );
      },
      drag() {
        onMapInteraction();
      },
      zoom() {
        onMapInteraction();
      }
    } );

    return position ? (
      <MapMarker position={position}>
        <Popup>You clicked here</Popup>
      </MapMarker>
    ) : null;
  }

  return (
    <div className={`map-box rounded-xl overflow-hidden ${ classes } relative`}>
      <MapContainer
        center={[ 35.699648, 51.338359 ]}
        zoom={11}
        maxZoom={11}
        scrollWheelZoom={true}
        touchZoom={true}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <LocationMarkerComponent />
      </MapContainer>
      {showError && (
        <div className="fade-in absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center pointer-events-none bg-white bg-opacity-75 dark:bg-gray-400 dark:bg-opacity-75 z-10">
          <span className="text-red-500 font-bold text-lg">
            Select a coordinate
          </span>
        </div>
      )}
    </div>
  );
}
