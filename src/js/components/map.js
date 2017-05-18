'use strict';

// libs
import React from 'react';
import PropTypes from 'prop-types';
import {fitBounds} from 'google-map-react/utils';
import { withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer';

// assets
import '../../scss/map.scss';
import PinCluster from '../../img/cluster.svg';
import PinOn from '../../img/pin-on.svg';
import PinOff from '../../img/pin-off.svg';

// components
import InfoPanel from './infopanel';
import Modal from './modal';

const config = {
  GOOGLE_MAP: GOOGLE.MAP,
  ZOOM: parseInt(GOOGLE.ZOOM),
  CENTER: {lat: 51.0486, lng: -114.0708}
};

console.log(PinOn);

const clusterSytles = [
  {
    anchorText: [-3, 0],
    height: 60,
    width: 46,
    url: PinCluster
  }, {
    anchorText: [-3, 0],
    height: 60,
    width: 46,
    url: PinCluster
  }, {
    anchorText: [-3, 0],
    height: 60,
    width: 46,
    url: PinCluster
  }, {
    anchorText: [-3, 0],
    height: 60,
    width: 46,
    url: PinCluster
  }, {
    anchorText: [-3, 0],
    height: 60,
    width: 46,
    url: PinCluster
  }
];

const noop = () => {};
const markerStyle = {
  url: PinOff,
  origin: {x: 0, y: 0},
  anchor: {x: 15, y: 40}
};
const mapOptions = {
  mapTypeControl: false,
  streetViewControl: false
}

const AsyncGoogleMap = withScriptjs(
  withGoogleMap(
    props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={props.defaultZoom}
        defaultCenter={props.defaultCenter}
        center={props.center}
        zoom={props.zoom}
        onClick={props.onMapClick}
        onCenterChanged={props.onCenterChanged}
        options={props.mapOptions}
      >
        <MarkerClusterer
          averageCenter
          enableRetinaIcons
          gridSize={60}
          styles={clusterSytles}
        >
          {props.markers.map(marker => {
            const onClick = () => props.onMarkerClick(marker);
            return (
              <Marker
                {...marker}
                key={marker.id}
                onClick={onClick}
              />
            )
          })}
        </MarkerClusterer>

      </GoogleMap>
    )
  )
);

AsyncGoogleMap.defaultProps = {
  center: config.CENTER,
  defaultCenter: config.CENTER,
  defaultZoom: config.ZOOM,
  mapOptions: mapOptions,
  markers: [],
  zoom: config.ZOOM,
  onCenterChanged: noop,
  onClick: noop,
  onMapLoad: noop,
  onMapClick: noop,
  onMarkerClick: noop
};

const getCorners = (locations) => {
  let minLat = null;
  let minLng = null;
  let maxLat = null;
  let maxLng = null;

  locations.forEach((location) => {
    let geo = location.object.geolocation;

    try {
      if (minLat === null || geo.latitude < minLat) { minLat = geo.latitude; }
      if (maxLat === null || geo.latitude > maxLat) { maxLat = geo.latitude; }
      if (minLng === null || geo.longitude < minLng) { minLng = geo.longitude; }
      if (maxLng === null || geo.longitude > maxLng) { maxLng = geo.longitude; }
    } catch(e) {
      if (process.env !== 'production') { console.log('Location missing geolocation: ', location); }
    }
  });

  return {ne: {lat: maxLat, lng: maxLng}, sw: {lat: minLat, lng: minLng}};
};

