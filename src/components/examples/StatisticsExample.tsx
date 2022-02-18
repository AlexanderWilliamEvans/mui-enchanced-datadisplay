import React, { useEffect, useState } from 'react';
import { makeStyles, Container, Typography, Grid } from '@material-ui/core';
import Querybar from '../querybar/Querybar';
import { useSelector } from 'react-redux';
import allActions from '../../redux/actions/index';
import BasicPieChart from '../statistics/charts/piechart/simple';
import BasicBarChart from "../statistics/charts/barchart/simple";
import ImportButton from "../datahandler/import/importButton";
import ExportButton from "../datahandler/export/exportButton";
import CreateButton from "../datahandler/create/createButton";

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
    const updateData = () => {
        return currentData.data;
    };

    const handleDelete = () => {

    };

    const pieChartProps = {
        label: "Test Example",
        data: [
            { name: "Group A", value: 400, color: "#0088FE" },
            { name: "Group B", value: 300, color: "#00C49F" },
            { name: "Group C", value: 300, color: "#FFBB28" },
            { name: "Group D", value: 200, color: "#FF8042" },
        ]
    };

    const lineChartProps = {
        label: "GDP (PPP) per capita in 1990 International Dollars",
        data: [
            {
                country: "Austria",
                value: 425,
            },
            {
                country: "Belgium",
                value: 450,
            },
            {
                country: "Denmark",
                value: 400,
            }
        ]
    }

    useEffect(() => {

    }, [rows]);

    return (
        <Container className={classes.container}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <ImportButton />
                </Grid>
                <Grid item xs={4}>
                    <ExportButton />
                </Grid>
                <Grid item xs={4}>
                    <CreateButton />
                </Grid>
                <Grid xs={12}>
                    <BasicPieChart {...pieChartProps} />
                </Grid>
                {/* <Grid item xs={6}>
                    <BasicBarChart />
                </Grid> */}
            </Grid>
        </Container>
    );

};

export default BasicExample;