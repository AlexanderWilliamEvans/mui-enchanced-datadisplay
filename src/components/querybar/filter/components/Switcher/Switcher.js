import React, { useState} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AntSwitch from './Types/Ant';
import IOSSwitch from './Types/IOS';
import CustomSwitch from './Types/Custom';






const Switcher = (props) => {
  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={<CustomSwitch checked={state.checkedA} onChange={handleChange} name="checkedA" />}
        label="Custom color"
      />
      <FormControlLabel
        control={<IOSSwitch checked={state.checkedB} onChange={handleChange} name="checkedB" />}
        label="iOS style"
      />
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Off</Grid>
          <Grid item>
            <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
          </Grid>
          <Grid item>On</Grid>
        </Grid>
      </Typography>
    </FormGroup>
  );
};
export default Switcher;