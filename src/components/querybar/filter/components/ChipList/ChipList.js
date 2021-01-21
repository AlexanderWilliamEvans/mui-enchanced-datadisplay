import React, { useState, useEffect } from 'react';
import { 
    makeStyles, 
    useTheme, 
    FormControl, 
    InputLabel, 
    Input, 
    Chip, 
    MenuItem, 
    Select
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    chipformControl: {
        margin: theme.spacing(1),
        minWidth: 150,
        maxWidth: 400,
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chipContainer: {
        border: '1px solid #ccc',
        padding: theme.spacing(1),
        minWidth: 500,
        maxWidth: 500,
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    chip: {
        margin: 2,
    },

}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const ChipList = (props) => {

    const classes = useStyles();
    const theme = useTheme();

    const [label, setLabel ] = useState(props.label || '' );
    const [type, setType ] = useState(props.type || 'list');
    const [name, setName] = useState(props.name || '');
    const [values, setValues] = useState(props.data.values || []);
    const [selectedValues, setSelectedValues] = useState([]);

    const getStyles = (name, personName, theme) => {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    };


    const handleFilter = (e) => {

        setSelectedValues(e.target.value);
        const query = {filter: e.target.value, type, name}
        props.handleFilter(query, 'filter');
    };

    const removeChip = (e) => {

    };
  
    useEffect(() => {

  }, [values]);

  debugger;
    return (
        <FormControl className={classes.chipformControl}>
                        <InputLabel id="demo-mutiple-chip-label">{label}</InputLabel>
                        <Select
                            onMouseDown={(event) => {
                                event.stopPropagation();
                            }}
                            labelId="demo-mutiple-chip-label"
                            id="demo-mutiple-chip"
                            multiple
                            value={selectedValues}
                            onChange={(e) => handleFilter(e)}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={(selected) => (
                                <div className={classes.chips}>
                                    {selected.map((value) => 
                                    (
                                        <Chip
                                            key={value}
                                            label={value}
                                            className={classes.chip}
                                            clickable
                                            color="primary"
                                            onDelete={(e) => removeChip(e, value)}
                                            onMouseDown={(event) => {
                                                event.stopPropagation();
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                            MenuProps={MenuProps}
                        >
                            {values.map((value) => (
                                <MenuItem key={value} value={value} style={getStyles(value, selectedValues, theme)}>
                                    {value}
                                </MenuItem>
                            ))}
                        </Select> 
                    </FormControl>
    );
};

export default ChipList;