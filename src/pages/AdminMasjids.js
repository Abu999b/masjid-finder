// import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { masjidAPI } from '../services/api';
// import './AdminMasjids.css';

// const AdminMasjids = () => {
//   const { user } = useContext(AuthContext);
//   const [masjids, setMasjids] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingMasjid, setEditingMasjid] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     address: '',
//     latitude: '',
//     longitude: '',
//     description: '',
//     phoneNumber: '',
//     prayerTimes: {
//       fajr: '',
//       dhuhr: '',
//       asr: '',
//       maghrib: '',
//       isha: '',
//       jummah: ''
//     }
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchMasjids();
//   }, []);

//   const fetchMasjids = async () => {
//     try {
//       const response = await masjidAPI.getAll();
//       setMasjids(response.data.data);
//     } catch (err) {
//       setError('Failed to fetch masjids');
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     if (name.includes('.')) {
//       const [parent, child] = name.split('.');
//       setFormData({
//         ...formData,
//         [parent]: {
//           ...formData[parent],
//           [child]: value
//         }
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value
//       });
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       name: '',
//       address: '',
//       latitude: '',
//       longitude: '',
//       description: '',
//       phoneNumber: '',
//       prayerTimes: {
//         fajr: '',
//         dhuhr: '',
//         asr: '',
//         maghrib: '',
//         isha: '',
//         jummah: ''
//       }
//     });
//     setEditingMasjid(null);
//     setShowForm(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);

//     try {
//       if (editingMasjid) {
//         await masjidAPI.update(editingMasjid._id, formData);
//         setSuccess('Masjid updated successfully');
//       } else {
//         await masjidAPI.create(formData);
//         setSuccess('Masjid created successfully');
//       }
      
//       fetchMasjids();
//       resetForm();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Operation failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (masjid) => {
//     setEditingMasjid(masjid);
//     setFormData({
//       name: masjid.name,
//       address: masjid.address,
//       latitude: masjid.location.coordinates[1].toString(),
//       longitude: masjid.location.coordinates[0].toString(),
//       description: masjid.description || '',
//       phoneNumber: masjid.phoneNumber || '',
//       prayerTimes: masjid.prayerTimes
//     });
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this masjid?')) {
//       try {
//         await masjidAPI.delete(id);
//         setSuccess('Masjid deleted successfully');
//         fetchMasjids();
//       } catch (err) {
//         setError('Failed to delete masjid');
//       }
//     }
//   };

//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setFormData({
//             ...formData,
//             latitude: position.coords.latitude.toString(),
//             longitude: position.coords.longitude.toString()
//           });
//         },
//         (error) => {
//           alert('Unable to get your location');
//         }
//       );
//     }
//   };

//   if (!user || (user.role !== 'admin' && user.role !== 'main_admin')) {
//     return <div className="container">You don't have permission to access this page.</div>;
//   }

//   return (
//     <div className="admin-container">
//       <div className="admin-header">
//         <h1>Manage Masjids</h1>
//         <button
//           className="btn btn-primary"
//           onClick={() => setShowForm(!showForm)}
//         >
//           {showForm ? 'Cancel' : '+ Add New Masjid'}
//         </button>
//       </div>

//       {error && <div className="alert alert-error">{error}</div>}
//       {success && <div className="alert alert-success">{success}</div>}

//       {showForm && (
//         <div className="card">
//           <h2>{editingMasjid ? 'Edit Masjid' : 'Add New Masjid'}</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Masjid Name *</label>
//                 <input
//                   type="text"
//                   name="name"
//                   className="form-control"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Phone Number</label>
//                 <input
//                   type="tel"
//                   name="phoneNumber"
//                   className="form-control"
//                   value={formData.phoneNumber}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Address *</label>
//               <input
//                 type="text"
//                 name="address"
//                 className="form-control"
//                 value={formData.address}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Latitude *</label>
//                 <input
//                   type="number"
//                   step="any"
//                   name="latitude"
//                   className="form-control"
//                   value={formData.latitude}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Longitude *</label>
//                 <input
//                   type="number"
//                   step="any"
//                   name="longitude"
//                   className="form-control"
//                   value={formData.longitude}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>&nbsp;</label>
//                 <button
//                   type="button"
//                   className="btn btn-success"
//                   onClick={getCurrentLocation}
//                 >
//                   Use My Location
//                 </button>
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Description</label>
//               <textarea
//                 name="description"
//                 className="form-control"
//                 rows="3"
//                 value={formData.description}
//                 onChange={handleChange}
//               />
//             </div>

//             <h3>Prayer Times</h3>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Fajr *</label>
//                 <input
//                   type="time"
//                   name="prayerTimes.fajr"
//                   className="form-control"
//                   value={formData.prayerTimes.fajr}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Dhuhr *</label>
//                 <input
//                   type="time"
//                   name="prayerTimes.dhuhr"
//                   className="form-control"
//                   value={formData.prayerTimes.dhuhr}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Asr *</label>
//                 <input
//                   type="time"
//                   name="prayerTimes.asr"
//                   className="form-control"
//                   value={formData.prayerTimes.asr}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Maghrib *</label>
//                 <input
//                   type="time"
//                   name="prayerTimes.maghrib"
//                   className="form-control"
//                   value={formData.prayerTimes.maghrib}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Isha *</label>
//                 <input
//                   type="time"
//                   name="prayerTimes.isha"
//                   className="form-control"
//                   value={formData.prayerTimes.isha}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Jummah</label>
//                 <input
//                   type="time"
//                   name="prayerTimes.jummah"
//                   className="form-control"
//                   value={formData.prayerTimes.jummah}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <div className="form-actions">
//               <button type="submit" className="btn btn-primary" disabled={loading}>
//                 {loading ? 'Saving...' : editingMasjid ? 'Update Masjid' : 'Add Masjid'}
//               </button>
//               <button type="button" className="btn btn-danger" onClick={resetForm}>
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       <div className="masjids-table">
//         <h2>All Masjids ({masjids.length})</h2>
//         {masjids.length === 0 ? (
//           <p>No masjids added yet.</p>
//         ) : (
//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Address</th>
//                 <th>Phone</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {masjids.map((masjid) => (
//                 <tr key={masjid._id}>
//                   <td>{masjid.name}</td>
//                   <td>{masjid.address}</td>
//                   <td>{masjid.phoneNumber || 'N/A'}</td>
//                   <td className="actions">
//                     <button
//                       className="btn btn-primary btn-sm"
//                       onClick={() => handleEdit(masjid)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={() => handleDelete(masjid._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminMasjids;

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { masjidAPI } from '../services/api';
import Map from '../components/Map';
import './AdminMasjids.css';

const AdminMasjids = () => {
  const { user } = useContext(AuthContext);
  const [masjids, setMasjids] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMasjid, setEditingMasjid] = useState(null);
  const [tempLocation, setTempLocation] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: '',
    description: '',
    phoneNumber: '',
    prayerTimes: {
      fajr: '',
      dhuhr: '',
      asr: '',
      maghrib: '',
      isha: '',
      jummah: ''
    }
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMasjids();
  }, []);

  const fetchMasjids = async () => {
    try {
      const response = await masjidAPI.getAll();
      setMasjids(response.data.data);
    } catch (err) {
      setError('Failed to fetch masjids');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      latitude: '',
      longitude: '',
      description: '',
      phoneNumber: '',
      prayerTimes: {
        fajr: '',
        dhuhr: '',
        asr: '',
        maghrib: '',
        isha: '',
        jummah: ''
      }
    });
    setEditingMasjid(null);
    setShowForm(false);
    setTempLocation(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (editingMasjid) {
        await masjidAPI.update(editingMasjid._id, formData);
        setSuccess('Masjid updated successfully');
      } else {
        await masjidAPI.create(formData);
        setSuccess('Masjid created successfully');
      }
      
      fetchMasjids();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (masjid) => {
    setEditingMasjid(masjid);
    setFormData({
      name: masjid.name,
      address: masjid.address,
      latitude: masjid.location.coordinates[1].toString(),
      longitude: masjid.location.coordinates[0].toString(),
      description: masjid.description || '',
      phoneNumber: masjid.phoneNumber || '',
      prayerTimes: masjid.prayerTimes
    });
    setTempLocation({
      lat: masjid.location.coordinates[1],
      lng: masjid.location.coordinates[0]
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this masjid?')) {
      try {
        await masjidAPI.delete(id);
        setSuccess('Masjid deleted successfully');
        fetchMasjids();
      } catch (err) {
        setError('Failed to delete masjid');
      }
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setFormData({
            ...formData,
            latitude: lat.toString(),
            longitude: lng.toString()
          });
          setTempLocation({ lat, lng });
        },
        (error) => {
          alert('Unable to get your location');
        }
      );
    }
  };

  const handleMapClick = (latlng) => {
    setTempLocation(latlng);
    setFormData({
      ...formData,
      latitude: latlng.lat.toFixed(6),
      longitude: latlng.lng.toFixed(6)
    });
  };

  if (!user || (user.role !== 'admin' && user.role !== 'main_admin')) {
    return <div className="container">You don't have permission to access this page.</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Manage Masjids</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Add New Masjid'}
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {showForm && (
        <div className="card">
          <h2>{editingMasjid ? 'Edit Masjid' : 'Add New Masjid'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Masjid Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  className="form-control"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Address *</label>
              <input
                type="text"
                name="address"
                className="form-control"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Latitude *</label>
                <input
                  type="number"
                  step="any"
                  name="latitude"
                  className="form-control"
                  value={formData.latitude}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Longitude *</label>
                <input
                  type="number"
                  step="any"
                  name="longitude"
                  className="form-control"
                  value={formData.longitude}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>&nbsp;</label>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={getCurrentLocation}
                >
                  📍 Use My Location
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Or click on the map below to select location</label>
              <div className="map-picker">
                <Map
                  masjids={[]}
                  userLocation={null}
                  onMasjidClick={null}
                  onMapClick={handleMapClick}
                  selectedLocation={tempLocation}
                />
              </div>
              {tempLocation && (
                <p className="location-selected">
                  ✓ Location selected: Lat {tempLocation.lat.toFixed(6)}, Lng {tempLocation.lng.toFixed(6)}
                </p>
              )}
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="3"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <h3>Prayer Times</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Fajr *</label>
                <input
                  type="time"
                  name="prayerTimes.fajr"
                  className="form-control"
                  value={formData.prayerTimes.fajr}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Dhuhr *</label>
                <input
                  type="time"
                  name="prayerTimes.dhuhr"
                  className="form-control"
                  value={formData.prayerTimes.dhuhr}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Asr *</label>
                <input
                  type="time"
                  name="prayerTimes.asr"
                  className="form-control"
                  value={formData.prayerTimes.asr}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Maghrib *</label>
                <input
                  type="time"
                  name="prayerTimes.maghrib"
                  className="form-control"
                  value={formData.prayerTimes.maghrib}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Isha *</label>
                <input
                  type="time"
                  name="prayerTimes.isha"
                  className="form-control"
                  value={formData.prayerTimes.isha}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Jummah</label>
                <input
                  type="time"
                  name="prayerTimes.jummah"
                  className="form-control"
                  value={formData.prayerTimes.jummah}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Saving...' : editingMasjid ? 'Update Masjid' : 'Add Masjid'}
              </button>
              <button type="button" className="btn btn-danger" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="masjids-table">
        <h2>All Masjids ({masjids.length})</h2>
        {masjids.length === 0 ? (
          <p>No masjids added yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {masjids.map((masjid) => (
                <tr key={masjid._id}>
                  <td>{masjid.name}</td>
                  <td>{masjid.address}</td>
                  <td>{masjid.phoneNumber || 'N/A'}</td>
                  <td className="actions">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEdit(masjid)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(masjid._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminMasjids;