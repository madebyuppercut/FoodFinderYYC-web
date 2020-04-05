'use strict';

// libs
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// assets
import '../../scss/intro.scss';
import Logo from '../../img/logo2.svg';
import { SEARCH_PATH, TERMS_PATH } from '../route_path';

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
              <p style={{fontSize: '1.125rem', lineHeight: 1.4, marginBottom: 0}}>
                Text or Search
              </p>
              <div className="g-r center">
                <div className="g-c-s-12-12 g-c-m-5-12 m-t-1 t-center">
                  <a className="b v-s-only sms" href="sms:5873180232;?&body=FOOD">Text "Food" to<br/>587-318-0232</a>
                  <a className="b h-s-only sms" href="#">Text "Food" to<br/>587-318-0232</a>
                </div>
                <div className="g-c-s-12-12 g-c-m-2-12 t-center">
                </div>
                <div className="g-c-s-12-12 g-c-m-5-12 m-t-1 t-center">
                  <Link to={SEARCH_PATH} className="b red v-s-and-up">Search <i className="fa fa-chevron-right"></i></Link>
                </div>
              </div>
              <p>
                By proceeding you are agreeing to our <Link to={TERMS_PATH}>Terms of Use</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
