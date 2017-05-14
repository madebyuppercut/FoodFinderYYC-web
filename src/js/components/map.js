'use strict';

// libs
import React from 'react';
import PropTypes from 'prop-types';

// assets
//import '../../scss/navbar.scss';

const config = {
  GOOGE_MAP: GOOGLE.MAP
};

export default class Map extends React.Component {
  static get propTypes() {
    return {
      locations: PropTypes.arrayOf(PropTypes.shape({
        day: PropTypes.object.isRequired,
        now: PropTypes.object.isRequired,
        object: PropTypes.object.isRequired
      }))
    };
  }

  render() {
    let locations = JSON.stringify(this.props.locations);

    return (
      <section className="map">
        {locations}
      </section>
    );
  }
};
