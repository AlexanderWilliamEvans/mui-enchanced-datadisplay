import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import IOSSlider from './Types/IOS';


const useStyles = makeStyles((theme) => ({
    rangeSlider: {
        marginTop: '2.5em'
    },
 }));
const RangeSlider = (props) => {
    const classes = useStyles();
    const [data, setData] = useState(props.data || []);
    const [values, setValues] = useState(props.data.values || null);
    const ratingMarks = [{value: 1, label: '1'}, {value: 2, label: '2'}, { value: 3, label: '3'}, {value: 4, label: '4'}];

    const ratingsRangeText = (value) => {
        return `${value}`;
    }

    const filterRange = (event, values, type) => {
        const { name, value } = event.target;
        debugger;
            setValues(values);
            const data = {name: 'rating', active: true, filter: {min: values[0], max: values[1]}};
           /* let newState = [...activeFilters];
            newState[1] = data;
            props.setActiveFilters(newState);*/
    };

    useEffect(() => {
        if(ratingMarks === null && values !== null) {

        }
    }, [values, ratingMarks]);

    return (
       <Fragment>
        <IOSSlider
                        className={classes.rangeSlider}
                        valueLabelDisplay="on"
                        value={values}
                        marks={ratingMarks}
                        min={values[0]}
                        max={values[1]}
                        onChange={(e, values) => filterRange(e, values, 'rating')}
                        aria-labelledby="range-slider"
                        getAriaValueText={(e) => ratingsRangeText(e)}
                    />
       </Fragment>
    );
    
};
export default RangeSlider;