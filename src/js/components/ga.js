'use strict';

import { Component } from 'react';
import ReactGA from 'react-ga';

ReactGA.initialize(GOOGLE.GA, {debug: process.env !== 'production'});

export default class GA extends Component {
  render() {

    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);

    return null;
  };
};
