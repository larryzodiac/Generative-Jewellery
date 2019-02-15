// ------------------------------------------------- //
// Evan MacHale - N00150552
// 15.02.19
// ------------------------------------------------- //

import React, { Component } from 'react';
// Material Design Components
import TopAppBar, { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';

// ------------------------------------------------- //

export default class AppBar extends Component {
  render() {
    return (
      <React.Fragment>
        <TopAppBar
          title="Generative Jewellery"
          navigationIcon={<MaterialIcon icon="menu" onClick={this.toggleDrawer} />}
        />
        <TopAppBarFixedAdjust><p>cool content</p></TopAppBarFixedAdjust>
      </React.Fragment>
    );
  }
}

// ------------------------------------------------- //
