import React from "react";
import {
     makeStyles,
    Theme,
    createStyles,
    Button,
    Popover,
    List,
    ListItem,
    ListItemIcon,
    
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

type props = {
    label?: string;
    color?: string;
};
const useStyles = makeStyles((theme: Theme) => createStyles({
    button: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
    },
    input: {
        visibility: "hidden"
    }
}));

const CreateButton = (props: props) => {

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return (
        <React.Fragment>
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleClick}
                startIcon={<EditIcon />}
            >
                {props.label || "Create Sheets"}
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <p>test</p>
            </Popover>
        </React.Fragment>
    );
};
export default CreateButton;