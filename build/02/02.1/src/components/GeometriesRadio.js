// ------------------------------------------------- //
// Evan MacHale - N00150552
// 15.01.19
// Geometry Radio Button
// ------------------------------------------------- //

import React, { Component } from 'react';
import Radio, {NativeRadioControl} from '@material/react-radio';
import ListItem from '@material/react-list';

// ------------------------------------------------- //

class Geometries extends Component {
  render () {
    return (
      <ListItem>
        <Radio className='geometries-list-item' label={this.props.name} key={this.props.name}>
          <NativeRadioControl
            name='geometry'
            value={this.props.name}
            id={this.props.name}
            onChange={this.props.onChange}
          />
        </Radio>
      </ListItem>
    );
  }
}

// ------------------------------------------------- //

export default Geometries;

// ------------------------------------------------- //
