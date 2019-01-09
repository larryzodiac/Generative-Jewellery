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

class RightAppBar extends React.Component {
  render() {
    return (
      <nav>
        <Row>
          <Cell align="left">
            <IconButton className="icon-button-alternate">
              <MaterialIcon icon='account_circle'/>
            </IconButton>
          </Cell>
        </Row>
        <br/>
        <Row>
          <Cell align="left">
            <IconButton className="icon-button-alternate">
              <MaterialIcon icon='save_alt'/>
            </IconButton>
          </Cell>
        </Row>
        <br/>
        <Row>
          <Cell align="left">
            <IconButton className="icon-button-alternate">
              <MaterialIcon icon='format_color_fill'/>
            </IconButton>
          </Cell>
        </Row>
      </nav>
    );
  }
}

// ------------------------------------------------- //

export default RightAppBar;
