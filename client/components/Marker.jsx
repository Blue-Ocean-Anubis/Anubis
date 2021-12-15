import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faMapPin, faTimes} from '@fortawesome/free-solid-svg-icons';

const Marker = (props) => {

  const [mouseOn, setMouseOver] = useState(false);

  let handleMouseEnter = (event) => {
    event.stopPropagation();
    setMouseOver(true);
  }

  let handleMouseLeave = (event) => {
    event.stopPropagation();
    setMouseOver(false);
  }

  useEffect(() => {
    // console.log('marker props: ', props)
  })

  // console.log('props of each: ', props)
  return (
    <div className="marker">
      <FontAwesomeIcon icon={faMapPin} size='2x' color={props.name ? "DarkOrange" : "grey"} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleMouseEnter} className="pin"/>
      {/* <img src={'https://maps.gstatic.com/mapfiles/place_api/icons/airport-71.png'}/> */}
      {mouseOn ? <div className="marker-info" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <FontAwesomeIcon icon={faTimes} size='sm' className="exit-marker-info" onClick={handleMouseLeave}/>
        <span className='marker-airport-code'>{props.code}</span>
        <span className="marker-name">
          {props.name}
        </span>
        <span className="marker-address">
          {props.address}
        </span>
        {/* <span>{props.details ? props.details.international_phone_number : ''}</span>
        <a href={props.details ? props.details.website : ''} >website</a> */}
      </div> : ''}
      {/* <img src={props.businessInfo}/> */}
    </div>
  )
};

export default Marker;