// ------------------------------------------------- //
// Evan MacHale - N00150552
// 15.01.19
// Function slider
// ------------------------------------------------- //
// https://reactjs.org/docs/refs-and-the-dom.html

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
import { MDCSlider } from '@material/slider';
// import { MDCSlider } from '@material/slider/dist/mdc.slider';
// slider.listen('MDCSlider:change', () => console.log(`Value changed to ${slider.value}`));


// ------------------------------------------------- //

/*
  material-ui Slider:
  https://material-ui.com/lab/slider/
  Simple alternative to:
  https://github.com/material-components/material-components-web/tree/master/packages/mdc-slider
*/

class Slider_ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
    this.sliderRef = React.createRef();
  }

  componentDidMount() {
    this.slider = new MDCSlider(this.sliderRef.current);

    // this.slider.listen('MDCSlider:change', () => console.log(`Value changed to ${this.slider.value}`));
  }

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
          <div ref={this.sliderRef} className="slider-div mdc-slider" tabIndex="0" role="slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-label="Select Value">
            <div className="mdc-slider__track-container">
              <div className="mdc-slider__track"></div>
            </div>
            <div className="mdc-slider__thumb-container">
              <svg className="mdc-slider__thumb" width="21" height="21">
                <circle cx="10.5" cy="10.5" r="7.875"></circle>
              </svg>
              <div className="mdc-slider__focus-ring"></div>
            </div>
          </div>
      </React.Fragment>
    );
  }
}

// ------------------------------------------------- //

export default Slider_;
