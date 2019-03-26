import React, { Component } from "react";
import {
  Grid,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  withStyles,
  Button
} from "@material-ui/core";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import numberToWords from "number-to-words";
import ReactToPrint from "react-to-print";

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
    minWidth: 500,
    width: 740,
    marginTop: 50,
    marginBottom: 50,
    align: "right"
  },
  navbar: {
    background: "transparent",
    boxShadow: "none"
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  receiptformat: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  receiptformatres: {
    [theme.breakpoints.up("lg")]: {
      display: "none"
    }
  }
});

class PaymentComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amt: "",
      pid: "",
      members: "",
      tourCost: "",
      discountCost: "",
      mobile: "",
      date: "",
      pdate: "",

      nama: "Amit Hazra",
      pesan: "asdfasdfadsf",
      tinggi: 595,
      lebar: 842,
      judul: "Lintang.pdf"
    };
    this.receipt = React.createRef();
  }

  componentDidMount() {
    const bid = this.props.match.params.id;
    axios.get(`/api/booklist/${bid}`).then(res => {
      axios
        .get(`/api/Package/PackageName/${res.data.packageName}`)
        .then(response => {
          axios
            .get(`/api/payment/${response.data._id}`)
            .then(paymentDetails => {
              this.setState({
                pid: paymentDetails.data._id,
                members: res.data.person.length,
                amt:
                  (response.data.tourCost - response.data.discountCost) *
                  res.data.person.length,
                tourCost: response.data.tourCost,
                discountCost: response.data.discountCost,
                date: res.data.date,
                pdate: paymentDetails.data.paymentDate
              });
            });
        });
    });
  }

  render() {
    const { classes, auth } = this.props;
    const {
      tourCost,
      discountCost,
      members,
      amt,
      date,
      pdate,
      pid
    } = this.state;
    const dateObj = new Date(date.toString());
    const date1 = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return (
      <div>
        <Grid
          container
          style={{
            justifyContent: "center",
            width: "100%",
            marginTop: 40,
            marginBottom: 60
          }}
          direction="vertical"
          className={classes.receiptformat}
        >
          <div
            style={{ width: 1000, alignItems: "center" }}
            id="receipt"
            ref={el => (this.componentRef = el)}
          >
            <Grid
              container
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginTop: 40,
                marginBottom: 60
              }}
              direction="vertical"
            >
              <Grid
                xs={10}
                item
                style={{ justifyContent: "center", marginBottom: 20 }}
              >
                <Typography variant="h4" align="center">
                  {pid !== ""
                    ? "Transaction Successful"
                    : "Transaction Failure"}
                </Typography>
                <br />
                <br />
                <hr />
              </Grid>
              <Grid xs={10} container item style={{ justifyContent: "center" }}>
                <Grid item xs={7} style={{ justifyContent: "center" }}>
                  <Typography variant="h4">
                    ABC Tourism India Pvt. Ltd.
                  </Typography>
                </Grid>
                <Grid item xs={3} style={{ justifyContent: "center" }}>
                  <Typography
                    align="right"
                    style={{ fontWeight: "bold", marginTop: 20 }}
                  >
                    Payment Receipt/Tour Ticket
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                xs={10}
                container
                item
                style={{ justifyContent: "center", marginTop: 30 }}
              >
                <Grid item xs={7} style={{ justifyContent: "center" }}>
                  <Typography align="left" style={{ fontWeight: "bold" }}>
                    Company Address:
                  </Typography>
                </Grid>
                <Grid item xs={3} style={{ justifyContent: "center" }}>
                  <Typography align="right" style={{ fontWeight: "bold" }}>
                    User Id:
                  </Typography>
                </Grid>
              </Grid>
              <Grid xs={10} container item style={{ justifyContent: "center" }}>
                <Grid item xs={7} style={{ justifyContent: "center" }}>
                  <Typography>
                    {" "}
                    Kh No 18/21, 19/25, 34/5, 6, 7/1 min, <br /> Salt Lake
                    Sector-v, Kolkata, West Bengal
                  </Typography>
                </Grid>
                <Grid item xs={3} style={{ justifyContent: "center" }}>
                  <Typography align="right">{auth.user.id}</Typography>
                </Grid>
              </Grid>
              <Grid
                xs={10}
                container
                item
                style={{ justifyContent: "center", marginTop: 30 }}
              >
                <Grid item xs={7} style={{ justifyContent: "center" }}>
                  <Typography align="left" style={{ fontWeight: "bold" }}>
                    Transaction Status:
                  </Typography>
                </Grid>
                <Grid item xs={3} style={{ justifyContent: "center" }}>
                  <Typography align="right" style={{ fontWeight: "bold" }}>
                    User Name:
                  </Typography>
                </Grid>
              </Grid>
              <Grid xs={10} container item style={{ justifyContent: "center" }}>
                <Grid item xs={7} style={{ justifyContent: "center" }}>
                  <Typography align="left">
                    {pid !== null ? "Payment Successful" : "Payment Failed"}
                  </Typography>
                </Grid>
                <Grid item xs={3} style={{ justifyContent: "center" }}>
                  <Typography align="right">{auth.user.name}</Typography>
                </Grid>
              </Grid>
              <Grid
                xs={10}
                container
                item
                style={{ justifyContent: "center", marginTop: 30 }}
              >
                <Grid item xs={7} style={{ justifyContent: "center" }} />
                <Grid item xs={3} style={{ justifyContent: "center" }}>
                  <Typography align="right" style={{ fontWeight: "bold" }}>
                    Email Id:
                  </Typography>
                </Grid>
              </Grid>
              <Grid xs={10} container item style={{ justifyContent: "center" }}>
                <Grid item xs={7} style={{ justifyContent: "center" }} />
                <Grid item xs={3} style={{ justifyContent: "center" }}>
                  <Typography align="right">{auth.user.email}</Typography>
                </Grid>
              </Grid>
              <Grid
                xs={10}
                container
                item
                style={{ justifyContent: "center", marginTop: 30 }}
              >
                <Grid item xs={7} style={{ justifyContent: "center" }}>
                  <Typography align="left" style={{ fontWeight: "bold" }}>
                    Transaction Id:
                  </Typography>
                </Grid>
                <Grid item xs={3} style={{ justifyContent: "center" }}>
                  <Typography align="right" style={{ fontWeight: "bold" }}>
                    Booking Id:
                  </Typography>
                </Grid>
              </Grid>
              <Grid xs={10} container item style={{ justifyContent: "center" }}>
                <Grid item xs={7} style={{ justifyContent: "center" }}>
                  <Typography align="left">{pid}</Typography>
                </Grid>
                <Grid item xs={3} style={{ justifyContent: "center" }}>
                  <Typography align="right">
                    {this.props.match.params.id}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                xs={10}
                container
                item
                style={{ justifyContent: "center", marginTop: 30 }}
              >
                <Grid item xs={7} style={{ justifyContent: "center" }}>
                  <Typography align="left" style={{ fontWeight: "bold" }}>
                    Payment Date:
                  </Typography>
                </Grid>
                <Grid item xs={3} style={{ justifyContent: "center" }}>
                  <Typography align="right" style={{ fontWeight: "bold" }}>
                    Booking Date:
                  </Typography>
                </Grid>
              </Grid>
              <Grid xs={10} container item style={{ justifyContent: "center" }}>
                <Grid item xs={7} style={{ justifyContent: "center" }}>
                  <Typography align="left">{pdate}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography align="right">{`${date1}/${month}/${year}`}</Typography>
                </Grid>
              </Grid>

              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      <Typography className={classes.secondaryHeading}>
                        Per Head Cost (Rs.)
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography className={classes.secondaryHeading}>
                        Discount Percentage (%)
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography className={classes.secondaryHeading}>
                        Discount Applicable Perhead
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography className={classes.secondaryHeading}>
                        Resultant Cost Per Head
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography className={classes.secondaryHeading}>
                        No. of Passengers
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="left">{tourCost}</TableCell>
                    <TableCell align="left">
                      {discountCost !== ""
                        ? Math.round((discountCost * 100) / tourCost)
                        : ""}
                    </TableCell>
                    <TableCell align="left">
                      {discountCost !== "" ? discountCost : ""}
                    </TableCell>
                    <TableCell align="left">
                      {discountCost !== "" ? tourCost - discountCost : tourCost}
                    </TableCell>
                    <TableCell align="left">{members}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Typography className={classes.secondaryHeading}>
                        Total Ammount
                      </Typography>
                    </TableCell>
                    <TableCell colSpan={3} />
                    <TableCell align="left">
                      <Typography
                        style={{ fontWeight: "bold" }}
                      >{`Rs. ${amt}`}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <br />
                      <Typography style={{ fontWeight: "bold" }}>
                        Amount in Words:
                      </Typography>

                      <Typography style={{ fontWeight: "bold" }}>
                        {amt !== ""
                          ? `${numberToWords
                              .toWords(amt)
                              .toUpperCase()} RUPEES ONLY`
                          : ""}
                      </Typography>
                    </TableCell>
                    <TableCell colSpan={3} />
                  </TableRow>
                  <TableRow align="right">
                    <TableCell colSpan={5} align="right">
                      <Typography style={{ fontWeight: "bold" }}>
                        For ABC Tourism India Pvt. Ltd.
                      </Typography>
                      <br />
                      <br />
                      <br />
                      <Typography style={{ fontWeight: "bold" }} align="right">
                        Authorized Signatory
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Grid item xs={10} style={{ justifyContent: "center" }}>
                <hr />
              </Grid>
            </Grid>
          </div>
          <Grid container item xs={10} style={{ justifyContent: "center" }}>
            <ReactToPrint
              trigger={() => (
                <Button color="primary" variant="contained">
                  <Typography variant="h6" style={{ color: "white" }}>
                    PRINT
                  </Typography>
                </Button>
              )}
              content={() => this.componentRef}
            />
          </Grid>
        </Grid>
        <Grid container className={classes.receiptformatres}>
          <Grid item container>
            <Grid
              container
              item
              xs={10}
              style={{
                justifyContent: "center",
                marginTop: 200,
                marginBottom: 100
              }}
              direction="vertical"
            >
              <Grid item xs={12}>
                <Typography align="center" variant="h4">
                  Transaction Successfull
                </Typography>
                <br />
              </Grid>
              <Grid item xs={12}>
                <Typography align="center" variant="h6">
                  Print The Receipt
                </Typography>
                <br />
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={4} />
                <Grid item xs={4}>
                  <ReactToPrint
                    trigger={() => (
                      <Button color="primary" variant="contained">
                        <Typography variant="h6" style={{ color: "white" }}>
                          PRINT
                        </Typography>
                      </Button>
                    )}
                    content={() => this.componentRef}
                  />
                  <br />
                  <br />
                  <br />
                </Grid>
                <Grid item xs={4} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

PaymentComplete.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withStyles(styles)(PaymentComplete));
