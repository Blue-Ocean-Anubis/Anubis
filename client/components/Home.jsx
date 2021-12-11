import React, { useState, useEffect } from 'react';
import Geocode from 'react-geocode';
import { GOOGLE_API_KEY, TEST_USER_ADDRESS } from '../../config.js';
Geocode.setApiKey(GOOGLE_API_KEY);
Geocode.setLocationType('ROOFTOP');
import GoogleMap from './GoogleMap.jsx';
import List from './List.jsx';
import AirportDetails from './AirportDetails.jsx';
import PointsOfInterest from './PointsOfInterest.jsx';
import axios from 'axios';

const Home = () => {
  const [state, setState] = useState({
    searchedLocationCity: '',
    searchedLocation: {},
    userLocation: {},
    userAddressLocation: {},
    userAddress: TEST_USER_ADDRESS, // placeholder - will have to insert user address here
    searchBoxText: 'Search a City!',
    restaurantData: [],
    rentalData: []
  });
  const [airportData, setAirportData] = useState([]);
  const [points, setPoints] = useState([]);

  // ON MAP CLICK, ADD COORDS AND CITY/COUNTRY TO SEARCHED LOCATION STATE
  const onLocationChange = (lat, lng) => {
    Geocode.fromLatLng(lat.toString(), lng.toString())
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          searchedLocationCity: (response.plus_code.compound_code).substring(9),
          searchedLocation: { lat: lat, lng: lng },
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // MAKE YOUR SERVER REQUESTS HERE, WILL EXECUTE WHEN NEW LOCATION IS CLICKED
  useEffect(() => {
    console.log('new place clicked', state.searchedLocation, state.searchedLocationCity);
      const coordinates = {lat: state.searchedLocation.lat,lng: state.searchedLocation.lng};
      axios.get('/restaurants', {params: coordinates})
        .then((restaurants) => {
          setState((prevState) => ({
          ...prevState,
          restaurantData: restaurants.data
          }))
        })
        .catch((err) => {console.log('AxiosError: ', err)})
      axios.get('/rentals', {params: coordinates})
        .then((rentals) => {
          setState((prevState) => ({
          ...prevState,
          rentalData: rentals.data
          }))
        })
        .catch((err) => {console.log('AxiosError: ', err)})
  }, [state.searchedLocation, state.searchedLocationCity]);

  // Makes server request for nearest airport when searched location changes
  useEffect(() => {
    console.log('new place clicked', state.searchedLocation)
    const airportParams = {lat: state.searchedLocation.lat,long: state.searchedLocation.lng};
    axios.get('/latLongNearestAirport', {params: airportParams})
      .then((airports) => {setAirportData(airports.data);})
      .catch((err) => {console.log(error)})
    axios.get('/POI', {params: airportParams})
      .then((points) => {setPoints(points.data);})
      .catch((err) => {console.log(error)})
  }, [state.searchedLocation])

  // GET USER LOCATION DATA
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prevState) => ({
            ...prevState,
            userLocation: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          }));
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      (err) => console.log(err);
    }
  };

  // TURN USER ADDRESS IN TO COORDINATES
  const convertAddressToCoords = (address) => {
    Geocode.fromAddress(address)
      .then((response) => {
        setState((prevState) => ({ ...prevState, userAddressLocation: response.results[0].geometry.location }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ON COMPONENT MOUNT, FIND USERLOCATION AND COORDS FOR THEIR ADDRESS
  useEffect(() => {
    getUserLocation();
    convertAddressToCoords(state.userAddress);
  }, []);

  return (
    <div>
      {/* <SearchBox placeholder={state.searchBoxText} onPlacesChanged={onPlacesChanged}/> */}
      <GoogleMap
        searchedLocation={state.searchedLocation}
        userLocation={state.userLocation}
        userAddressLocation={state.userAddressLocation}
        onLocationChange={onLocationChange}
      />
      <AirportDetails airports={airportData} />
      <PointsOfInterest points={points} />
    </div>
  );
};

export default Home;

