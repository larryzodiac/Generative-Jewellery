// ------------------------------------------------- //
// Evan MacHale - N00150552
// 15.01.19
// Function slider
// ------------------------------------------------- //

import React from 'react';
import { ListItem, ListItemText, ListItemMeta } from '@material/react-list';

// ------------------------------------------------- //

/*
  material-components-web-react does not currently support sliders
  However, the material-components-web repository does
  The following codes implements the material-components-web version
*/

// import {MDCSlider} from '@material/slider';
// const slider = new MDCSlider(document.querySelector('.mdc-slider'));
// slider.listen('MDCSlider:change', () => console.log(`Value changed to ${slider.value}`));

/*
  Using material-components-web involves setting up webpack
  I would have to set up a heap load more dependencies and install effectively another framework in this app
  Furthermore, it would require a re-configuring of all 'src' files and a different compiling structure that doesn't fit with the current system by MDC React
  I have no time for this as of 13.01.19
  ... also material-components-web is pure html/css and doesn't implement components
  // https://github.com/material-components/material-components-web/blob/master/docs/getting-started.md

  I will therefore use the 'material-ui' react framework to install individual components:
  // https://material-ui.com/lab/api/slider/
*/

import Slider from '@material-ui/lab/Slider';

// ------------------------------------------------- //

/*
  material-ui Slider:
  https://material-ui.com/lab/slider/
  Simple alternative to:
  https://github.com/material-components/material-components-web/tree/master/packages/mdc-slider
*/

class Slider_ extends React.Component {
  state = {
    value: 0,
  };

  render() {
    return (
      <React.Fragment>
        <ListItem className='drawer-list-item'>
          <ListItemText primaryText={this.props.label} />
          <ListItemMeta meta={`${this.props.value}`} />
          {/*
            <ListItemMeta meta=
            <TextField dense={true}>
              <Input
                name='slider'
                value={this.props.value}
                onChange={this.props.onChange}
              />
            </TextField>
          />
          */}
        </ListItem>
        <ListItem id={this.props.name} className='drawer-slider'>
          <Slider classes={{thumb: 'drawer-slider-material', trackBefore: 'drawer-slider-material'}}
            min={this.props.min}
            max={this.props.max}
            step={this.props.step}
            value={this.props.value}
            aria-labelledby='label'
            onChange={this.props.onChange}
          />
        </ListItem>
      </React.Fragment>
    );
  }
}

// ------------------------------------------------- //

export default Slider_;
