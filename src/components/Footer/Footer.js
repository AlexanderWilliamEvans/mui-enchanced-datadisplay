import React from 'react';
import { ButtonGroup, makeStyles, Typography, IconButton } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import GitHubIcon from '@material-ui/icons/GitHub';


const useStyles = makeStyles((theme) => ({
    footer: {
        margin: 0,
        marginTop: theme.spacing(2),
        padding: theme.spacing(1),
        backgroundColor: 'black',
        color: 'white',
        height: '50px',
        bottom: 0,
        left: 0,
    },
    ButtonGroup: {
        float: 'right',
        marginRight: theme.spacing(4)
    },
    footerIcon: {
        color: 'white'
    },
    copyright: {
        float: 'left'
    }
})
);

const Footer = () => {
    const classes = useStyles();
    return (
        <div className={classes.footer}>
            <Typography className={classes.copyright} variant="body2">This is some content in sticky footer</Typography>
            <ButtonGroup variant="outlined" className={classes.ButtonGroup}>
                <IconButton className={classes.footerIcon} aria-label="add to shopping cart">
                    <MailIcon />
                </IconButton>
                <IconButton className={classes.footerIcon} aria-label="add to shopping cart">
                    <GitHubIcon />
                </IconButton>
            </ButtonGroup>
        </div>
    );
};
export default Footer;