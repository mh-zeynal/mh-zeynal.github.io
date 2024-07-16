import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerUrl from 'assets/mapMarker.svg';
import { Marker } from 'react-leaflet';

interface MarkerProps {
  position: L.LatLngExpression;
  children: React.ReactNode;
}

export function MapMarker( { position, children }: MarkerProps ) {

  const customIcon = L.icon( {
    iconUrl: MarkerUrl,
    iconSize: [ 50, 50 ],
    iconAnchor: [ 25, 50 ]
  } );

  return (
    <Marker position={position} icon={customIcon}>
      {children}
    </Marker>
  );
}
