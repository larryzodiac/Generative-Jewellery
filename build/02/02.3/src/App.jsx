// ------------------------------------------------- //
// Evan MacHale - N00150552
// 15.02.19
// ------------------------------------------------- //

import React, { Component } from 'react';
// Material Design Components

// ------------------------------------------------- //

// My Components
import AppBar from './components/AppBar';

// ------------------------------------------------- //

import './App.scss';

// ------------------------------------------------- //

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <AppBar />
      </React.Fragment>
    );
  }
}

// ------------------------------------------------- //
