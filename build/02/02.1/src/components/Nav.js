// ------------------------------------------------- //
// Evan MacHale - N00150552
// 06.01.19
// Three.js
// MDC's top-app-bar
// ------------------------------------------------- //
// https://github.com/material-components/material-components-web-react/tree/master/packages/top-app-bar
// https://material-components.github.io/material-components-web-catalog/#/component/top-app-bar
// ------------------------------------------------- //

import React from 'react';
import TopAppBar, {TopAppBarFixedAdjust} from '@material/react-top-app-bar';
/*
  Problem loading Icons via JavaScript
  Linked in index.html via Google web fonts -> faster
  https://github.com/material-components/material-components-web-react/tree/master/packages/material-icon
*/
import MaterialIcon from '@material/react-material-icon';

const Nav = () => {
  return (
    <header>
      <TopAppBar
        // title='Generative Jewellery'
        className = 'top-app-bar-alternate'
        navigationIcon={<MaterialIcon
          icon='menu'
          onClick={() => console.log('click')}
        />}
        actionItems={[<MaterialIcon key='item' icon='settings'/>]}
      />
      <TopAppBarFixedAdjust></TopAppBarFixedAdjust>
    </header>
  );
}

export default Nav;
