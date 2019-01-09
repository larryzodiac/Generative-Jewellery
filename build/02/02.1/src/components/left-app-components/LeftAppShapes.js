// ------------------------------------------------- //
// Evan MacHale - N00150552
// 09.01.19
// Sub-menu for shape picker
// ------------------------------------------------- //

import React from 'react';
import {Cell, Row} from '@material/react-layout-grid';
import {
  Body1,
  Headline6,
} from '@material/react-typography';
import Checkbox from '@material/react-checkbox';

// ------------------------------------------------- //

// My components
import GeometryCard from './GeometryCard';

// ------------------------------------------------- //

// Shapes contents
const shapes = [
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
const shapesList = shapes.map(u => <GeometryCard name={u.name} image={u.image}/>);

// ------------------------------------------------- //

class LeftAppShapes extends React.Component {
  state = {checked: false, indeterminate: false};

  render() {
    return (
      <section>
        <Row tag="header">
          {/*Geometries*/}
          <Headline6>Geometry</Headline6>
        </Row>
        <br/>
        <Row tag="section">
          <Cell>
            <Checkbox
              nativeControlId='my-checkbox'
              checked={this.state.checked}
              indeterminate={this.state.indeterminate}
              onChange={(e) => this.setState({
                checked: e.target.checked,
                indeterminate: e.target.indeterminate})
              }
            />
          </Cell>
          <label htmlFor='my-checkbox'><Body1>Wireframe</Body1></label>
          {/*Wireframes is true*/}
        </Row>
        <br/>
        <Row tag="section">
          {/*List of shapes*/}
          {shapesList}
        </Row>
      </section>
    );
  }
}

// ------------------------------------------------- //

export default LeftAppShapes;
