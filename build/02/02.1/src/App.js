// ------------------------------------------------- //
// Evan MacHale - N00150552
// 06.01.19
// React + Material Design Testing
// ------------------------------------------------- //
// https://github.com/material-components/material-components-web-react#step-3a-use-compiled-css
// https://sass-lang.com/guide
// ------------------------------------------------- //

import React, { Component } from 'react';
// Material Design Components
import {Cell, Grid, Row} from '@material/react-layout-grid';
import {
  Body1,
  Body2,
  Button,
  Caption,
  Headline1,
  Headline2,
  Headline3,
  Headline4,
  Headline5,
  Headline6,
  Overline,
  Subtitle1,
  Subtitle2,
} from '@material/react-typography';

// ------------------------------------------------- //

// My Components
import Scene from './components/Scene';
import Nav from './components/Nav';
import BottomAppBar from './components/BottomAppBar';
// Left App
import LeftAppBar from './components/left-app-components/LeftAppBar';
// Right App
import RightAppBar from './components/RightAppBar';

import './App.scss';

// ------------------------------------------------- //

// Most of our material components will be compiled here alongside our canvas... I hope
class App extends Component {
  render() {
    return (
      <main className="app">
        <Grid>
          <Row>

            <Cell desktopColumns={3} tabletColumns={2}>
              <LeftAppBar/>
            </Cell>

            <Cell desktopColumns={6} tabletColumns={4}></Cell>
            <Cell desktopColumns={2} tabletColumns={1}></Cell>
            <Cell desktopColumns={1} tabletColumns={1}>
              <RightAppBar/>
            </Cell>
          </Row>
        </Grid>
        <Scene/>
      </main>
    );
  }
}

// ------------------------------------------------- //

export default App;

// ------------------------------------------------- //
