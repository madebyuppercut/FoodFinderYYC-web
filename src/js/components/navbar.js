'use strict';

// libs
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

// assets
import '../../scss/navbar.scss';
import Logo from '../../img/logo.png';
import LogoSmall from '../../img/logo-s.png';

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
          <div className="title g-c-s-2-8 g-c-m-4-12 g-c-l-2-12">
            <NavLink to="/"><img src={Logo} alt="Food Finder YYC" className="logo v-m"/></NavLink>
            <NavLink to="/"><img src={LogoSmall} alt="Food Finder YYC" className="logo v-s-only"/></NavLink>
          </div>
          <div className="menu-search g-c-s-6-8 g-c-m-8-12 g-c-l-10-12">
            <div className="search p-lr-1">
              <i className="fa fa-search m-r-1"></i>
              <input type="text" placeholder="Search" />
            </div>
            <div className="menu p-lr-1">
              <input type="checkbox" id="menu-toggle" value="" />
              <label htmlFor="menu-toggle"><i className="fa fa-bars"></i></label>
              <div className="menu-side">
                <label htmlFor="menu-toggle"><i className="fa fa-close"></i></label>
                <ul>
                  <li><NavLink to="/about">about us</NavLink></li>
                  <li><NavLink to="/privacy">privacy</NavLink></li>
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
