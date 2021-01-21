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
    const [range, setRange] = useState(props.data.values || null);
    const [values, setValues] = useState(props.data.values || null);
    const [label, setLabel] = useState(props.label || '');
    const [type, setType] = useState(props.type || 'range');
    const [name, setName] = useState(props.name || '');
    const [ratingMarks, setRatingMarks] = useState(null);

    const ratingsRangeText = (value) => {
        return `${value}`;
    };

    const handleFilter = (e, vals) => {
        setValues(vals);
        const query = { filter: { start: vals[0], end: vals[1] }, type, name }
        props.handleFilter(query, 'filter');
    };

    useEffect(() => {

        if (ratingMarks === null && range !== null) {
            const numberOfMarks = 5;
            const mod = Math.round(range[1] / numberOfMarks);
            let marks = [];
            for (let i = range[0]; i <= numberOfMarks; i++) {
                const mark = mod * i;
                    marks.push({ value: mark, label: mark.toString() });
            }
            setRatingMarks(marks);
        }
    }, [values, ratingMarks, range]);

    return (
        <Fragment>
            <IOSSlider
                className={classes.rangeSlider}
                valueLabelDisplay="on"
                value={values}
                marks={ratingMarks}
                min={range[0]}
                max={range[1]}
                onChange={(e, values) => handleFilter(e, values)}
                aria-labelledby="range-slider"
                getAriaValueText={(e) => ratingsRangeText(e)}
            />
        </Fragment>
    );

};
export default RangeSlider;