import React, { Component } from "react";
import {
  Grid,
  Typography,
  Button,
  Paper,
  withStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ListItem,
  ListItemIcon,
  List,
  ListItemText,
  Divider
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";

// Components
import TermAndCondition from "../common/TermAndCondition";
import axios from "axios";
import Icon from "@material-ui/core/Icon";
import classNames from "classnames";
import { loadCSS } from "fg-loadcss/src/loadCSS";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  responsive: {
    flexGrow: 1,
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    [theme.breakpoints.up("lg")]: {
      display: "none"
    }
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    [theme.breakpoints.up("lg")]: {
      height: 160
    },
    [theme.breakpoints.down("sm")]: {
      height: 500
    }
  },
  table: {
    [theme.breakpoints.up("lg")]: {
      minWidth: 700
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: 250
    }
  },
  navbar: {
    background: "transparent",
    boxShadow: "none"
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  aboutoff: {
    [theme.breakpoints.down("sm")]: {
      marginTop: 20
    }
  }
});

class PackageDetails extends Component {
  constructor() {
    super();
    this.state = {
      pckg: {},
      time: 0,
      expanded: null,
      offer: {}
    };
  }

  componentDidMount() {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
      document.querySelector("#insertion-point-jss")
    );
    const string = this.props.match.params[0];
    axios
      .get(`/api/package/${string}`)
      .then(res => {
        const pckgs = res.data;
        this.setState({
          pckg: pckgs
        });
        axios
          .get(`/api/offer/${pckgs.packageName}`)
          .then(res => {
            const offer = res.data;
            this.setState({
              offer: offer
            });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      time: 1,
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { classes } = this.props;
    const { time, expanded, pckg, offer } = this.state;
    let pkg, offr, offrDetails, offrTable, amt;
    if (pckg !== null) {
      pkg = pckg;
    }
    if (offer !== null) {
      offr = offer;
      amt = pkg.tourCost - pkg.tourCost * (offr.offerPercent / 100);
      offrDetails = (
        <Typography variant="subtitle1">
          Offers Available. Check on the following section.
        </Typography>
      );
      offrTable = (
        <Grid
          container
          spacing={24}
          direction="vertical"
          style={{ margin: 30 }}
        >
          <Grid item xs={12}>
            <Typography
              variant="h4"
              style={{ fontWeight: "bold", textAlign: "center" }}
            >
              About The Offer
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography className={classes.secondaryHeading}>
                        Original Cost (Rs.)
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography className={classes.secondaryHeading}>
                        Discount Percentage (%)
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography className={classes.secondaryHeading}>
                        Validity Starts on
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography className={classes.secondaryHeading}>
                        Validity Ends on
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">{offr.originalCost}</TableCell>
                    <TableCell align="center">{offr.offerPercent}</TableCell>
                    <TableCell align="center">
                      {offr.offerValidityStartOn}
                    </TableCell>
                    <TableCell align="center">
                      {offr.offerValidityEndOn}
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography className={classes.secondaryHeading}>
                        Original Tour Cost (Rs.)
                      </Typography>
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      <Typography className={classes.secondaryHeading}>
                        Discount Percentage (%)
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography className={classes.secondaryHeading}>
                        After Discount, Tour Cost (Rs.)
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">{pkg.tourCost}</TableCell>
                    <TableCell align="center" colSpan={2}>
                      {offr.offerPercent}
                    </TableCell>
                    <TableCell align="center">
                      {`${pkg.tourCost} - {${pkg.tourCost} * (${
                        offr.offerPercent
                      } / 100)} = ${amt}`}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.responsive}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography className={classes.secondaryHeading}>
                        Original Cost (Rs.)
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">{offr.originalCost}</TableCell>
                  </TableRow>
                </TableBody>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography className={classes.secondaryHeading}>
                        Discount Percentage (%)
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">{offr.offerPercent}</TableCell>
                  </TableRow>
                </TableBody>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography className={classes.secondaryHeading}>
                        Validity Starts on
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">
                      {offr.offerValidityStartOn}
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography className={classes.secondaryHeading}>
                        Validity Ends on
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">
                      {offr.offerValidityEndOn}
                    </TableCell>
                  </TableRow>
                </TableBody>

                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography className={classes.secondaryHeading}>
                        Original Tour Cost (Rs.)
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">{pkg.tourCost}</TableCell>
                  </TableRow>
                </TableBody>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={2}>
                      <Typography className={classes.secondaryHeading}>
                        Discount Percentage (%)
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={2}>
                      {offr.offerPercent}
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography className={classes.secondaryHeading}>
                        After Discount, Tour Cost (Rs.)
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">
                      {`${pkg.tourCost} - {${pkg.tourCost} * (${
                        offr.offerPercent
                      } / 100)} = ${amt}`}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      );
    } else {
      amt = pkg.tourCost;
      offrDetails = (
        <Typography variant="subtitle1">
          There are no Special Offers Available.
        </Typography>
      );
      offrTable = (
        <Grid
          container
          spacing={24}
          direction="vertical"
          style={{ margin: 30 }}
        >
          <Grid item xs={12}>
            <Typography
              variant="h4"
              style={{ fontWeight: "bold", textAlign: "center" }}
            >
              About The Tour
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography className={classes.secondaryHeading}>
                        Original Tour Cost (Rs.)
                      </Typography>
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      <Typography className={classes.secondaryHeading}>
                        Discount Percentage (%)
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography className={classes.secondaryHeading}>
                        After Discount, Tour Cost (Rs.)
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">{pkg.tourCost}</TableCell>
                    <TableCell align="center" colSpan={2}>
                      0
                    </TableCell>
                    <TableCell align="center">{pkg.tourCost}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
            <Paper className={classes.responsive}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography className={classes.secondaryHeading}>
                        Original Tour Cost (Rs.)
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">{pkg.tourCost}</TableCell>
                  </TableRow>
                </TableBody>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography className={classes.secondaryHeading}>
                        Discount Percentage (%)
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">0</TableCell>
                  </TableRow>
                </TableBody>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography className={classes.secondaryHeading}>
                        After Discount, Tour Cost (Rs.)
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">{pkg.tourCost}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      );
    }
    const Image = pkg.imagesUrl;
    return (
      <Grid container>
        <Grid
          container
          xs={12}
          style={{
            backgroundImage: `url("${Image}")`,
            height: 500,
            backgroundRepeat: "no-repeat",
            backgroundSize: "1550px 500px",
            display: "block"
          }}
        >
          <Grid container>
            <Grid item lg={10} xs={8} style={{ marginTop: "40px" }} />
            <Grid item lg={2} xs={2} style={{ marginTop: "40px" }}>
              <Button
                variant="contained"
                color="secondary"
                href={`/BookPackageForm/${pkg._id}`}
                style={{ position: "fixed" }}
              >
                Book Now
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            style={{ justifyContent: "center", marginTop: 350 }}
          >
            <Typography
              variant="h2"
              style={{ fontWeight: "bold", color: "white" }}
            >
              {pkg.packageName}
            </Typography>
          </Grid>
        </Grid>
        <Grid container style={{ margin: 20 }}>
          <Grid item container lg={8} direction="vertical" spacing={24}>
            <Grid item style={{ marginLeft: 20, marginRight: 20 }}>
              <Paper className={classes.paper}>
                <Typography
                  variant="h4"
                  style={{ fontWeight: "bold", textAlign: "center" }}
                >
                  Overview
                </Typography>
                <Typography variant="subtitle1" style={{ marginTop: 20 }}>
                  {pkg.overview}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Grid
            container
            item
            lg={4}
            direction="column"
            className={classes.aboutoff}
          >
            <Grid item>
              <ExpansionPanel
                expanded={expanded === "panel1" || time === 0}
                onChange={this.handleChange("panel1")}
              >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.secondaryHeading}>
                    Special Offer
                  </Typography>
                </ExpansionPanelSummary>
                <hr />
                <ExpansionPanelDetails>{offrDetails}</ExpansionPanelDetails>
              </ExpansionPanel>
            </Grid>
            <Grid item>
              <ExpansionPanel
                expanded={expanded === "panel2"}
                onChange={this.handleChange("panel2")}
              >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.secondaryHeading}>
                    Capacity
                  </Typography>
                </ExpansionPanelSummary>
                <hr />
                <ExpansionPanelDetails>
                  <Typography variant="subtitle1">
                    {`We have total capacity ${
                      pkg.capacity
                    } to make this tour.`}
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Grid>
          </Grid>
        </Grid>
        {offrTable}
        <Grid container spacing={24} style={{ margin: 30 }}>
          <Grid item xs>
            <Paper style={{ height: 190 }}>
              <Typography
                variant="h4"
                align="center"
                style={{ fontWeight: "bold" }}
              >
                Package Details
              </Typography>
              <List component="nav">
                <ListItem>
                  <ListItemIcon>
                    <Icon
                      className={classNames("fal fa-calendar-alt")}
                      style={{ size: "3px" }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Start Date"
                    secondary={pkg.startDate}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Icon
                      className={classNames("fal fa-calendar-alt")}
                      style={{ size: "3px" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="End Date" secondary={pkg.endDate} />
                </ListItem>
              </List>
              <Divider />
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper style={{ height: 190 }}>
              <Typography
                variant="h4"
                align="center"
                style={{ fontWeight: "bold" }}
              >
                Facilities
              </Typography>
              <List component="nav">
                <ListItem button>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText />
                </ListItem>
              </List>
              <Divider />
            </Paper>
          </Grid>
        </Grid>
        <Grid container style={{ margin: 40 }}>
          <TermAndCondition />
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(PackageDetails));
