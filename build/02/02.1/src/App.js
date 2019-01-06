// ------------------------------------------------- //
// Evan MacHale - N00150552
// 06.01.19
// React + Material Design Testing
// ------------------------------------------------- //
// https://github.com/material-components/material-components-web-react#step-3a-use-compiled-css
// https://sass-lang.com/guide
// ------------------------------------------------- //

import React, { Component } from 'react';
import Scene from './components/ThreeScene';
import Button from '@material/react-button';

import './App.scss';

// Most of our material components will be complied here alongside our canvas... I hope
class App extends Component {
  render() {
    return (
      <div className="app">
        <Button
          raised
          className='button-alternate'
          onClick={() => console.log('clicked!')}
        >
          Click Me!
        </Button>
        <Scene/>
      </div>
    );
  }
}

export default App;

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
