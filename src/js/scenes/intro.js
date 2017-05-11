'use strict';

import '../../scss/intro.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Logo from '../../img/logo2.png';

export default class Intro extends React.Component {
  render() {
    return (
      <div className="w-m show intro">
        <div className="m">
          <div className="g-r center">
            <div className="g-c-s-12-12 g-c-m-9-12 g-c-l-6-12 t-center">
              <img src={Logo} />
            </div>
          </div>
          <div className="g-r center">
            <div className="g-c-12-12 t-center">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                <Link to="/about" className="b">Get Started <i className="fa fa-chevron-right"></i></Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
