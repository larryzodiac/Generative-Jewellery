// ------------------------------------------------- //
// Evan MacHale - N00150552
// 15.01.19
// List item of radio buttons inserted into drawer
// ------------------------------------------------- //

import React, { Component } from 'react';
import List, { ListItem, ListItemText } from '@material/react-list';
import Checkbox from '@material/react-checkbox';

// ------------------------------------------------- //

// My components
import GeometriesRadio from './GeometriesRadio';

// ------------------------------------------------- //

// Geometries contents
const geometries = [
  {name:'Cone', image:'http://showcase.iadt.ie/assets/CC3/Headshot/N00153748_Profile.jpg'},
  {name:'Cube', image:'http://showcase.iadt.ie/assets/CC3/Headshot/N00153748_Profile.jpg'},
  {name:'Cylinder', image:'http://showcase.iadt.ie/assets/CC3/Headshot/N00150552_Profile.jpg'},
  {name:'Dodecahedron', image:'http://showcase.iadt.ie/assets/CC3/Headshot/N00150552_Profile.jpg'},
  {name:'Icosahedron', image:'http://showcase.iadt.ie/assets/CC3/Headshot/N00150552_Profile.jpg'},
  {name:'Octahedron', image:'http://showcase.iadt.ie/assets/CC3/Headshot/N00153748_Profile.jpg'},
  {name:'Tetrahedron', image:'http://showcase.iadt.ie/assets/CC3/Headshot/N00152737_Profile.jpg'},
  {name:'Torus', image:'http://showcase.iadt.ie/assets/CC3/Headshot/N00153748_Profile.jpg'}
];
// Passing Props to generate list
const geometries_list = geometries.map(g => <GeometriesRadio key={g.name} name={g.name} image={g.image}/>);

// ------------------------------------------------- //

class Geometries extends Component {
  constructor(props) {
    super(props);
    this.state = {shape:null, checked: false, indeterminate: false};
  }

  render () {
    return (
      <List className='list-alternate'>
        {geometries_list}
        <ListItem>
          <Checkbox
            nativeControlId='my-checkbox'
            checked={this.state.checked}
            indeterminate={this.state.indeterminate}
            onChange={(e) => this.setState({
              checked: e.target.checked,
              indeterminate: e.target.indeterminate})
            }
          />
          <ListItemText primaryText='Wireframe' />
        </ListItem>
      </List>
    );
  }
}

// ------------------------------------------------- //

export default Geometries;

// ------------------------------------------------- //
