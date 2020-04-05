'use strict';

// libs
import React from 'react';

// assets
import '../../scss/about.scss';

// components

export default class Intro extends React.Component {
  render() {
    const bb4ck_help_url = "https://bb4ck.org/help/"
    return (
      <div className="about">
        <div className="g-r">
          <div className="g-c-s-12-12 g-c-m-8-12 p-tb-2 p-lr-4">
            <h1>Help</h1>
            <p className="tag">
              For HELP, email BB4CK at <a href="mailto:hello@bb4ck.org?Subject=Help" target="_top">hello@bb4ck.org </a> or call us at <a href="tel:(403) 264 7979">(403) 264 7979 </a> (please leave us a message and we will return your call as soon as possible). You can also check out our website at <a href={bb4ck_help_url} target="_blank">bb4ck.org/help</a>.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
