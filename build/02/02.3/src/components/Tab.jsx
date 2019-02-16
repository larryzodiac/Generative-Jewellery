// ------------------------------------------------- //
// Evan MacHale - N00150552
// 15.02.19
// Tabs to be imported to AppBar.jsx
// ------------------------------------------------- //

import React from 'react';
import PropTypes from 'prop-types';
// Material Design Components
import TabBar from '@material/react-tab-bar';
import { Tab as ReactTab } from '@material/react-tab';

// ------------------------------------------------- //

const Tab = (props) => {
  const { activeIndex } = props;
  const { handleActiveIndexUpdate } = props;

  return (
    <TabBar
      className="tab-bar-alternate"
      activeIndex={activeIndex}
      handleActiveIndexUpdate={handleActiveIndexUpdate}
    >
      <ReactTab className="tab-alternate">
        <span className="mdc-tab__text-label">PLAY</span>
      </ReactTab>
      <ReactTab className="tab-alternate">
        <span className="mdc-tab__text-label">SAVED</span>
      </ReactTab>
    </TabBar>
  );
};

// ------------------------------------------------- //

Tab.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  handleActiveIndexUpdate: PropTypes.func.isRequired,
};

// ------------------------------------------------- //

export default Tab;

// ------------------------------------------------- //
