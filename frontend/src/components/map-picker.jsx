import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';

// Fix marker icon issues with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const LocationMarker = ({ setLatLng }) => {
  const [position, setPosition] = useState(null);

  // Add map click event
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setLatLng(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
};

const MapPicker = ({ setLatitude, setLongitude }) => {
  const [latLng, setLatLng] = useState({ lat: null, lng: null });
  const [name, setName] = useState('');  // Add state for location name

  // Update latitude, longitude, and name when the user clicks on the map and enters a name
  const handleSaveLocation = async () => {
    if (latLng.lat && latLng.lng && name) {
      setLatitude(latLng.lat);
      setLongitude(latLng.lng);

      try {
        // Send the name, latitude, and longitude to the backend
        await axios.post('http://localhost:5000/save-location', {
          latitude: latLng.lat,
          longitude: latLng.lng,
          name: name,  // Include name in the payloadk
        });
        alert(`Location saved! Name: ${name}, Latitude: ${latLng.lat}, Longitude: ${latLng.lng}`);
      } catch (error) {
        console.error('Error saving location:', error);
        alert('Error saving location');
      }
    } else {
      alert('Please enter a name and select a location on the map.');
    }
  };

  return (
    <div>
      <h2>Select a Location</h2>
      <MapContainer
        center={[13, 124]}
        zoom={11}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker setLatLng={setLatLng} />
      </MapContainer>

      {/* Input field to capture location name */}
      <input
        type="text"
        placeholder="Enter location name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginTop: '10px', padding: '5px', width: '100%' }}
      />

      <button onClick={handleSaveLocation} style={{ marginTop: '10px' }}>
        Save Location
      </button>
    </div>
  );
};

export default MapPicker;
