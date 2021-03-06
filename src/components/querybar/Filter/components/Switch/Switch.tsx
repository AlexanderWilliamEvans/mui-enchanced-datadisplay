import React, { useEffect, useState } from "react";
import {
  withStyles,
  Theme,
  FormControlLabel,
  Switch as MuiSwitch,
  SwitchClassKey, 
  SwitchProps,
  createStyles
}
  from "@material-ui/core";
import { SwitchTypes }  from "../../../types/Switch.types";


  interface Styles extends Partial<Record<SwitchClassKey, string>> {
    focusVisible?: string;
  }

  interface Props extends SwitchProps {
    classes: Styles;
  }


const CustomSwitch = withStyles((theme:Theme) => createStyles({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.secondary.main,
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }: Props) => {
  return (
    <MuiSwitch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});




const Switch = (props:SwitchTypes) => {
  const [checked, setChecked] = useState(false);
  const value = props.value || null;
  const name = props.name || '';

  const handleChange = (e:any) => {
    const query = { name, filter: { value, checked:e.target.checked }, type:'switch' };
    props.handleFilter(query, 'filter');
    setChecked(e.target.checked);
  };

  useEffect(() => {

  }, [checked, value]);

  return (
    <FormControlLabel
      control={<CustomSwitch checked={checked} onChange={(e) => handleChange(e)} name="customCheckbox" />}
      label={checked ? 'Ja' : 'Nej'}
    />
  );
};
export default Switch;