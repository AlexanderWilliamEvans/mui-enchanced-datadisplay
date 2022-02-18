import React from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    linkButton: {
     // backgroundColor: theme.palette.primary;
    },
    link: {
      textDecoration: 'none',
      fontWeight: 'bold'
    },
    linkIcon: {
      color: "white",
    },
  }),
);

const CardLink = (props: any) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={props.link.img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.link.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.link.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small"  color="primary"  endIcon={<LaunchIcon  color="primary" />} className={classes.linkButton}>
          <Link className={classes.link} to={props.link.link} >
            Learn More
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardLink;