import React, {useState} from 'react';
import GoogleMapReact from 'google-map-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import SearchBox from './SearchBox.jsx';
// require('dotenv').config();
// import AutoCompleteComponent from './AutoCompleteComponent.jsx';
import { GOOGLE_API_KEY } from '../../config.js';
// import PlacesAutocomplete from './PlacesAutocomplete.jsx';
// import AnotherAutoComplete from './AnotherAutoComplete.jsx';
import AnotherOne from './AnotherOne.jsx';

const Marker = () => <div><FontAwesomeIcon icon={faMapMarkerAlt} size="2x"/></div>;

const GoogleMap = (props) => {

  const mapClick = (event) => {
    // console.log(event);
    props.onLocationChange(event.lat, event.lng)
  }

    return (

      // Important! Always set the container height explicitly
      <div style={{ height: '80vh', width: '90%', margin: '10vh auto 10vh auto'}}>
        {/* <AnotherAutoComplete></AnotherAutoComplete> */}
        <AnotherOne></AnotherOne>
        {/* <AutoCompleteComponent
          apiKey={GOOGLE_API_KEY}

          //accepts API key but seems to need a Typescript interface for below options to work:
          // autocompletionRequest={{
          //   types: ['(cities)']
          // }}
        >
        </AutoCompleteComponent> */}
        <GoogleMapReact
          // bootstrapURLKeys={{ key: GOOGLE_API_KEY}}
          defaultCenter={{lat: 39, lng: -94}}
          defaultZoom={8}
          onClick={mapClick}
        >
          <Marker lat={props.location.lat} lng={props.location.lng} />
        </GoogleMapReact>

      </div>
    );

}
  
export default GoogleMap;