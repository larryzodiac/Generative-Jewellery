// ------------------------------------------------- //
// Evan MacHale - N00150552
// 09.01.19
// Sub-menu for shape picker
// ------------------------------------------------- //

import React from 'react';
import {Cell} from '@material/react-layout-grid';
import Card, {
  CardPrimaryContent,
  CardMedia,
  // CardActions,
  // CardActionButtons,
  // CardActionIcons
} from "@material/react-card";

// ------------------------------------------------- //

class GeometryCard extends React.Component {
  render() {
    return (
      <Cell column={3}>
        <Card>
          <CardPrimaryContent>
            <h1>{this.props.name}</h1>
            <CardMedia imageUrl={this.props.image}/>
          </CardPrimaryContent>
        </Card>
      </Cell>
    );
  }
}

// ------------------------------------------------- //

export default GeometryCard;
