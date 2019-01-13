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

// function options for slider
const functions = [
  {name:'Subdivisions', max:10, step:1},
  {name:'Adjacent Weight', max:1, step:null},
  {name:'Edge-Point Weight', max:1, step:null},
  {name:'Connecting Edges Weight', max:10, step:1}
];
// Passing Props to generate list
const functionsList = functions.map(p => <FunctionSlider key={p.name} name={p.name} max={p.max} step={p.step}/>);

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
