import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    makeStyles,
    Grid,
    FormLabel,
    Divider,
    Tooltip,
    IconButton,
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import RadioButtonGroup from './components/RadioButtonGroup/RadioButtonGroup';
import RangeSlider from './components/RangeSlider/RangeSlider';
import DateRange from './components/DateRange/DateRange';
import Switch from './components/Switch/Switch';
import ChipList from './components/ChipList/ChipList';
import { FilterMenuTypes } from '../types/FilterMenu.types';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    gridItem: {
        padding: theme.spacing(4),
    },
    headerGrid: {
        padding: 0,
    },
    clearFilterButton: {
        float: 'right',
        padding: 0,
        margin: 0
    },
    menuButton: {
        marginRight: theme.spacing(2),
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
    noLabel: {
        marginTop: theme.spacing(3),
    },

}));

interface IActiveFilter {
    name: string,
    type: string,
    filter: any,
};

const FilterMenu = (props:FilterMenuTypes) => {
    const classes = useStyles();
    const filters = props.filters || [];
    const [activeFilters, setActiveFilters] = useState<IActiveFilter[]>([]);
    const activeFilterRef = useRef(activeFilters);

    const handleFilter = (filter:Array<IActiveFilter> | any) => {
        let newState = [...activeFilters];
        const index = newState.findIndex(x => x.name === filter.name);
        if (index !== -1) {
            newState[index] = filter;
        } else {
            newState.push(filter);
        }
        setActiveFilters(newState);
    };

    const clearFilter = () => {
        setActiveFilters([]);
    };


    const handleQuery = useCallback(() => {
        props.handleQuery(activeFilters, "filter");
    }, [props, activeFilters]);

    useEffect(() => {

        if (JSON.stringify(activeFilterRef.current) !== JSON.stringify(activeFilters)) {
            handleQuery();
            activeFilterRef.current = activeFilters;
        }
    }, [filters, activeFilters, handleQuery]);

    return (
        <div className={classes.filterContainer}>
            <Grid container spacing={4}>
                <Grid item xs={12} className={classes.headerGrid}>
                    <Tooltip title="Rensa filter">
                        <IconButton
                            className={classes.clearFilterButton}
                            color="primary"
                            onClick={() => clearFilter()}
                        >
                            <HighlightOffIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </Grid>
                {
                    filters.length > 0 ? filters.map((filter, index) => {
                        switch (filter.type) {
                            case 'radio':
                                return (
                                    <Grid key={`${filter.name}-${index}`} item xs={filter.width || 4} className={classes.gridItem}>
                                        <FormLabel component="legend">{filter.label}</FormLabel>
                                        <Divider />
                                        <RadioButtonGroup name={filter.name} data={filter.data} handleFilter={handleFilter} />
                                    </Grid>
                                )
                            case 'range':
                                return (
                                    <Grid key={`${filter.name}-${index}`} item xs={filter.width || 4} className={classes.gridItem}>
                                        <FormLabel component="legend">{filter.label}</FormLabel>
                                        <Divider />
                                        <RangeSlider name={filter.name} type={filter.type} data={filter.data} handleFilter={handleFilter} />
                                    </Grid>
                                );
                            case 'dateRange':
                                return (
                                    <Grid key={`${filter.name}-${index}`} item xs={filter.width || 4} className={classes.gridItem}>
                                        <FormLabel component="legend">{filter.label}</FormLabel>
                                        <Divider />
                                        <DateRange name={filter.name} data={filter.data} handleFilter={handleFilter} />
                                    </Grid>
                                );
                            case 'chip':
                                return (
                                    <Grid key={`${filter.name}-${index}`} item xs={filter.width || 4} className={classes.gridItem}>
                                        <FormLabel component="legend">{filter.label}</FormLabel>
                                        <Divider />
                                        <ChipList name={filter.name} type={filter.type} data={filter.data} handleFilter={handleFilter} />
                                    </Grid>
                                );
                            case 'switch':
                                return (
                                    <Grid key={`${filter.name}-${index}`} item xs={filter.width || 4} className={classes.gridItem}>
                                        <FormLabel component="legend">{filter.label}</FormLabel>
                                        <Divider />
                                        <Switch name={filter.name} value={filter.data.value} handleFilter={handleFilter} />
                                    </Grid>
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