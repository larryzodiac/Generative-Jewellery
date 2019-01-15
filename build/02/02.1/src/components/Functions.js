// ------------------------------------------------- //
// Evan MacHale - N00150552
// 15.01.19
// Geometries radio list
// ------------------------------------------------- //

import React, { Component } from 'react';
import List from '@material/react-list';

// ------------------------------------------------- //

// My components
import FunctionsSlider from './FunctionsSlider';

// ------------------------------------------------- //

// function options for slider
const functions = [
  {name:'Subdivisions', max:10, step:1},
  {name:'Adjacent Weight', max:1, step:null},
  {name:'Edge-Point Weight', max:1, step:null},
  {name:'Connecting Edges Weight', max:10, step:1}
];
// Passing Props to generate list
const functions_list = functions.map(f => <FunctionsSlider key={f.name} name={f.name} max={f.max} step={f.step}/>);

// ------------------------------------------------- //

class Functions extends Component {
  constructor(props) {
    super(props);
    this.state = {shape:null};
  }

  render () {
    return (
      <List className='list-alternate'>
        {functions_list}
      </List>
    );
  }
}

// ------------------------------------------------- //

export default Functions;

// ------------------------------------------------- //
