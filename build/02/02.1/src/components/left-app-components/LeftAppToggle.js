// ------------------------------------------------- //
// Evan MacHale - N00150552
// 09.01.19
// Toggle between shapes and functions menus
// ------------------------------------------------- //

import React from 'react';

// ------------------------------------------------- //

// My components
// The following will return based on which icon is pressed
import LeftAppShapes from './LeftAppShapes';
import LeftAppFunctions from './LeftAppFunctions';

// ------------------------------------------------- //

const LeftAppToggle = (props) => {
  const isShapeOn = props.isShapeOn;
  const isFunctionOn = props.isFunctionOn;
  if (isShapeOn === true) {
    return <LeftAppShapes />;
  } else if (isFunctionOn === true) {
    return <LeftAppFunctions />;
  } else {
    return <div></div>
  }
}

// ------------------------------------------------- //

export default LeftAppToggle;