export default class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedLocation: null,
      center: null,
      message: {code: 0, text: null}
    };
  }

  static get propTypes() {
    return {
      locations: PropTypes.arrayOf(PropTypes.shape({
        day: PropTypes.object.isRequired,
        now: PropTypes.object.isRequired,
        object: PropTypes.object.isRequired
      }))
    };
  }

  /**
   * A callback to dynamically calculate the container height to fill the screen
   * @param map
   */
  onMapLoad(map) {
    const mapDOM = map.getDiv();

    mapDOM.style.height = (document.documentElement.clientHeight - mapDOM.getBoundingClientRect().top) + 'px';
    window._ffyycMap = {map: map, control: null};
  }

  onMarkerClick(marker) {
    let selectedLocation = this.props.locations.filter(location => {
      return location.object.objectId === marker.id;
    });

    if (selectedLocation.length > 0) {
      selectedLocation = selectedLocation[0];
      this.setState({
        selectedLocation: selectedLocation,
        center: {lat: selectedLocation.object.geolocation.latitude, lng: selectedLocation.object.geolocation.longitude}
      });
    }
  }

  showMessage(code, text) {
    this.setState({message: {code: code, text: text}});
  }

  clearMessage() {
    this.setState({message: {code: 0, text: null}});
  }

  dismissMessage(e) {
    this.clearMessage();
  }

  onLocationClick() {
    let context = this;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          context.setState({center: {lat: position.coords.latitude, lng: position.coords.longitude}});
        }, function(err) {
          context.showMessage(1, 'You have declined permission to use location. You must reset this in your browser.');
        }
      );
    } else {
      context.showMessage(1, 'Your browser does not support location sensor.');
    }
  }

  onCloseInfo() {
    this.setState({selectedLocation: null});
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.locations.length > 0 && nextProps.locations.length === 0 && this.state.message.code === 0) {
      // only show message when found locations count changed to 0
      this.showMessage(2, 'No locations found, broaden your search settings or select a different day.');
    } else if (nextProps.locations.length > 0 && this.state.message.code === 2) {
      // only clear message if it's for search
      this.clearMessage();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (window._ffyycMap && !window._ffyycMap.control) {
      // Code below to to add a custom control for getting current location
      // Only way to obtain the Google Maps instance after it's initialized via react-google-maps component
      const mapInstance = window._ffyycMap.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

      // Create a div to hold the control.
      const controlDiv = document.createElement('div');
      const controlUI = document.createElement('div');
      const controlText = document.createElement('div');

      // Set CSS for the control border
      controlUI.className = 'map-control';
      controlUI.title = 'Click to use location';
      controlDiv.appendChild(controlUI);

      // Set CSS for the control interior
      controlText.innerHTML = '<i class="fa fa-location-arrow"></i>';
      controlUI.appendChild(controlText);

      controlDiv.addEventListener('click', this.onLocationClick.bind(this));

      mapInstance.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);

      window._ffyycMap.control = controlDiv;
    }
  }

  render() {
    let locations = this.props.locations;
    let selectedLocation = this.state.selectedLocation;
    let message = this.state.message.text;
    let center = this.state.center;
    let zoom = config.ZOOM;
    let markers = [];
    let infoWindow = null;
    let messageWindow = null;

    locations.forEach((location) => {
      let obj = location.object;

      try {
        let thisMarkerStyle = Object.assign({}, markerStyle);
        let marker;

        thisMarkerStyle.url = selectedLocation && selectedLocation.object.objectId === obj.objectId ? PinOn : PinOff;
        marker = {
          position: {lat: obj.geolocation.latitude, lng: obj.geolocation.longitude},
          icon: thisMarkerStyle,
          id: obj.objectId
        };

        markers.push(marker);
      } catch (e) {
        if (process.env !== 'production') { console.log('Location missing geolocation: ', location); }
      }
    });

    if (locations.length > 1) {
      let fb = fitBounds(getCorners(locations), {width: document.documentElement.clientWidth, height: document.documentElement.clientHeight});
      center = this.state.center ? this.state.center : fb.center;
      zoom = fb.zoom;
    } else if (locations.length === 1) {
      if (locations[0].object.geolocation) {
        center = {lat: locations[0].object.geolocation.latitude, lng: locations[0].object.geolocation.longitude};
      }
    } else {
      center = config.CENTER;
    }

    if (selectedLocation) {
      infoWindow = <InfoPanel location={selectedLocation} onDismiss={this.onCloseInfo.bind(this)} />;
      center = this.state.center;
    }

    if (message) {
      messageWindow = <Modal onClose={this.dismissMessage.bind(this)} message={message}/>;
    }

    return (
      <section className="map-container">
        <AsyncGoogleMap
          googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&key=" + config.GOOGLE_MAP}
          loadingElement={<div/>}
          containerElement={<div/>}
          mapElement={<div className="map" />}
          center={center}
          zoom={zoom}
          markers={markers}
          onClick={this.onClick}
          onMapLoad={this.onMapLoad}
          onMapClick={noop}
          onMarkerClick={this.onMarkerClick.bind(this)}
        />
        {infoWindow}
        {messageWindow}
      </section>
    );
  }
};
