// ------------------------------------------------- //
// Evan MacHale - N00150552
// 06.01.19
// React + Material Design
// ------------------------------------------------- //
// https://github.com/material-components/material-components-web-react
// https://github.com/material-components/material-components-web-react#step-3a-use-compiled-css
// https://sass-lang.com/guide
// ------------------------------------------------- //

import React, { Component } from 'react';
// Material Design Components
// import {Cell, Grid, Row} from '@material/react-layout-grid';
// import {
//   Body1,
//   Body2,
//   Button,
//   Caption,
//   Headline1,
//   Headline2,
//   Headline3,
//   Headline4,
//   Headline5,
//   Headline6,
//   Overline,
//   Subtitle1,
//   Subtitle2,
// } from '@material/react-typography';
import TopAppBar, {TopAppBarFixedAdjust} from '@material/react-top-app-bar';
import Drawer, {DrawerAppContent, DrawerContent, DrawerHeader, DrawerTitle} from '@material/react-drawer';
import {ListGroup, ListGroupSubheader} from '@material/react-list';

/*
  Problem loading Icons via JavaScript
  Linked in index.html via Google web fonts -> faster
  https://github.com/material-components/material-components-web-react/tree/master/packages/material-icon
*/

import MaterialIcon from '@material/react-material-icon';

// ------------------------------------------------- //

// My Components
import Scene from './components/Scene';
import Geometries from './components/Geometries';
import Functions from './components/Functions';

// ------------------------------------------------- //

import './App.scss';

// ------------------------------------------------- //

// Most of our material components will be compiled here alongside our canvas... I hope
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {drawerOpen:true, shape:null};
    // This binding is necessary to make `this` work in the callback
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer = () => {
    this.setState(state => ({
      drawerOpen: !state.drawerOpen
    }));
  }

  render() {
    return (
      <div className='drawer-container'>
        <Drawer
          className='drawer-alternate'
          dismissible={true}
          open={this.state.drawerOpen}
        >
          <DrawerContent>
            <ListGroup>
              <ListGroupSubheader tag='h2'>shapes</ListGroupSubheader>
              <Geometries />
              <ListGroupSubheader tag='h2'>Functions</ListGroupSubheader>
              <Functions />
            </ListGroup>
          </DrawerContent>
        </Drawer>

        <DrawerAppContent className='drawer-app-content'>
          <TopAppBar
            title='Generative Jewellery'
            className = 'top-app-bar-alternate'
            navigationIcon={<MaterialIcon
              icon='menu'
              onClick={this.toggleDrawer}
            />}
          />

          <TopAppBarFixedAdjust>
            <Scene/>
          </TopAppBarFixedAdjust>
        </DrawerAppContent>
      </div>
    );
  }
}

// ------------------------------------------------- //

export default App;

// ------------------------------------------------- //
