'use strict';

import '../../scss/navbar.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Logo from '../../img/logo.png';
import LogoSmall from '../../img/logo-s.png';

export default class Navbar extends React.Component {
  static get propTypes() {
    return {
      title: PropTypes.string.isRequired,
      tagline: PropTypes.string.isRequired,
      hideNav: PropTypes.bool.isRequired
    };
  }

  render() {
    let copyrightYear = (new Date()).getFullYear();

    let title = this.props.title;
    let tagline = this.props.tagline;
    let hideClass = (this.props.hideNav ? 'hidden' : '') + 'p-a-1 g-r';

    return (
      <nav role="navigation" className={hideClass}>
        <div className="title g-c-s-1-8 g-c-m-4-12 g-c-l-2-12">
          <img src={Logo} alt="Food Finder YYC" className="logo v-m"/>
          <img src={LogoSmall} alt="Food Finder YYC" className="logo v-s-only"/>
        </div>
        <div className="search h-s-only p-lr-1">
          <i className="fa fa-search"></i>
          <input type="text" placeholder="Search" />
        </div>
        <div className="menu p-lr-1">
          <input type="checkbox" id="menu-toggle" value="" />
          <label htmlFor="menu-toggle"><i className="fa fa-bars"></i></label>
          <div className="menu-side">
            <label htmlFor="menu-toggle"><i className="fa fa-close"></i></label>
            <ul>
              <li><NavLink to="/about">about us</NavLink></li>
              <li><a href="#">privacy</a></li>
            </ul>
            &copy; {copyrightYear} {title}
          </div>
        </div>
      </nav>
    );
  }
}
