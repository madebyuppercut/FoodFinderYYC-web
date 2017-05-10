'use strict';

import '../../scss/app.scss';

import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Navbar from '../components/navbar';
import Intro from '../scenes/intro';
import About from '../scenes/about';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideNav: false
    };
  }

  static get propTypes() {
    return {
      title: PropTypes.string.isRequired,
      tagline: PropTypes.string.isRequired
    };
  }

  render() {
    let title = this.props.title;
    let tagline = this.props.tagline;

    let hideNav = this.state.hideNav;

    return (
      <Router>
        <div className="app">
          <Navbar title={title} tagline={tagline} hideNav={hideNav} />
          <Route exact path="/" component={Intro} />
          <Route path="/about" component={About}/>
        </div>
      </Router>
    );
  }
};
