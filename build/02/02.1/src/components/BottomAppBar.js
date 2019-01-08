// ------------------------------------------------- //
// Evan MacHale - N00150552
// 08.01.19
// Three.js
// Floating action buttons
// ------------------------------------------------- //
// https://material-components.github.io/material-components-web-catalog/#/component/fab
// ------------------------------------------------- //

import React from 'react';
/*
  Problem loading Icons via JavaScript
  Linked in index.html via Google web fonts -> faster
  https://github.com/material-components/material-components-web-react/tree/master/packages/material-icon
*/
import {Cell, Grid, Row} from '@material/react-layout-grid';
import Fab from '@material/react-fab';

class BottomAppBar extends React.Component {
  render() {
    return (
      <Grid className="bottom-app-bar">
        <Row>
          <Cell desktopColumns={5} tabletColumns={3} phoneColumns={1}>
            <div align="right">

            </div>
          </Cell>
          <Cell desktopColumns={2} tabletColumns={2} phoneColumns={2}>
            <div align="middle">
              <Fab className="fab-alternate fab-no-icon" textLabel="Generate"/>
            </div>
          </Cell>
          <Cell desktopColumns={5} tabletColumns={3} phoneColumns={1}>
            <div align="left">
            </div>
          </Cell>
        </Row>
      </Grid>
    );
  }
}

export default BottomAppBar;

// <Fab className="fab-alternate" icon={<span className="material-icons">check_box_outline_blank</span>}/>

// <Fab className="fab-alternate" textLabel="Generate"/>

// <Cell columns={4}></Cell>
// <Cell columns={4}>
//   <Row>
//     <Cell columns={4}>
//       <Fab allign="middle" className="fab-alternate" textLabel="Generate"/>
//     </Cell>
//     <Cell columns={4}>
//       <Fab className="fab-alternate" textLabel="Generate"/>
//     </Cell>
//     <Cell columns={4}>
//       <Fab className="fab-alternate" textLabel="Shape"/>
//     </Cell>
//   </Row>
// </Cell>
// <Cell columns={4}></Cell>
