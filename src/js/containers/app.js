'use strict';

import '../../scss/app.scss';

import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Cookies from 'universal-cookie';

import Navbar from '../components/navbar';
import Intro from '../scenes/intro';
import About from '../scenes/about';
import Search from '../scenes/search';
import NotFound from '../scenes/notfound';

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
    const cookies = new Cookies();

    let title = this.props.title;
    let tagline = this.props.tagline;

    let hideNav = this.state.hideNav;
    let hasCookie = cookies.get('skipIntro');

    let Redirect;

    if (hasCookie) {
      Redirect = Search;
    } else {
      Redirect = Intro;
      cookies.set('skipIntro', true);
    }

    return (
      <Router>
        <div className="app">
          <Navbar title={title} tagline={tagline} hideNav={hideNav} />
          <Switch>
            <Route exact path="/" component={Redirect} />
            <Route path="/about" component={About} />
            <Route path="/intro" component={Intro} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
};
