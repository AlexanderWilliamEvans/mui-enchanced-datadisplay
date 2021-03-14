import React, { Fragment, useState, useEffect, ChangeEvent } from "react";
import { makeStyles, Theme, createStyles, Grid, Input } from "@material-ui/core";
import CustomSlider from "./CustomSlider";
import { RangeSliderTypes } from "../../../types/RangeSlider.types";

const useStyles = makeStyles((theme: Theme) => createStyles({
    rangeSlider: {
        marginTop: '2.5em'
    },
    input: {
        width: 42,
    },
}));

interface IMark {
    value: number,
    label: string
};

const RangeSlider = (props: RangeSliderTypes) => {
    const classes = useStyles();
    const [data, setData] = useState(props.data || []);
    const range = props.data.values || null;
    const type = props.type || 'range';
    const name = props.name || '';
    const useInputs = props.useInputs || true;
    const [values, setValues] = useState(props.data.values || null);
    const [ratingMarks, setRatingMarks] = useState<IMark[]>([]);

    const ratingsRangeText = (value: any) => {
        return `${value}`;
    };

    const handleFilter = (vals: number | Array<number>) => {
        if (Array.isArray(vals)) {
            setValues(vals);
            const query = { filter: { start: vals[0], end: vals[1] }, type, name }
            props.handleFilter(query, 'filter');
        }
    };
    const handleInputChange = (event:ChangeEvent) => {
       // setValue(event.target.value === '' ? '' : Number(event.target.value));
      };
    
      const handleBlur = () => {
      /*  if (value < 0) {
          setValues(0);
        } else if (value > 100) {
          setValues(100);
        }*/
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
            {
                useInputs ? (
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Input
                                className={classes.input}
                                value={values[0]}
                                margin="dense"
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                inputProps={{
                                    step: 10,
                                    min: 0,
                                    max: 100,
                                    type: 'number',
                                    'aria-labelledby': 'input-slider',
                                }}
                            />
                        </Grid>
                        <Grid item xs>
                            <CustomSlider
                                className={classes.rangeSlider}
                                valueLabelDisplay="on"
                                value={values}
                                marks={ratingMarks}
                                min={range[0]}
                                max={range[1]}
                                onChange={(e, values) => handleFilter(values)}
                                aria-labelledby="range-slider"
                                getAriaValueText={(e) => ratingsRangeText(e)}
                            />
                        </Grid>
                        <Grid item>
                            <Input
                                className={classes.input}
                                value={values[0]}
                                margin="dense"
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                inputProps={{
                                    step: 10,
                                    min: 0,
                                    max: 100,
                                    type: 'number',
                                    'aria-labelledby': 'input-slider',
                                }}
                            />
                        </Grid>
                    </Grid>
                ) :
                    (
                        <CustomSlider
                            className={classes.rangeSlider}
                            valueLabelDisplay="on"
                            value={values}
                            marks={ratingMarks}
                            min={range[0]}
                            max={range[1]}
                            onChange={(e, values) => handleFilter(values)}
                            aria-labelledby="range-slider"
                            getAriaValueText={(e) => ratingsRangeText(e)}
                        />
                    )
            }
        </Fragment>
    );

};
export default RangeSlider;