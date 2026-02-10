import React from 'react';
import { formatTime } from '../utils/prayerTimes';
import './MasjidDetails.css';

const MasjidDetails = ({ masjid, onClose, userLocation }) => {
  const getDirections = () => {
    const [lng, lat] = masjid.location.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const calculateDistance = () => {
    if (!userLocation) return null;
    
    const [lng, lat] = masjid.location.coordinates;
    const R = 6371; // Earth's radius in km
    const dLat = (lat - userLocation[0]) * Math.PI / 180;
    const dLon = (lng - userLocation[1]) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(userLocation[0] * Math.PI / 180) * Math.cos(lat * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance.toFixed(2);
  };

  const distance = calculateDistance();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{masjid.name}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-body">
          <div className="detail-section">
            <p><strong>Address:</strong> {masjid.address}</p>
            {distance && <p><strong>Distance:</strong> {distance} km</p>}
            {masjid.phoneNumber && <p><strong>Phone:</strong> {masjid.phoneNumber}</p>}
            {masjid.description && <p><strong>Description:</strong> {masjid.description}</p>}
          </div>

          <div className="prayer-times-section">
            <h3>Prayer Times</h3>
            <div className="prayer-times-grid">
              <div className="prayer-time-item">
                <span className="prayer-name">Fajr</span>
                <span className="prayer-time">{formatTime(masjid.prayerTimes.fajr)}</span>
              </div>
              <div className="prayer-time-item">
                <span className="prayer-name">Dhuhr</span>
                <span className="prayer-time">{formatTime(masjid.prayerTimes.dhuhr)}</span>
              </div>
              <div className="prayer-time-item">
                <span className="prayer-name">Asr</span>
                <span className="prayer-time">{formatTime(masjid.prayerTimes.asr)}</span>
              </div>
              <div className="prayer-time-item">
                <span className="prayer-name">Maghrib</span>
                <span className="prayer-time">{formatTime(masjid.prayerTimes.maghrib)}</span>
              </div>
              <div className="prayer-time-item">
                <span className="prayer-name">Isha</span>
                <span className="prayer-time">{formatTime(masjid.prayerTimes.isha)}</span>
              </div>
              {masjid.prayerTimes.jummah && (
                <div className="prayer-time-item">
                  <span className="prayer-name">Jummah</span>
                  <span className="prayer-time">{formatTime(masjid.prayerTimes.jummah)}</span>
                </div>
              )}
            </div>
          </div>

          <button className="directions-btn" onClick={getDirections}>
            🗺️ Get Directions
          </button>
        </div>
      </div>
    </div>
  );
};

export default MasjidDetails;