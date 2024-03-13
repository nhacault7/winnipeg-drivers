import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Set your Mapbox access token here
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

// Function to determine marker color based on colorCode
function getMarkerColor(colorCode) {
  switch (colorCode) {
    case "Violation":
      return "#0D99DA"; // Blue
    case "Close Call":
      return "#F4D91F" // Yellow
    case "Collision":
      return "#CB1F05"; // Red
    case "Winnipeg Things":
      return "#8E3CE9"; // Purple
    case "Road Rage":
      return "#000000"; // Black
    default:
      return "#FFFFFF"; // White
  }
}

const Map = ({ legendCounts, updateLegendCounts }) => {
  const mapContainerRef = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/navigation-night-v1',
      center: [-97.1384, 49.8801], // Winnipeg coordinates: [longitude, latitude]
      maxBounds: new mapboxgl.LngLatBounds(
        [-98.317194, 49.370468], 
        [-96.055923, 50.269497]
      ), 
      zoom: 11, // Adjust the zoom level as needed
      minZoom: 9,
    });

    // Add navigation control to the map
    const navigationControl = new mapboxgl.NavigationControl();
    map.current.addControl(navigationControl, 'top-right'); // Position the control to the top-right corner

    // Define marker coordinates and popup content
    fetch('archive.json')
      .then((response) => response.json())
      .then((data) => {
        data.forEach((markerInfo) => {
          // Define popup content structure
          const popupContent = `
            <div class="popup">
              <h3>${markerInfo.travelingStreet} @ ${markerInfo.crossStreet}</h3>
              <p>${markerInfo.date} ${markerInfo.time}\n</p>
              <div class="video-container">
                <iframe width="100%" height="100%" src="${markerInfo.url}" frameborder="0" allowfullscreen></iframe>
              </div>
            </div>
          `;
        
          // Create a popup element
          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent);

          // Create marker color
          const markerColor = getMarkerColor(markerInfo.type);

          // Create a marker and bind the popup to it
          new mapboxgl.Marker({
            color: markerColor,
            draggable: false,
          })
            .setLngLat(markerInfo.coordinates)
            .setPopup(popup)
            .addTo(map.current);

          // Update legend counts
          updateLegendCounts(markerInfo.type);
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    // Cleanup function to remove the map on component unmount
    // return () => map.current.remove();
  }, [updateLegendCounts]); // Empty dependency array ensures this effect runs only once

  return <div className="Map" ref={mapContainerRef} />;
};

export default Map;
