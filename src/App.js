import React, { useRef, useEffect, useState } from 'react';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoieXVqaWV6aGFuZzEyNSIsImEiOiJja3Ztb2I4bDMzNHV4MnVxZnFhNG5sZDIyIn0.8MKp_jRj8QSo5B_uMmbMZg';


export default function App() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-118.2868);
    const [lat, setLat] = useState(34.0227);
    const [zoom, setZoom] = useState(14.7);

    // add points
    // map.on('load', () => {})

    // add points end


    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom
        });
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
          setLng(map.current.getCenter().lng.toFixed(4));
          setLat(map.current.getCenter().lat.toFixed(4));
          setZoom(map.current.getZoom().toFixed(2));
        });
      });


    // return (
    //     <div>
    //         <div ref={mapContainer} className="map-container" />
    //     </div>
    // );

    return (
        <div>
          <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
          <div ref={mapContainer} className="map-container" />
        </div>
      );
}