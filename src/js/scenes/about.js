'use strict';

// libs
import React from 'react';

// assets
import '../../scss/about.scss';

// components

export default class Intro extends React.Component {
  render() {
    return (
      <div className="about">
        <div className="g-r">
          <div className="g-c-s-12-12 g-c-m-8-12 p-tb-2 p-lr-4">
            <h1>Who we are</h1>
            <p className="tag strong">
              A group of Organizations dedicated to ensuring Calgary's kids and teens do not go hungry.
            </p>
            <p className="tag">
              <span className="strong">What we do:</span> Connect kids and teens to food resources.
            </p>
            <p className="tag">
              <span className="strong">How:</span> Food Finder YYC will tell you where you can find food resources. It will tell you what you need to bring to access the food at each location.
            </p>
            <p className="tag">
              <span className="strong">Where:</span> Our goal is to have food access points across the whole city, making it easier for kids (or parents) and teens to locate needed food resources.
            </p>
            <p className="tag">
              <span className="strong">Why:</span> Because you matter, because food and health matter. Because the struggle doesn't have to be real this summer.
            </p>
            <p className="tag">
              <span className="strong">Donate:</span>https://www.canadahelps.org/en/dn/m/36061/donation
            </p>
          </div>
        </div>
      </div>
    );
  }
}
