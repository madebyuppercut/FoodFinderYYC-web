'use strict';

import React, { Component } from 'react';

import '../../scss/infopanel.scss';

export default class InfoPanel extends Component {
  constructor() {
    super();
  }

  render() {
    let location = this.props.location;
    let info = location.object;
    let className = location && location.object ? 'info-panel active' : 'info-panel';

    console.log(info);

    return (
      <div className={className}>
        <i className="fa fa-close" onClick={this.props.onDismiss}></i>
        <h1>{info.name}</h1>
        <address>
          {info.address}<br/>
          {info.city}, {info.province}
        </address>

      </div>
    );
  };
};
