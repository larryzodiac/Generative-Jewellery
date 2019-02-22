// ------------------------------------------------- //
// Evan MacHale - N00150552
// 15.02.19
// Starting Eslint + PropTypes
// An application top nav bar w/ tabs + logout button
// ------------------------------------------------- //
// https://reactjs.org/docs/typechecking-with-proptypes.html
// https://eslint.org/docs/rules/
// ------------------------------------------------- //

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Material Design Components
import TopAppBar from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';
import Button from '@material/react-button';

// ------------------------------------------------- //

// My Components
import Tab from './Tab';

// ------------------------------------------------- //

class AppBar extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.handleActiveIndexUpdate = this.handleActiveIndexUpdate.bind(this);
  }

  handleActiveIndexUpdate(activeIndex) { this.setState({ activeIndex }); }

  render() {
    const { icon } = this.props;
    const { onClick } = this.props;
    const { activeIndex } = this.state;
    let menu;
    if (icon && onClick) {
      menu = <MaterialIcon icon="menu" onClick={onClick} />;
    } else {
      menu = <React.Fragment />;
    }

    return (
      <React.Fragment>
        <TopAppBar
          fixed
          className="top-app-bar-alternate"
          navigationIcon={menu}
          actionItems={[
            <Tab
              activeIndex={activeIndex}
              handleActiveIndexUpdate={this.handleActiveIndexUpdate}
            />,
            <Button className="button-logout">LOGOUT</Button>]}
        />
      </React.Fragment>
    );
  }
}

// ------------------------------------------------- //

AppBar.propTypes = {
  icon: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

AppBar.defaultProps = {
  // Use null if empty?
  onClick: null,
};

// ------------------------------------------------- //

export default AppBar;

// ------------------------------------------------- //
