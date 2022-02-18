import React from 'react';
import { makeStyles, Container, Typography } from '@material-ui/core';
import Table  from "../tables/index";
import Querybar from '../querybar/Querybar';
import settings from './settings';
import {useSelector } from 'react-redux';
import allActions from '../../redux/actions/index';

enum tableTypes {
    basic = "basic",
    draggable = "draggable",
    mail = "mail",
};

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

const DraggableExample = () => {
    const classes = useStyles();
    const currentData = useSelector((state:any) => state.currentData)
    const [rows, setRows] = React.useState(currentData.data);
    const [data, setData] = React.useState(currentData.data);
    const headers = Object.keys(currentData.data[0]);
    debugger;
    const updateData = () => {
        return currentData.data;
    };

    const handleDelete = () =>{

    };

    React.useEffect(() => {
        console.log(rows);
    }, [rows]);

    return (
        <Container className={classes.container}>
            <Typography>A Simple Example</Typography>
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
                <Table
                title={"name"}
                type={tableTypes.draggable}
                headers={headers}
                data={rows}
                updateData={setRows} />
        </Container>
    );

};

export default DraggableExample;