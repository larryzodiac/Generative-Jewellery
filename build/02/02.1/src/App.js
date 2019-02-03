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
import List, { ListItem, ListItemGraphic, ListItemText, ListItemMeta, ListGroup, ListGroupSubheader, ListDivider } from '@material/react-list';

/*
  Problem loading Icons via JavaScript
  Linked in index.html via Google web fonts -> faster
  https://github.com/material-components/material-components-web-react/tree/master/packages/material-icon
*/

import MaterialIcon from '@material/react-material-icon';

// ------------------------------------------------- //

// My Components
import Scene from './components/Scene';
import GeometryList from './components/GeometryList';
import FunctionList from './components/FunctionList';

// ------------------------------------------------- //

import './App.scss';

// ------------------------------------------------- //

// Most of our material components will be compiled here alongside our canvas... I hope
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: true,
      // For the Scene
      geometry: 'Octahedron',
      wireframe: false,
      subdivisions: 0
    };
    // This binding is necessary to make `this` work in the callback
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer = () => {
    this.setState(prevState => ({
      drawerOpen: !prevState.drawerOpen
    }));
  }

  // handleChange = (event) => {
  //   const name = event.target.type === 'checkbox' ? 'wireframe' : event.target.name;
  //   const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
  //   let name;
  //   name = event.target.getAttribute('name')
  //   console.log(event.target.type);
  //   this.setState({
  //     [name]: value
  //   });
  // }

  handleChange = (event, sliderValue) => {
    /*
      event.target when slider is changed is an <li> element
      It does not have event.target.value/name
      However the value of the slider may be passed directly as sliderValue
      This does not appply to the other targets as they are <input>
      See https://material-ui.com/lab/slider/
    */
    // let name;
    // switch (event.target.name) {
    //   case undefined:
    //     name = 'subdivisions';
    //     break;
    //   default:
    //     name = event.target.name;
    // }
    const name = event.target.type === 'checkbox' ? 'wireframe' : event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      [name]: value,
      subdivisions: sliderValue
    });
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
              <List>
                <GeometryList
                  geometry={this.state.geometry}
                  wireframe={this.state.wireframe}
                  onChange={this.handleChange}
                />
              </List>
              <ListDivider />
              <List>
                <FunctionList
                  subdivisions={this.state.subdivisions}
                  onChange={this.handleChange}
                />
              </List>
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
            <Scene geometry={this.state.geometry} subdivisions={this.state.subdivisions} wireframe={this.state.wireframe}/>
          </TopAppBarFixedAdjust>
        </DrawerAppContent>
      </div>
    );
  }
}

// ------------------------------------------------- //

export default App;

// ------------------------------------------------- //
