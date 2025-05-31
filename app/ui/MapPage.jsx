'use client';
// import MapView from './MapView';

import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('./MapView'), {
  ssr: false,
});

export default function MapPage({ tournaments }) {
  return <MapView tournaments={tournaments} />;
}
