import React, { useEffect, useState } from 'react';
import { makeStyles, Container, Typography } from '@material-ui/core';
import BasicTable from '../tables/BasicTable';
import Querybar from '../querybar/Querybar';
import settings from './settings';



const placeholder = 'Sök bland användare...';

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

    const [rows, setRows] = useState(settings.data);

    useEffect(() => {
        console.log(rows);
    }, [rows]);

    return (
        <Container className={classes.container}>
            <Typography>A Simple Example</Typography>
            <br />
            <Querybar
                sort={settings.sort}
                data={settings.data}
                filter={settings.filter}
                setData={setRows}
                placeholder={placeholder}
                useSort={true} />
            <BasicTable
                rows={rows}
                setRows={setRows} />
        </Container>
    );

};

export default BasicExample;