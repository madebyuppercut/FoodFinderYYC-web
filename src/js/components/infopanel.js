'use strict';

import { Component } from 'react';

export default class InfoPanel extends Component {
  render() {
    let location = this.props.location.object;

    return (
      <div className="info-panel">{location.object.objectId}</div>
    );
  };
};
