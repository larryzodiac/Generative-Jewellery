// ------------------------------------------------- //
// Evan MacHale - N00150552
// 09.01.19
// Sub-menu for shape picker
// ------------------------------------------------- //

import React from 'react';
import {Cell, Row} from '@material/react-layout-grid';
import {Body1} from '@material/react-typography';
import TextField, {HelperText, Input} from '@material/react-text-field';

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

class FunctionSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value:1};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, value) => {
    this.setState({value});
    // this.setState(prevState => ({flagged: prevState.flagged = true}));
  };

  render() {
    return (
      <Row tag='section'>
        <Cell>
          <Row>
            <Cell columns={12}>
              <Body1>{this.props.name}</Body1>
            </Cell>
          </Row>
          <Row>
            <Cell columns={8}>
              {/*
                material-ui Slider:
                // https://material-ui.com/lab/slider/
                Simple alternative to:
                // https://github.com/material-components/material-components-web/tree/master/packages/mdc-slider
              */}
              <Slider
                className='slider'
                max={this.props.max}
                step={this.props.step}
                value={this.state.value}
                aria-labelledby='label'
                onChange={this.handleChange}
              />
            </Cell>
            <Cell columns={4}>
              {/*
                // https://github.com/material-components/material-components-web-react/tree/master/packages/text-field
              */}
              <TextField>
                <Input
                value={this.state.value}
                onChange={(e) => this.setState({value: e.target.value})}/>
              </TextField>
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
