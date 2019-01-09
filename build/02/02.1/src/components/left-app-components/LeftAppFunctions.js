// ------------------------------------------------- //
// Evan MacHale - N00150552
// 09.01.19
// Sub-menu for shape picker
// ------------------------------------------------- //

import React from 'react';
import {Row} from '@material/react-layout-grid';
import {Headline6} from '@material/react-typography';

// ------------------------------------------------- //

// My components
import FunctionSlider from './FunctionSlider';

// ------------------------------------------------- //

// function options
const functions = [
  {name:'Subdivisions'},
  {name:'Adjacent Weight'},
  {name:'Edge-Point Weight'},
  {name:'Connecting Edges Weight'}
];
// Passing Props to generate list
const functionsList = functions.map(u => <FunctionSlider name={u.name}/>);

// ------------------------------------------------- //

class LeftAppFunctions extends React.Component {
  render() {
    return (
      <section>
        <Row tag="header">
          {/*Functions*/}
          <Headline6>Functions</Headline6>
        </Row>
        {/*Number of subdivisions*/}
        {/*Adjacent Weight*/}
        {/*Edge-point Weight*/}
        {/*Number of Connecting Edges Weight*/}
        {functionsList}
      </section>
    );
  }
}

// ------------------------------------------------- //

export default LeftAppFunctions;
