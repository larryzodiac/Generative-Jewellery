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
      <main className='app'>

      {/*
        Note two <Grid> components
        I discovered a problem using one grid -> it stretches acosss the entire screen
        This means that the mouse cannot interact with the Three.js <Scene/>
        Using two goes against Material Design principles but is the only solution.
        z-index doesn't effectively solve the problem
      */}

        <Grid tag='section' className='grid-left'>
          <Row>
            <Cell desktopColumns={12} tabletColumns={12}>
              <LeftAppBar/>
            </Cell>
          </Row>
        </Grid>

        <Grid tag='section' className='grid-right'>
          <Row>
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
