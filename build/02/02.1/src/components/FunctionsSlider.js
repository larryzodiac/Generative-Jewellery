// ------------------------------------------------- //
// Evan MacHale - N00150552
// 15.01.19
// Function slider
// ------------------------------------------------- //

import React from 'react';
import ListItem, {ListItemText} from '@material/react-list';
import TextField, {Input} from '@material/react-text-field';

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

class FunctionsSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value:1};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, value) => {
    this.setState({value});
  };

  render() {
    return (
      <ListItem>
        <ListItemText primaryText={this.props.name} />
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
        {/*
          // https://github.com/material-components/material-components-web-react/tree/master/packages/text-field
        */}
        <TextField>
          <Input
          value={this.state.value}
          onChange={(e) => this.setState({value: e.target.value})}/>
        </TextField>
      </ListItem>
    );
  }
}

// ------------------------------------------------- //

export default FunctionsSlider;
