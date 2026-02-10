// import React, { useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { getNextPrayer, formatTime } from '../utils/prayerTimes';

// // Fix for default marker icon
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });

// // Custom icon for user location
// const userIcon = new L.Icon({
//   iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMDA3YmZmIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI4Ii8+PC9zdmc+',
//   iconSize: [25, 25],
//   iconAnchor: [12, 12],
// });

// // Component to handle map centering
// const MapController = ({ center }) => {
//   const map = useMap();
  
//   useEffect(() => {
//     if (center) {
//       map.setView(center, 13);
//     }
//   }, [center, map]);
  
//   return null;
// };

// const Map = ({ masjids, userLocation, onMasjidClick }) => {
//   const center = userLocation || [17.385044, 78.486671]; // Default to Hyderabad

//   return (
//     <MapContainer
//       center={center}
//       zoom={13}
//       style={{ height: '500px', width: '100%', borderRadius: '10px' }}
//     >
//       <MapController center={userLocation} />
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
      
//       {userLocation && (
//         <Marker position={userLocation} icon={userIcon}>
//           <Popup>Your Location</Popup>
//         </Marker>
//       )}
      
//       {masjids.map((masjid) => {
//         const nextPrayer = getNextPrayer(masjid.prayerTimes);
//         return (
//           <Marker
//             key={masjid._id}
//             position={[masjid.location.coordinates[1], masjid.location.coordinates[0]]}
//             eventHandlers={{
//               click: () => onMasjidClick(masjid)
//             }}
//           >
//             <Popup>
//               <div style={{ minWidth: '200px' }}>
//                 <h3 style={{ margin: '0 0 10px 0' }}>{masjid.name}</h3>
//                 <p style={{ margin: '5px 0', fontSize: '14px' }}>{masjid.address}</p>
//                 <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
//                   <strong>Next Prayer: {nextPrayer.name}</strong>
//                   <p style={{ margin: '5px 0' }}>{formatTime(nextPrayer.time)}</p>
//                 </div>
//                 <button
//                   onClick={() => onMasjidClick(masjid)}
//                   style={{
//                     marginTop: '10px',
//                     width: '100%',
//                     padding: '8px',
//                     backgroundColor: '#007bff',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '5px',
//                     cursor: 'pointer'
//                   }}
//                 >
//                   View Details
//                 </button>
//               </div>
//             </Popup>
//           </Marker>
//         );
//       })}
//     </MapContainer>
//   );
// };

// export default Map;



import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getNextPrayer, formatTime } from '../utils/prayerTimes';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom icon for user location
const userIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMDA3YmZmIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI4Ii8+PC9zdmc+',
  iconSize: [25, 25],
  iconAnchor: [12, 12],
});

// Custom icon for selected location
const selectedIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDMwIDQwIj48cGF0aCBmaWxsPSIjZmYwMDAwIiBkPSJNMTUgMEMxMC4wMjkgMCA2IDQuMDI5IDYgOWMwIDcuNSA5IDE5IDkgMTlzOS0xMS41IDktMTljMC00Ljk3MS00LjAyOS05LTktOXptMCAxM2MtMi4yMDkgMC00LTEuNzkxLTQtNHMxLjc5MS00IDQtNCA0IDEuNzkxIDQgNC0xLjc5MSA0LTQgNHoiLz48L3N2Zz4=',
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

// Component to handle map centering
const MapController = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [center, map]);
  
  return null;
};

// Component to handle map clicks
const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      if (onMapClick) {
        onMapClick(e.latlng);
      }
    },
  });
  return null;
};

const Map = ({ masjids, userLocation, onMasjidClick, onMapClick, selectedLocation }) => {
  const center = userLocation || [17.385044, 78.486671]; // Default to Hyderabad

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: '500px', width: '100%', borderRadius: '10px' }}
    >
      <MapController center={userLocation} />
      {onMapClick && <MapClickHandler onMapClick={onMapClick} />}
      
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {userLocation && (
        <Marker position={userLocation} icon={userIcon}>
          <Popup>
            <div style={{ minWidth: '150px' }}>
              <strong>Your Location</strong>
              <br />
              <small>Lat: {userLocation[0].toFixed(6)}</small>
              <br />
              <small>Lng: {userLocation[1].toFixed(6)}</small>
            </div>
          </Popup>
        </Marker>
      )}

      {selectedLocation && (
        <Marker position={[selectedLocation.lat, selectedLocation.lng]} icon={selectedIcon}>
          <Popup>
            <div style={{ minWidth: '200px' }}>
              <strong>Selected Location</strong>
              <br />
              <strong>Latitude:</strong> {selectedLocation.lat.toFixed(6)}
              <br />
              <strong>Longitude:</strong> {selectedLocation.lng.toFixed(6)}
              <br />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${selectedLocation.lat.toFixed(6)}, ${selectedLocation.lng.toFixed(6)}`);
                  alert('Coordinates copied to clipboard!');
                }}
                style={{
                  marginTop: '10px',
                  width: '100%',
                  padding: '8px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                📋 Copy Coordinates
              </button>
            </div>
          </Popup>
        </Marker>
      )}
      
      {masjids && masjids.map((masjid) => {
        const nextPrayer = getNextPrayer(masjid.prayerTimes);
        return (
          <Marker
            key={masjid._id}
            position={[masjid.location.coordinates[1], masjid.location.coordinates[0]]}
            eventHandlers={{
              click: () => onMasjidClick && onMasjidClick(masjid)
            }}
          >
            <Popup>
              <div style={{ minWidth: '200px' }}>
                <h3 style={{ margin: '0 0 10px 0' }}>{masjid.name}</h3>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>{masjid.address}</p>
                <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
                  <strong>Next Prayer: {nextPrayer.name}</strong>
                  <p style={{ margin: '5px 0' }}>{formatTime(nextPrayer.time)}</p>
                </div>
                {onMasjidClick && (
                  <button
                    onClick={() => onMasjidClick(masjid)}
                    style={{
                      marginTop: '10px',
                      width: '100%',
                      padding: '8px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    View Details
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;