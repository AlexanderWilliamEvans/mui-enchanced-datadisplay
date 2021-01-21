import React, { useState, useRef, useEffect, useCallback, Fragment } from 'react';
import {
    makeStyles,
    useTheme,
    Grid,
    FormLabel,
    Divider,
} from '@material-ui/core';
import RadioButtonGroup from './components/RadioButtonGroup/RadioButtonGroup';
import RangeSlider from './components/RangeSlider/RangeSlider';
import DateRange from './components/DateRange/DateRange';
import Switcher from './components/Switcher/Switcher';
import ChipList from './components/ChipList/ChipList';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    gridItem: {
        padding: theme.spacing(4),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    buttonGroup: {
        padding: theme.spacing(1),
        borderBottom: '1px solid #ccc',
        height: '75px'
    },
    filterContainer: {
        padding: theme.spacing(2),
        borderBottom: '1px solid #ccc'
    },
    margin: {
        margin: theme.spacing(1),
    },
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
    noLabel: {
        marginTop: theme.spacing(3),
    },

}));



const FilterMenu = (props) => {

    const classes = useStyles();
    const [filters, setFilters] = useState(props.filters || []);
    const [activeFilters, setActiveFilters] = useState([
        /*  {name: 'gender', type: 'radio', filter: ['male', 'female']},
          {name:'year', type: 'range', filter: [1920, 1970]},
          {name: 'born', type: 'dateRange', filter: ['2010-07-10', '2012-04-12']}*/
    ]);
    const activeFilterRef = useRef(activeFilters);

    const handleFilter = (filter) => {
        let newState = [...activeFilters];
        const index = newState.findIndex(x => x.name === filter.name);
        if (index !== -1) {
            newState[index] = filter;
        } else {
            newState.push(filter);
        }
        setActiveFilters(newState);
    };


    const handleQuery = useCallback(() => {
        props.handleQuery(activeFilters, 'filter');
    }, [props, activeFilters]);

    useEffect(() => {

        if (JSON.stringify(activeFilterRef.current) !== JSON.stringify(activeFilters)) {
            handleQuery(activeFilters, 'filter');
            activeFilterRef.current = activeFilters;
        }
    }, [filters, activeFilters, handleQuery]);

    return (
        <div className={classes.filterContainer}>
            <Grid container spacing={4}>
                {
                    filters.length > 0 ? filters.map((filter) => {
                        switch (filter.type) {
                            case 'radio':
                                return (
                                    <Grid item xs={4} className={classes.gridItem}>
                                        <FormLabel component="legend">{filter.label}</FormLabel>
                                        <Divider />
                                        <RadioButtonGroup name={filter.name} data={filter.data} handleFilter={handleFilter} />
                                    </Grid>
                                )
                            case 'range':
                                return (
                                    <Grid item xs={4} className={classes.gridItem}>
                                        <FormLabel component="legend">{filter.label}</FormLabel>
                                        <Divider />
                                        <RangeSlider name={filter.name} type={filter.type} data={filter.data} handleFilter={handleFilter} />
                                    </Grid>
                                );
                            case 'dateRange':
                                return (
                                    <Grid item xs={4} className={classes.gridItem}>
                                        <FormLabel component="legend">{filter.label}</FormLabel>
                                        <Divider />
                                        <DateRange name={filter.name} data={filter.data} handleFilter={handleFilter} />
                                    </Grid>
                                );
                            case 'chip':
                                return (
                                    <Grid item xs={4} className={classes.gridItem}>
                                        <FormLabel component="legend">{filter.label}</FormLabel>
                                        <Divider />
                                        <ChipList name={filter.name} type={filter.type} data={filter.data} handleFilter={handleFilter}/>
                                    </Grid>
                                );
                            case 'switch':
                                return (
                                    <Switcher />
                                );
                            default:
                                return null;
                        }
                    }) : null
                }
            </Grid>

        </div>
    );
};

export default FilterMenu;