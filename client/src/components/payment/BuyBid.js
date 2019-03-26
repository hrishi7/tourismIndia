import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  withStyles
} from "@material-ui/core";
import axios from "axios";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    height: 160
  },
  table: {
    [theme.breakpoints.up("lg")]: {
      minWidth: 700
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: 200
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
  paymentdet: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  paymentdetres: {
    [theme.breakpoints.up("lg")]: {
      display: "none"
    }
  }
});

class BuyBid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amt: "",
      pid: "",
      members: "",
      tourCost: "",
      discountCost: "",
      mobile: ""
    };
  }

  componentDidMount() {
    const bid = this.props.match.params.id;
    axios.get(`/api/booklist/${bid}`).then(res => {
      axios
        .get(`/api/Package/PackageName/${res.data.packageName}`)
        .then(response => {
          this.setState({
            pid: response.data._id,
            members: res.data.person.length,
            amt:
              (response.data.tourCost - response.data.discountCost) *
              res.data.person.length,
            tourCost: response.data.tourCost,
            discountCost: response.data.discountCost
          });
        });
    });
  }

  onBuyNowClick = () => {
    const { user } = this.props.auth;
    const bid = this.props.match.params.id;

    const data = {
      purpose: "Tour Package Payment",
      amount: this.state.amt,
      buyer_name: user.name,
      email: user.email,
      phone: "9093079136",
      //user_id: user.id,
      redirect_url: `http://localhost:5000/api/payment/callback/${
        this.state.amt
      }/${this.state.pid}/${user.email}/${bid}`,
      webhook_url: "/webhook/"
    };

    axios
      .post("/api/payment", data)
      .then(res => {
        console.log("resp", res.data);
        window.location.href = res.data;
      })
      .catch(error => console.log(error.response.data));
  };
  render() {
    //const { user } = this.props.auth;
    const { classes } = this.props;
    const { tourCost, discountCost, members, amt } = this.state;
    return (
      <div>
        <Grid
          container
          style={{
            justifyContent: "center",
            width: "100%",
            marginBottom: 80
          }}
        >
          <Grid container item lg={12} xs={12} style={{ marginTop: 80 }}>
            <Grid item lg={4} xs={3} />
            <Grid item lg={4} xs={4}>
              <Typography variant="h2">Payment Details</Typography>
            </Grid>
            <Grid item lg={4} xs={5} />
          </Grid>
          <Grid
            container
            item
            xs={10}
            direction="vertical"
            style={{ marginTop: 20 }}
            className
          >
            <Grid container item className={classes.paymentdet}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography className={classes.secondaryHeading}>
                        Per Head Cost (Rs.)
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography className={classes.secondaryHeading}>
                        Discount Percentage (%)
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography className={classes.secondaryHeading}>
                        Discount Applicable Perhead
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography className={classes.secondaryHeading}>
                        Resultant Cost Per Head
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography className={classes.secondaryHeading}>
                        No. of Passengers
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">{tourCost}</TableCell>
                    <TableCell align="center">
                      {discountCost !== ""
                        ? Math.round((discountCost * 100) / tourCost)
                        : ""}
                    </TableCell>
                    <TableCell align="center">
                      {discountCost !== "" ? discountCost : ""}
                    </TableCell>
                    <TableCell align="center">
                      {discountCost !== "" ? tourCost - discountCost : tourCost}
                    </TableCell>
                    <TableCell align="center">{members}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">
                      <Typography style={{ fontWeight: "bold" }}>
                        Total Ammount
                      </Typography>
                    </TableCell>
                    <TableCell colSpan={3} />
                    <TableCell align="center">
                      <Typography style={{ fontWeight: "bold" }}>
                        {`Rs. ${amt}`}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
            <Grid container item className={classes.paymentdetres}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography className={classes.secondaryHeading}>
                        Per Head Cost (Rs.)
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography className={classes.secondaryHeading}>
                        Discount Percentage (%)
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">{tourCost}</TableCell>
                    <TableCell align="center">
                      {discountCost !== ""
                        ? Math.round((discountCost * 100) / tourCost)
                        : ""}
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography className={classes.secondaryHeading}>
                        Discount Applicable Perhead
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography className={classes.secondaryHeading}>
                        Resultant Cost Per Head
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">
                      {discountCost !== "" ? discountCost : ""}
                    </TableCell>
                    <TableCell align="center">
                      {discountCost !== "" ? tourCost - discountCost : tourCost}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">
                      <Typography>Passengers</Typography>
                    </TableCell>
                    <TableCell align="center">{members}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">
                      <Typography style={{ fontWeight: "bold" }}>
                        Total Ammount
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography style={{ fontWeight: "bold" }}>
                        {`Rs. ${amt}`}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>

            <Grid
              container
              item
              style={{ justifyContent: "center", marginTop: 50 }}
            >
              <Button
                style={{ background: "#34454d", color: "white" }}
                variant="contained"
                onClick={this.onBuyNowClick}
              >
                Payment Online
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

BuyBid.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withStyles(styles)(BuyBid));
