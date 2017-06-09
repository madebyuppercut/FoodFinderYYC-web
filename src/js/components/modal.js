// libraries
import React from 'react';

import '../../scss/modal.scss';

const Modal = (props) => (
  <div className="w-m show">
    <div className="m small relative" data-style={props.style}>
      <i className="fa fa-close" onClick={props.onClose}></i>
      <div className="relative">
        <p>{props.message}</p>
        <p className="t-center">
          <a className="b" onClick={props.onClose}>Okay</a>
        </p>
      </div>
    </div>
  </div>
);

export default Modal;
