// ------------------------------------------------- //
// Evan MacHale - N00150552
// 09.01.19
// Sub-menu for shape picker
// ------------------------------------------------- //

import React from 'react';
import {Cell, Row} from '@material/react-layout-grid';
import {Body1} from '@material/react-typography';


// ------------------------------------------------- //

/*
  material-components-web-react does not currently support sliders
  However, the material-components-web repository does
  The following codes implements the material-components-web version
*/

import {MDCSlider} from '@material/slider';

// ------------------------------------------------- //

class FunctionSlider extends React.Component {
  constructor(props) {
    super(props);
    // this.slider = new MDCSlider(document.querySelector('.mdc-slider'));
  }

  render() {
    // const slider = new MDCSlider(document.querySelector('.mdc-slider'));
    // slider.listen('MDCSlider:change', () => console.log(`Value changed to ${slider.value}`));

    return (
      <Row tag="section">
        <Cell>
          <Row>
            <Cell columns={12}>
              <Body1>{this.props.name}</Body1>
            </Cell>
          </Row>
          <Row>
            <Cell columns={8}>
              <div class="mdc-slider" tabindex="0" role="slider"
              aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"
              aria-label="Select Value">
                <div class="mdc-slider__track-container">
                  <div class="mdc-slider__track"></div>
                </div>
                <div class="mdc-slider__thumb-container">
                  <svg class="mdc-slider__thumb" width="21" height="21">
                  <circle cx="10.5" cy="10.5" r="7.875"></circle>
                  </svg>
                  <div class="mdc-slider__focus-ring"></div>
                </div>
              </div>
            </Cell>
          </Row>
        </Cell>
        <br/>
      </Row>
    );
  }
}

// ------------------------------------------------- //

export default FunctionSlider;
