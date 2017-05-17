'use strict';

// libs
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// assets
import '../../scss/intro.scss';
import Logo from '../../img/logo2.png';

// components
import SubscribeForm from '../components/subscribeform';

export default class SignUp extends React.Component {
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
            <div className="g-c-s-4-5 g-c-m-9-12 g-c-l-6-12 t-center">
              <p>
                Welcome! This service will be live on July 1st. To get a reminder, please leave your email address.
              </p>
              <SubscribeForm/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
