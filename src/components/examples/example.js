import React from 'react';
import { makeStyles, Container, Typography } from '@material-ui/core';
import BasicTable from './table/table';
import Querybar from '../querybar/Querybar';


const rows = [
    { name: 'John Doe', age: '23', year: '2010' },
    { name: 'Zach Johnson', age: '24', year: '2011' },
    { name: 'Coby Durant', age: '20', year: '2019' },
    { name: 'James Dean', age: '33', year: '2022' }];

const sort = [
    { name: 'Namn (Stigande)', order: 'Asc', value: 'string' },
    { name: 'Namn (Fallande)', order: 'Desc', type: 'string' },
    { name: 'Ålder (Stigande)', order: 'Asc' },
    { name: 'Ålder (Fallande)', order: 'Desc' },
];
const filter = [
    {name: 'Gender', label: 'Kön', type: 'radio', values: ['Man, Female, Other']},
    {name: 'Age', label: 'Ålder', type: 'range', values:[1,4]},
    {name: 'Created', label: 'Skapad', type: 'dateRange', values:[1,2]},
    {name: 'Categories', label:'Kategorier', type: 'select', values:[]}
];
const placeholder = 'Sök bland användare...';

const useStyles = makeStyles({
    container: {
        marginTop: '1em'
    },
    table: {
        minWidth: 650,
    },
});

const Example = () => {
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <Typography>Simple Example</Typography>
            <Querybar sort={sort} placeholder={placeholder} useSort={true}/>
            <BasicTable rows={rows} />
        </Container>
    );

};

export default Example;