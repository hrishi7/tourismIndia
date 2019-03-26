import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import PackageList from "../packages/PackageList";

const styles = theme => ({
  about: {
    paddingRight: "73px",
    fontFamily: "modern",
    paddingTop: "20px",
    paddingBottom: "50px",

    [theme.breakpoints.up("lg")]: {
      marginLeft: 170,
      paddingLeft: "70px"
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      paddingLeft: "40px"
    }
  },
  welcome: {
    fontFamily: "modern",

    paddingTop: 30,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: "70px"
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0px"
    }
  }
});

class ViewDetails extends Component {
  constructor() {
    super();
    this.state = {
      packages: []
    };
  }
  componentDidMount() {
    const string = this.props.match.params[0];
    axios
      .get(`/api/package/:${string}`)
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
    const { packages } = this.state;
    let text;
    let PackageListContent;
    if (packages !== null && packages.length > 0) {
      text = packages[0].city;
      PackageListContent = <PackageList pckgs={packages} />;
    }
    return (
      <Grid container direction="vertical" style={{ marginBottom: 40 }}>
        <Grid item xs={12}>
          <br />
          <Typography variant="h2" align="center" className={classes.welcome}>
            WELCOME TO {text}
          </Typography>
          <Typography className={classes.about} variant="h4">
            Let see the list of our packages...
          </Typography>
        </Grid>
        {PackageListContent}
      </Grid>
    );
  }
}

ViewDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewDetails);
