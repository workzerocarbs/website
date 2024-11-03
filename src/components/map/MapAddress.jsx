import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker,  } from '@react-google-maps/api';
import '../map/style.scss'
import axios from 'axios';
import { TbCurrentLocation } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import { CiMapPin } from "react-icons/ci";
import BillingDetailsForm from '../address/BilllingDetailsForm';
import PlacesAutocomplete from 'react-places-autocomplete';
import { IoIosClose } from "react-icons/io";
import Loader from '../loader/Loader';

const mapStyles = {
  default: [],
  hide: [
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
  ],
};

function MapAddress() {
  const containerStyle = {
    width: '100%', // Make the map responsive
    height: '400px',
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDUmmxq__onPZGyroHzb95OnlqFX0kbss0', // Use your Google Maps API key
  });

  const [currentPosition, setCurrentPosition] = useState(null);
  const [address, setAddress] = useState(''); // State to store the address
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const [currentStyle, setCurrentStyle] = useState(mapStyles.hide);
  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });
 
  const [markerPosition, setMarkerPosition] = useState(center);
  const onLoad = useCallback(function callback(map) {
    setMap(map);
    mapRef.current = map;
  }, []);
  const [showAddressDetailForm, setShowAddressDetialForm] = useState(false)
  const [addressInput, setAddressInput] = useState(address);
  const [isBlurred, setIsBlurred] = useState(false);
  const [showSearchAutoCompleteField, setShowSearchAutoCompleteField] = useState(false)
  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);
 
  const toggleStyles = (style) => {
    if (mapRef.current) {
      mapRef.current.setOptions({ styles: style });
    }
    setCurrentStyle(style);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
          setCurrentPosition({
            lat: latitude,
            lng: longitude,
          });
          // Fetch the address for the initial position
          getPlaceDetails(latitude, longitude);
        },
        () => {
         // alert('Error fetching your location');
          { enableHighAccuracy: true }
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  }, []);

  const getPlaceDetails = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDUmmxq__onPZGyroHzb95OnlqFX0kbss0`
      );
      if (response.data.results[0]) {
        setAddress(response.data.results[0].formatted_address); // Update state with the address
      } else {
        setAddress('No address found');
      }
    } catch (error) {
      console.error('Error fetching the place details:', error);
    }
  };

  const onMarkerDragEnd = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat: lat, lng: lng });
    setCurrentPosition({ lat, lng });
    getPlaceDetails(lat, lng); // Fetch new address when marker is dragged
  };
  const handleMapClick = (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setAddressInput('')
    setShowSearchAutoCompleteField(false);
    setShowAddressDetialForm(false);
    setIsBlurred(false); // Reset any blur effect
    setCurrentPosition({ lat: newLat, lng: newLng })
    setMarkerPosition({ lat: newLat, lng: newLng });
    getPlaceDetails(newLat, newLng);
  };
  const handleSelect = (selectedAddress) => {
    setAddressInput(selectedAddress);
     // Use Google Maps Geocoder to get details of the selected address
     const geocoder = new window.google.maps.Geocoder();
     geocoder.geocode({ address: selectedAddress }, (results, status) => {
         if (status === window.google.maps.GeocoderStatus.OK) {
             const result = results[0];
             const lat = result.geometry.location.lat();
             const lng = result.geometry.location.lng();
             const newPosition = { lat, lng };
             const addressComponents = result.address_components;
             let state = '';
             let pin = '';
             setMarkerPosition(newPosition);
             setCurrentPosition(newPosition);
             map.panTo(newPosition);
             setAddress(result.formatted_address);
             addressComponents.forEach(component => {
                 if (component.types.includes('administrative_area_level_1')) {
                     state = component.long_name;
                 }
                 if (component.types.includes('postal_code')) {
                     pin = component.long_name;
                 }
             });

           
            
         }
     });
   
};
  return isLoaded && currentPosition ? (
    <div className={`map-container relative}`}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        onLoad={onLoad}
        onUnmount={onUnmount}
        zoom={15}
        options={{
          styles: currentStyle,
          mapTypeControl: false,
        }}
        onClick={handleMapClick} 
        className={` ${isBlurred ? 'blur-map' : ''}`}
      >
        <Marker
          position={currentPosition}
          draggable={true}
          onDragEnd={onMarkerDragEnd} // Update position when marker is dragged
        />
      <div className='map-action-btns'>
      <button 
  className='mapButton' 
  onClick={() => {
    setAddressInput('')
    setShowSearchAutoCompleteField(false)
    console.log("Current location button clicked"); // Check if this logs
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Position obtained:", position); // Check if position is received
          const { latitude, longitude } = position.coords;
          const newPosition = { lat: latitude, lng: longitude };
          map.panTo(newPosition);
          setTimeout(() => {
            setMarkerPosition(newPosition);
            setCurrentPosition(newPosition);
          }, 300);

          // Optional: Fetch the new address for the current position
          getPlaceDetails(latitude, longitude);
        },
        (error) => console.error("Error fetching current location:", error),
        { enableHighAccuracy: true }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  }}
>
  <TbCurrentLocation color='#9cd322' fontSize={20} className='me-2' />Current Location
</button>

      <button 
  className='mapButton' 
  onClick={() => {
    console.log("search location clicked");
    setShowSearchAutoCompleteField(true);
  }}
>
  <CiSearch color='#9cd322' fontSize={20} className='me-2' /> 
  Search Location
</button>
      </div>
      </GoogleMap>

      <div style={{ marginTop: '20px' }} className='d-flex justify-content-between align-items-center'>
  <div className='d-flex align-items-center' style={{ maxWidth: '70%' }}>
    <CiMapPin color='#9cd322' fontSize={24} className='me-2' />
    <p className='mb-0 text-truncate' style={{ flexGrow: 1 }}>{address}</p>
  </div>
  <button className='mapButton' style={{ whiteSpace: 'nowrap' }} onClick={()=>{
    setIsBlurred(true)
    setShowSearchAutoCompleteField(false)
setShowAddressDetialForm(true)
  }}>Change</button>






</div>

{
  showSearchAutoCompleteField && <div className='map-search-container'>
  <PlacesAutocomplete
                          value={addressInput}
                          onChange={(value) => setAddressInput(value)}
                          onSelect={handleSelect}
                          componentRestrictions={{ country: 'IN' }} 
                          bounds={ {
                              north: 26.2152,
                              south: 26.0869,
                              east: 91.6331,
                              west: 91.5702,
                            }}
                      >
                          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                              <div style={{width: "100%", position: "relative"}} >
                                <CiSearch color='#9cd322' fontSize={18}  className='me-2' style={{position: "absolute", top: "10px", left: "10px"}} /> 
                                  <input
                                      {...getInputProps({
                                          placeholder: 'Enter your address',
                                         
                                      })}
                                      id="address"
                                      name="address"
                                  />
                                  {addressInput && (
        <button className="close-icon" onClick={()=>{setAddressInput('')}} aria-label="Clear search">
          <IoIosClose size={20} />
        </button>
      )}
                                  <div className="autocomplete-dropdown-container">
                                      {loading && <div>Loading...</div>}
                                      {suggestions.map(suggestion => (
                                          <div key={suggestion.id}
                                              {...getSuggestionItemProps(suggestion, {
                                                  style: {
                                                      width:'100%',
                                                      backgroundColor: suggestion.active ? '#a0a0a0' : '#fff',
                                                      cursor: 'pointer'
                                                  },
                                              })}
                                          >
                                              {suggestion.description}
                                          </div>
                                      ))}
                                  </div>
                              </div>
                          )}
                      </PlacesAutocomplete>
  </div>
}
{showAddressDetailForm && <div className='billing-details-container top-10'>
  <BillingDetailsForm/>
</div> }

    </div>
  ) : (
   <Loader/>
  );
}

export default MapAddress;
