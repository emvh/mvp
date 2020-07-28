import React, { Component } from 'react';
import { API_KEY } from '../../../database/keys.js';
import { withScriptjs, withGoogleMap, Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyle = {
  width: '100%',
  height: '100%',
  justifyContent: 'center',
};

const containerStyle = {
  position: 'absolute',
  width: '400px',
  height: '400px',
};

const MapContainer = ((props) => {
  const { events } = props;
  console.log('map props', events)
  // const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div>
    <Map
      google={props.google}
      zoom={14}
      style={mapStyle}
      containerStyle={containerStyle}
      initialCenter={{ lat: 40.785091, lng: -73.968285 }}
    >
    {events.map((event) =>
      <Marker
        key={event.id}
        name={event.name}
        position={{lat: event.latitude, lng: event.longitude}}
        // onClick={() => {setSelectedEvent(event)}}
      />
    )}

    {(
      <InfoWindow
        // onCloseClick = {() => {
        //   setSelectedEvent(null);
        // }}
        // position={{
        //   lat: selectedEvent.latitude,
        //   lng: selectedEvent.longitude
        // }}
        >
        </InfoWindow>
      )}
    </Map>
    </div>
    );
  })

export default GoogleApiWrapper({
  apiKey: API_KEY
})(MapContainer);
