'use strict';

// libs
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

// assets
import '../../scss/navbar.scss';
import Logo from '../../img/logo.png';
import LogoSmall from '../../img/logo-s.png';
import BB4CKLogo from '../../img/bb4ck-logo.png'

export default class Navbar extends React.Component {
  static get propTypes() {
    return {
      title: PropTypes.string.isRequired
    };
  }

  render() {
    let copyrightYear = (new Date()).getFullYear();

    let title = this.props.title;
    let hideClass = (this.props.hideNav ? 'hidden' : '') + 'p-a-1 g-r';

    return (
      <header>
        <nav role="navigation" className={hideClass}>
          <div className="title g-c-s-5-8 g-c-m-8-12 g-c-l-4-12">
            <a href="/" className="v-m"><img src={Logo} alt="Food Finder YYC" className="logo"/></a>
            <a href="/" className="v-s-only"><img src={LogoSmall} alt="Food Finder YYC" className="logo"/></a>
            <a href="https://bb4ck.org/">
              <img
                src={BB4CKLogo}
                alt="Brown Baggging For Calgary's Kids"
                className="logo"
              />
            </a>
          </div>
          <div className="menu-search g-c-s-3-8 g-c-m-4-12 g-c-l-8-12">
            <div className="search p-lr-1 hidden">
              <i className="fa fa-search m-r-1"></i>
              <input type="text" placeholder="Search" />
            </div>
            <div className="menu p-lr-1">
              <input type="checkbox" id="menu-toggle" value="" />
              <label htmlFor="menu-toggle"><i className="fa fa-bars"></i></label>
              <div className="menu-side">
                <label htmlFor="menu-toggle"><i className="fa fa-close"></i></label>
                <ul>
                  <li>
                    <a className="v-s-only" href="sms:5873180232;?&body=FOOD">Text "Food" to<br/>587-318-0232</a>
                    <a className="h-s-only" href="#">Text "Food" to<br/>587-318-0232</a>
                  </li>
                  <li><NavLink to="/about">about us</NavLink></li>
                  <li><NavLink to="/privacy">privacy policy</NavLink></li>
                  <li><NavLink to="/terms">terms of use</NavLink></li>
                </ul>
                &copy; {copyrightYear} {title}
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
};
