// ------------------------------------------------- //
// Evan MacHale - N00150552
// 09.01.19
// Menu for pick shape, equation weights, maybe more?
// ------------------------------------------------- //

import React from 'react';
import {Cell, Row} from '@material/react-layout-grid';
import IconButton from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';

// ------------------------------------------------- //

// My components
// The following will render based on which icon is pressed
import LeftAppToggle from './LeftAppToggle';

// ------------------------------------------------- //

class LeftAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isShapeOn: false, isFunctionOn: false};

    // This binding is necessary to make `this` work in the callback
    this.handleShape = this.handleShape.bind(this);
    this.handleFunction = this.handleFunction.bind(this);
  }

  handleShape () {
    this.setState({isShapeOn: true, isFunctionOn: false});
  }

  handleFunction () {
    this.setState({isShapeOn: false, isFunctionOn: true});
  }

  render() {
    return (
      <Row>
        <Cell desktopColumns={2} tabletColumns={2}>
          {/* Left App Bar */}
          <Row>
            <Cell align="middle">
              {/* Can I pass id to the function? */}
              <IconButton id="category" className="icon-button-alternate" onClick={this.handleShape}>
                <MaterialIcon icon='category' />
              </IconButton>
            </Cell>
          </Row>
          <br/>
          <Row>
            <Cell align="middle">
              <IconButton className="icon-button-alternate" onClick={this.handleFunction}>
                <MaterialIcon icon='functions' />
              </IconButton>
            </Cell>
          </Row>
        </Cell>
        <Cell>
          {/*
            If icons pressed change state -> Below component returns differently depending on state
            Come back and figure out keys
            Is this the REACT way to do things ???
          */}
          <LeftAppToggle isShapeOn={this.state.isShapeOn} isFunctionOn={this.state.isFunctionOn}/>
        </Cell>
      </Row>
    );
  }
}

// ------------------------------------------------- //

export default LeftAppBar;
