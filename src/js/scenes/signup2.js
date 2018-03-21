'use strict';

// libs
import React from 'react';

// assets
import '../../scss/intro.scss';
import Logo from '../../img/logo2.svg';

// components
import SubscribeForm from '../components/subscribeform';

const SignUp = (props) => (
  <div className="w-m show intro">
    <div className="m">
      <div className="g-r center">
        <div className="g-c-s-12-12 g-c-m-6-12 g-c-l-9-12 t-center">
          <img className="full" src={Logo} />
        </div>
      </div>
      <div className="g-r center">
        <div className="g-c-s-12-12 g-c-m-6-12 g-c-l-9-12 t-center">
          <p style={{fontSize: '1.125rem', lineHeight: 1.4}}>
            Welcome! This service will be live on July 1st. To get a reminder, please leave your email address.
          </p>
          <SubscribeForm/>
        </div>
      </div>
    </div>
  </div>
);

export default SignUp;
