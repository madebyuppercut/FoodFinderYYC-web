'use strict';

import '../../scss/intro.scss';

import LogoImg from '../../img/logo2.png';

import React from 'react';
import PropTypes from 'prop-types';

export default class Intro extends React.Component {
  render() {
    return (
      <div className="m-container show intro">
        <div className="modal">
          <div className="g-r center">
            <div className="g-c-6-12 t-center">
              <img src={LogoImg} />
            </div>
          </div>
          <div className="g-r center">
            <div className="g-c-12-12 t-center">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                <a className="button">Get Started <i className="fa fa-chevron-right"></i></a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
