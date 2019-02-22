// ------------------------------------------------- //
// Evan MacHale - N00150552
// 16.02.19
// Playground page
// Drawer + AppBar
// ------------------------------------------------- //

import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// Material Design Components
import Drawer, {
  DrawerAppContent,
  DrawerContent,
} from '@material/react-drawer';
import { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
// import List, {
//   ListGroup,
//   ListDivider,
// } from '@material/react-list';

// ------------------------------------------------- //

// My Components
import AppBar from '../AppBar';

// ------------------------------------------------- //

class Playground extends Component {
  constructor(props) {
    super(props);
    this.state = { drawerOpen: true };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.setState(prevState => ({ drawerOpen: !prevState.drawerOpen }));
  }

  render() {
    const { drawerOpen } = this.state;

    return (
      <div className="drawer-container">
        {/* https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md */}
        <AppBar
          icon
          onClick={this.toggleDrawer}
        />

        <TopAppBarFixedAdjust className="top-app-bar-fix-adjust">
          <Drawer
            className="drawer-alternate"
            dismissible
            open={drawerOpen}
          >
            <DrawerContent>Hello</DrawerContent>
          </Drawer>

          <DrawerAppContent className="drawer-app-content"><p>Playground content</p></DrawerAppContent>
        </TopAppBarFixedAdjust>
      </div>
    );
  }
}

// <div className="drawer-container">
//   <Drawer
//     dismissible
//     open={drawerOpen}
//   >
//     <DrawerHeader>
//       <DrawerTitle tag="h2">Menu</DrawerTitle>
//     </DrawerHeader>
//     <DrawerContent />
//   </Drawer>
//
//   <DrawerAppContent className="drawer-app-content">
//     {/* https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md */}
//     <AppBar
//       icon
//       onClick={this.toggleDrawer}
//     />
//     <TopAppBarFixedAdjust><p>Playground content</p></TopAppBarFixedAdjust>
//   </DrawerAppContent>
//
// </div>

// ------------------------------------------------- //

export default Playground;

// ------------------------------------------------- //
