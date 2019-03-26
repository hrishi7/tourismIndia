import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  Avatar,
  ListItemText,
  Button,
  withStyles
} from "@material-ui/core";
import numberToWords from "number-to-words";
import axios from "axios";

const styles = theme => ({
  avatar: {
    margin: 10,
    width: 90,
    height: 90
  },
  root: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: 370
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: 460
    },
    backgroundColor: theme.palette.background.paper
  },
  navbar: {
    background: "transparent",
    color: "black",
    boxShadow: "none"
  },
  tripDetails: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: 5,
      marginTop: 50
    },
    [theme.breakpoints.up("lg")]: {}
  },
  tripDetailsContent: {
    [theme.breakpoints.up("lg")]: {
      marginTop: 50,
      marginLeft: 150,
      marginRight: 150
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: 20
    }
  }
});

class TripDetails extends Component {
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
    const { classes } = this.props;
    let i,
      count1 = 0,
      count2 = 0;
    const { packages } = this.state;
    let DomesticTrip = [];
    let InternationalTrip = [];
    if (packages) {
      for (i = 0; i < packages.length; i++) {
        if (packages[i].country === "India" && count1 < 3) {
          let date1 = new Date(packages[i].endDate);
          let date2 = new Date(packages[i].startDate);
          let date1_ms = date1.getTime();
          let date2_ms = date2.getTime();
          let difference_ms = date2_ms - date1_ms;
          let days = Math.abs(difference_ms / 86400000);
          DomesticTrip[i] = (
            <ListItem>
              <Avatar
                src={packages[i].imagesUrl[0]}
                alt={packages[i].city}
                className={classes.avatar}
              />
              <ListItemText
                primary={packages[i].city}
                secondary={`Starting from  ₹${packages[i].tourCost}\\-`}
              />
              <ListItemText
                align="center"
                primary={`${numberToWords.toWords(days).toUpperCase()} NIGHT`}
              />
              <Button
                color="primary"
                href={`/ViewDetails/city/${packages[i].city}`}
                align="center"
              >
                View All
              </Button>
            </ListItem>
          );
          count1++;
        }
        if (packages[i].country !== "India" && count2 < 3) {
          let date1 = new Date(packages[i].endDate);
          let date2 = new Date(packages[i].startDate);
          let date1_ms = date1.getTime();
          let date2_ms = date2.getTime();
          let difference_ms = date2_ms - date1_ms;
          let days = Math.abs(difference_ms / 86400000);
          InternationalTrip[i] = (
            <ListItem>
              <Avatar
                src={packages[i].imagesUrl[0]}
                alt={packages[i].city}
                className={classes.avatar}
              />
              <ListItemText
                primary={packages[i].city}
                secondary={`Starting from  ₹${packages[i].tourCost}\\-`}
              />
              <ListItemText
                align="center"
                primary={`${numberToWords.toWords(days).toUpperCase()} NIGHT`}
              />
              <Button
                color="primary"
                href={`/ViewDetails/city/${packages[i].city}`}
                align="center"
              >
                View All
              </Button>
            </ListItem>
          );
          count2++;
        }
      }
    }
    return (
      <Grid item container lg={12} sm className={classes.tripDetailsContent}>
        <Grid item lg={5} sm className={classes.tripDetails}>
          <Paper>
            <br />
            <Typography variant="h4" align="center">
              Domestic Trip
            </Typography>
            <br />
            <List className={classes.root}>{DomesticTrip}</List>
          </Paper>
        </Grid>
        <Grid item lg={2} />
        <Grid
          item
          lg={5}
          sm
          className={classes.tripDetails}
          style={{ height: 550 }}
        >
          <Paper>
            <br />
            <Typography variant="h4" align="center">
              International Trip
            </Typography>
            <br />
            <List className={classes.root}>{InternationalTrip}</List>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

TripDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TripDetails);
