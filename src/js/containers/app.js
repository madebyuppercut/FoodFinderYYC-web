'use strict';

// libs
import React from 'react';

// components
import Navbar from '../components/navbar';

const application = {
  title: 'Food Finder YYC'
}

export default class App extends React.Component {
  render() {
    let title = application.title;

    return (
      <div className="app">
        <Navbar title={title} />
        { this.props.children }
      </div>
    );
  }
};
