// ------------------------------------------------- //
// Evan MacHale - N00150552
// 15.01.19
// Geometries radio list
// ------------------------------------------------- //

import React, { Component } from 'react';
import { ListItem, ListItemText, ListItemMeta } from '@material/react-list';

// ------------------------------------------------- //

// My components
import Slider_ from './input/Slider_';

// ------------------------------------------------- //

class FunctionList extends Component {
  render () {
    // function options for slider
    const functions = [
      {name:'Subdivisions', value:this.props.subdivisions, max:5, step:1},
      {name:'Adjacent Weight', value:1, max:1, step:null},
      {name:'Edge-Point Weight', value:1, max:1, step:null},
      {name:'Connecting Edges Weight',value:1,  max:10, step:1}
    ];
    // Passing Props to generate list
    const functions_list = functions.map(f => {
      return (
        <Slider_
          key={f.name}
          name={f.name}
          value={f.value}
          onChange={this.props.onChange}
          max={f.max}
          step={f.step}
        />
      )
    });

    return (
      <React.Fragment>
        {functions_list}
      </React.Fragment>
    );
  }
}

// ------------------------------------------------- //

export default FunctionList;

// ------------------------------------------------- //
