import React  from "react";
import { AppBar, makeStyles, Button, IconButton, Toolbar, Typography, MenuItem, Menu } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Router from "./Router";
import { Link, BrowserRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(3)
  },
  link: {
    textDecoration: 'none',
    color: 'white',
  },
  appbar: {
    //  minHeight: '8vh'
    padding: theme.spacing(1)
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {

  const classes = useStyles();

  const [loggedIn, setLoggedIn] = React.useState<boolean>(true);
  const [user, setUser] = React.useState<any>(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const visible = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    //setOpen(true);
  };

  const handleDrawerClose = () => {
    // setOpen(false);
  };

  const signOut = () => {
    setAnchorEl(null);
    //  setUser({ user: "", token: "", authenticated: false });
  };

  const handleExpandClick = (e:any) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {

  }, []);

  return (
    <BrowserRouter>
      <React.Fragment>
        {
          loggedIn ? (
            <div className={classes.root}>
              <AppBar position="static" className={classes.appbar}>
                <Toolbar>
                  <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                  </IconButton>
                  <Link to="/" className={classes.link}>
                    <Typography variant="h6">
                      Enhanced data display with Material UI
                    </Typography>
                  </Link>
                  <Typography variant="h6" className={classes.title}>
                  </Typography>
                  <div>
                    <Button
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="logga ut"
                      onClick={(e) => handleExpandClick(e)}
                      startIcon={<AccountCircle />}
                      endIcon={<ArrowDropDownIcon />}
                    >
                      test
                    </Button>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={visible}
                      onClose={() => handleClose()}
                    >
                      <MenuItem onClick={() => handleClose()}>
                        <Button
                          startIcon={<AccountCircle />}
                          color="inherit"
                          aria-label="om administrationspanelen"
                        >
                          Profil
                      </Button>
                      </MenuItem>
                      <MenuItem onClick={() => signOut()}>
                        <Button
                          startIcon={<ExitToAppIcon />}
                          color="inherit"
                          aria-label="om administrationspanelen"
                        >
                          Logga ut
                      </Button>
                      </MenuItem>
                    </Menu>
                  </div>
                </Toolbar>
              </AppBar>
            </div>
          )
            :
            (null)
        }
        <Router />
      </React.Fragment>
    </BrowserRouter>

  );
};
export default Navbar;