// ------------------------------------------------- //
// Evan MacHale - N00150552
// 16.02.19
// Account page
// ------------------------------------------------- //

import React, { Component } from 'react';
// Material Design Components
import { TopAppBarFixedAdjust } from '@material/react-top-app-bar';

// ------------------------------------------------- //

// My Components
import AppBar from '../AppBar';

// ------------------------------------------------- //

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <AppBar />
        <TopAppBarFixedAdjust><p>Account content</p></TopAppBarFixedAdjust>
      </React.Fragment>
    );
  }
}

// ------------------------------------------------- //

export default Account;

// ------------------------------------------------- //
