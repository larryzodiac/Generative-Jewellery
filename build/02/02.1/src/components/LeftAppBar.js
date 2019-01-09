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

class LeftAppBar extends React.Component {
  render() {
    return (
      <nav>
        <Row>
          <Cell align="right">
            <IconButton className="icon-button-alternate">
              <MaterialIcon icon='category' />
            </IconButton>
          </Cell>
        </Row>
        <br/>
        <Row>
          <Cell align="middle">
            <IconButton className="icon-button-alternate">
              <MaterialIcon icon='functions' />
            </IconButton>
          </Cell>
        </Row>
      </nav>
    );
  }
}

// ------------------------------------------------- //

export default LeftAppBar;
