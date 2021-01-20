import React from 'react';
import { purple } from '@material-ui/core/colors';
import { withStyles, Switch } from '@material-ui/core';


const CustomSwitch = (props) => withStyles({
    switchBase: {
      color: purple[300],
      '&$checked': {
        color: purple[500],
      },
      '&$checked + $track': {
        backgroundColor: purple[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  export default CustomSwitch;