import React, { useEffect, useState } from 'react';
import { makeStyles, Container, Typography, Grid } from '@material-ui/core';
import Querybar from '../querybar/Querybar';
import { useSelector } from 'react-redux';
import allActions from '../../redux/actions/index';
import { Simple as SimplePieChart } from '../statistics/charts/piechart/simple';
import { Simple as SimpleBarChart } from "../statistics/charts/barchart/simple";
import ImportButton from "../datahandler/import/importButton";
import ExportButton from "../datahandler/export/exportButton";

const placeholder = 'Search...';

const useStyles = makeStyles({
    container: {
        marginTop: '1em',
        minHeight: '82vh'
    },
    table: {
        minWidth: 650,
    },
});

const BasicExample = () => {
    const classes = useStyles();
    const currentData = useSelector((state: any) => state.currentData)
    const [rows, setRows] = useState(currentData.data);
    const [data, setData] = useState(currentData.data);
    debugger;
    const updateData = () => {
        return currentData.data;
    };

    const handleDelete = () => {

    };

    useEffect(() => {

    }, [rows]);

    return (
        <Container className={classes.container}>
            <Typography>Statistics Example</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ImportButton />
                </Grid>
                <Grid item xs={6}>
                    <ExportButton />
                    <SimplePieChart />
                </Grid>
                <Grid item xs={6}>
                    <SimpleBarChart />
                </Grid>
            </Grid>
        </Container>
    );

};

export default BasicExample;