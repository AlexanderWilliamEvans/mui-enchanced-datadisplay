import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '../../../redux/actions/index';
import { makeStyles, Theme, Container, Typography, Grid } from '@material-ui/core';
import CardLink from './CardLink';
import api from '../../../api';
import { RootState } from "../../../redux/reducers/index";
import Settings from "./settings.json";
import "./style.css";

const useStyles = makeStyles((theme:Theme) => ({
    root: {
        marginTop: '3em',
        backgroundColor: 'white',
        padding: '1em',
    },
    container: {
     
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        margin: theme.spacing(1)
    },
    gridListContainer: {
        padding: 0,
        margin: 0,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: 'black'
    },
    gridListTile: {
        padding: 0,
        margin: 0,
        width: '50% !important',
        height: '50% !important'
    },
    gridListCard: {
        padding: 0,
        margin: 0,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

const Home = () => {

    const classes = useStyles();
    const cardImg = require('./test.png').default;
    const links = [
        { title: 'Simple Table', description: 'A simple table with filter and sort functionality', img: cardImg, link:"/basicexample"},
        { title: 'Editable table', description: 'A table with standard functions and with editable rows and columns', img: cardImg, link:"/EditableExample"},
        { title: 'Custom mail', description: 'A table suitable for an application with custom mail functionality', img: cardImg, link:"/basicexample" },
        { title: 'Draggable Table', description: 'A draggable table with crud functionality', img: cardImg, link:"/draggableexample"},
        { title:'Map application', description: 'An example on how table can be used in map applications', img: cardImg, link:"/basicexample" },
        { title: 'table with statistics', description: 'A table with charts and statistical tools', img: cardImg, link:"/statisticsexample"}
    ];
   const data = useSelector((state:RootState) => { 
       return state.currentData; 
    });

    const dispatch = useDispatch();

    const getData = React.useCallback(async() => {
        const data = await api.getData();
        if(data) {
            dispatch(allActions.dataActions.setData(data));
        }
    }, [dispatch]);

    React.useEffect(() => {       
        getData();
    }, [getData]);
    return (
        <Container className={classes.container}>
            <Typography variant="h4">Exempel</Typography>
            <Grid container spacing={3} className={classes.container}>
                {
                    links.map((link) => {
                        return (
                            <Grid item xs={6}>
                                <CardLink link={link} />
                            </Grid>
                        )
                    })
                }

            </Grid>
        </Container>
    );
};
export default Home;