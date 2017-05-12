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
            <h1>Together, Caring for Kids over the Summer</h1>
            <p>
              We're a community of Practice working to innovatively address food insecurity over the summer months.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
