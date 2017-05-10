'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/app';

const application = {
  title: 'Food Finder YYC',
  tagline: 'Helping kids find free food resources'
}

ReactDOM.render(
  <App title={application.title} tagline={application.tagline} />,
  document.getElementById('app')
)
