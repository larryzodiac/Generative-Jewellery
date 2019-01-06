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
import Button from '@material/react-button';
// My Components
import Scene from './components/Scene';
import Nav from './components/Nav';

import './App.scss';

// Most of our material components will be compiled here alongside our canvas... I hope
class App extends Component {
  render() {
    return (
      <main className="app">
        <Nav/>
        <section>
          <Grid className="container">
            <Row>
              <p>Hello world</p>
            </Row>
          </Grid>
          <Scene/>
        </section>
      </main>
    );
  }
}

export default App;

// <Button
//   raised
//   className='button-alternate'
//   onClick={() => console.log('clicked!')}
// >
//   Click Me!
// </Button>

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }
