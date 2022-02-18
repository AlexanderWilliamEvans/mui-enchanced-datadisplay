import React, { useEffect, useState } from 'react';
import { makeStyles, Container, Typography } from '@material-ui/core';
import EditableTable from '../tables/EditableTable';
import Querybar from '../querybar/Querybar';
import settings from './settings';
import {useSelector } from 'react-redux';
import allActions from '../../redux/actions/index';


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
    const currentData = useSelector((state:any) => state.currentData)
    const [rows, setRows] = useState(currentData.data);
    const [data, setData] = useState(currentData.data);
    debugger;
    const updateData = () => {
        return currentData.data;
    };

    const handleDelete = () =>{

    };

    useEffect(() => {
        console.log(rows);
    }, [rows]);

    return (
        <Container className={classes.container}>
            <Typography>Editable Example</Typography>
            <br />
            <Querybar
                headers={settings.headers}
                sort={settings.sort}
                data={data}
                updateData={updateData}
                filters={settings.filters}
                setData={setRows}
                placeholder={placeholder}
                useSort={settings.useSort || true} 
                showSearchResultText={settings.showSearchResultText || true}
                showDelete={true}
                handleDelete={handleDelete}
                />
           <EditableTable
             title={"name"}
             headers={Object.keys(currentData.data[0])}
             rows={rows}
           />
        </Container>
    );

};

export default BasicExample;