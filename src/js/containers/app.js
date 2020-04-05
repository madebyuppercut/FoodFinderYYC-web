'use strict';

// libs
import React from 'react';

// HOC
import { withRouter } from 'react-router-dom'

// components
import Navbar from '../components/navbar';
import Banner from '../components/banner'

import { SEARCH_PATH } from '../route_path'

const application = {
  title: 'Food Finder YYC'
}

class App extends React.Component {
  render() {
    const title = application.title;
    return (
      <div className="app">
        {this.shouldRenderBanner () && <Banner />}
        <Navbar title={title} />
        { this.props.children }
      </div>
    );
  }
  shouldRenderBanner() {
    const { location } = this.props
    const { pathname } = location
    return pathname === SEARCH_PATH
  }
};

export default withRouter(App)
