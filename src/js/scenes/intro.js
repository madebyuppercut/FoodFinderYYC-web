'use strict';

// libs
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// assets
import '../../scss/intro.scss';
import Logo from '../../img/logo2.svg';

export default class Intro extends React.Component {
  render() {
    return (
      <div className="w-m show intro">
        <div className="m">
          <div className="g-r center">
            <div className="g-c-s-12-12 g-c-m-6-12 g-c-l-9-12 t-center">
              <img className="full" src={Logo} />
            </div>
          </div>
          <div className="g-r center">
            <div className="g-c-12-12 t-center">
              <p style={{fontSize: '1.125rem', lineHeight: 1.4}}>
                Summer break is supposed to be full of fun, not hunger. Food Finder YYC makes it easy for kids and teens to locate and access food resources.
              </p>
              <p>
                <Link to="/search" className="b">Get Started <i className="fa fa-chevron-right"></i></Link>
              </p>
              <p>
                By proceeding you are agreeing to our <Link to="/terms">Terms of Service</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
