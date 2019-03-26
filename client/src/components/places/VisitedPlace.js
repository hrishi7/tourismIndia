import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Card,
  Grid,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button
} from "@material-ui/core";
import Spinner from "../common/Spinner";
import axios from "axios";

const styles = theme => ({
  avatar: {
    margin: 10,
    width: 90,
    height: 90
  },
  root: {
    width: "100%",
    maxWidth: 450,
    backgroundColor: theme.palette.background.paper
  },
  navbar: {
    background: "transparent",
    color: "black",
    boxShadow: "none"
  },
  card: {
    [theme.breakpoints.up("lg")]: {
      maxWidth: 400,
      margin: 10
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: 300,
      marginTop: 30
    }
  },
  button: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "100px",
      height: "40px"
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: "150px",
      height: 40
    }
  },
  cardsContent: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: 40
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: "auto"
    }
  },
  media: {
    height: 140
  },
  about: {
    paddingLeft: "70px",
    paddingRight: "30px",
    fontFamily: "modern",
    paddingTop: "50px",
    paddingBottom: "50px"
  }
});

class VisitedPlace extends Component {
  constructor() {
    super();
    this.state = {
      packages: []
    };
  }
  componentDidMount() {
    axios
      .get("/api/package")
      .then(res => {
        const pckgs = res.data;
        this.setState({
          packages: pckgs
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    let VisitedPlaceContent;
    const { classes } = this.props;
    const { packages } = this.state;
    let Cards01 = [],
      Cards02 = [];
    let Cards1 = [];
    let pckgs = [];
    if (packages.length <= 0) {
      VisitedPlaceContent = <Spinner />;
    } else {
      let i, count;
      i = 0;
      count = 0;
      while (count < 6) {
        let f = 0;
        for (let j = 0; j < pckgs.length; j++) {
          if (packages[i].city === pckgs[j].city) {
            f = 1;
          }
        }
        if (f !== 1) {
          pckgs[count] = packages[i];
          count++;
        }
        i++;
      }

      for (let i = 0; i < 3; i++) {
        Cards01[i] = (
          <Grid item className={classes.cardsContent}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={pckgs[i].imagesUrl[0]}
                  title={pckgs[i].city}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    align="center"
                  >
                    {pckgs[i].city}
                  </Typography>
                  <Typography component="p">{pckgs[i].overview}</Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="secondary"
                  variant="contained"
                  href={`/ViewDetails/city/${pckgs[i].city}`}
                  className={classes.button}
                >
                  Visit Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      }

      for (let i = 3; i < 6; i++) {
        Cards02[i] = (
          <Grid item className={classes.cardsContent}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={pckgs[i].imagesUrl[0]}
                  title={pckgs[i].city}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    align="center"
                  >
                    {pckgs[i].city}
                  </Typography>
                  <Typography component="p">{pckgs[i].overview}</Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="secondary"
                  variant="contained"
                  className={classes.button}
                  href={`/ViewDetails/city/${pckgs[i].city}`}
                >
                  Visit Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      }

      VisitedPlaceContent = (
        <Grid container direction="vertical">
          <Grid item container lg={12}>
            <Grid item container lg />
            {Cards01}
            <Grid item container lg />
          </Grid>
          <Grid item container lg={12}>
            <Grid item container lg />
            {Cards02}
            <Grid item container lg />
          </Grid>
          <Grid item container xs={12}>
            {Cards1}
          </Grid>
        </Grid>
      );
    }
    return <div>{VisitedPlaceContent}</div>;
  }
}

VisitedPlace.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(VisitedPlace);
