import React from 'react';
import ReactDOM from 'react-dom';
import '../css/hello.css';

class Hello extends React.Component {
  render() {
    return <h1>Hello</h1>
  }
}

ReactDOM.render(<Hello/>, document.getElementById('app'));
