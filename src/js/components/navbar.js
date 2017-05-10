'use strict';

import '../../scss/navbar.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
    let hideClass = this.props.hideNav ? 'hidden' : '';

    return (
      <nav role="navigation" className={hideClass}>
        <div className="top">
          <div className="title">
            <h1>{title}</h1>
            <p className="tagline">{tagline}</p>
          </div>
          <div className="search h-s-only">
            <i className="fa fa-search"></i>
            <input type="text" placeholder="Search" />
          </div>
          <div className="menu">
            <input type="checkbox" id="menu-toggle" value="" />
            <label htmlFor="menu-toggle"><i className="fa fa-bars"></i></label>
            <div className="menu-side">
              <label htmlFor="menu-toggle"><i className="fa fa-close"></i></label>
              <ul>
                <li><Link to="/about">about us</Link></li>
                <li><a href="#">privacy</a></li>
              </ul>
              &copy; {copyrightYear} {title}
            </div>
          </div>
        </div>
        <div className="bottom">
          <dl>
            <dd>Day</dd>
            <dd>Meals</dd>
            <dd>Referrals</dd>
          </dl>
        </div>
      </nav>
    );
  }
}
