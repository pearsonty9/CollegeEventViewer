import React, {useState} from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = (props) => {
  
  const mapStyles = {        
    height: "40vh",
    width: "100%"};
  
  const defaultCenter = {
    lat: 28.6024, lng: -81.2001
  }

  const [position, setPosition] = useState(defaultCenter);

  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setPosition({ lat, lng });
  };

  const onClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const placeId = e.placeId;
    setPosition({ lat: lat, lng: lng });
    if (!props.disabled)
      props.handleMapClick(lat, lng, placeId);
  }
  
  return (
     <LoadScript
       googleMapsApiKey='AIzaSyAAagmGN6LwV2Tvftcuh_ONDGIX6NYpbPM'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={15}
          center={props.disabled ? props.position : position}
          onClick={onClick}
        >
            <Marker
            position={props.disabled ? props.position : position}
            onDragEnd={(e) => onMarkerDragEnd(e)}
            draggable={!props.disabled}
             />
        </GoogleMap>
     </LoadScript>
  )
}

export default MapContainer;