import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Grid,
  Typography,
  TextField,
  Button
} from "@material-ui/core";
import axios from "axios";
import { validateBookingInput } from "../../validation/booking";

const styles = theme => ({
  navbar: {
    background: "transparent",
    color: "black",
    boxShadow: "none"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  button: {
    marginTop: 15,
    height: 50,
    [theme.breakpoints.up("lg")]: {
      marginLeft: 500,
      width: 540
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 30,
      width: 300
    }
  },
  formContents: {
    [theme.breakpoints.up("lg")]: {
      marginLeft: 50
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 30,
      width: 300
    }
  },
  formContentroot: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  formContentrootresponsive: {
    [theme.breakpoints.up("lg")]: {
      display: "none"
    }
  },
  input: {
    display: "none"
  },
  nextButton: {
    [theme.breakpoints.up("lg")]: {
      marginTop: 50,
      marginLeft: 10
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 100
    }
  }
});

class PaymentForm extends Component {
  constructor() {
    super();
    this.state = {
      members: "",
      packageName: "",
      capacity: "",
      bookingDetails: [
        {
          name: "",
          address: "",
          mobile: "",
          aadharImage: ""
        }
      ],
      errors: {
        capacity: ""
      },
      bookingError: []
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    let bookingDetails = [];
    let bookingError = [];

    for (let i = 0; i < this.state.members; i++) {
      bookingDetails[i] = this.state.bookingDetails[i];
    }

    bookingDetails.forEach((one, index) => {
      const { errors, isValid } = validateBookingInput(one);
      // Check Validation
      if (!isValid) {
        bookingError[index] = errors;
      }
    });

    this.setState({
      bookingError: bookingError
    });

    const BooklistFields = {
      packageName: this.state.packageName,
      person: bookingDetails
    };

    if (bookingError.length <= 0) {
      axios
        .post("/api/booklist", BooklistFields)
        .then(res => {
          this.props.history.push(`/Payment/${res.data}`);
        })
        .catch(err => console.log(err));
    }
  }

  componentDidMount() {
    axios.get(`/api/package/${this.props.match.params.pid}`).then(res => {
      this.setState({
        capacity: res.data.capacity,
        packageName: res.data.packageName
      });
    });
  }

  onClick(e) {
    e.preventDefault();
    const n = parseInt(document.getElementById("outlined-email-input").value);
    if (n <= this.state.capacity) {
      this.setState({
        members: n,
        errors: {}
      });
      let bookingDetails = [];
      for (let i = 0; i < n; i++) {
        bookingDetails.push({
          name: "",
          address: "",
          mobile: "",
          aadharImage: ""
        });
      }
      this.setState({
        bookingDetails: bookingDetails
      });
    } else if (n > this.state.capacity) {
      this.setState({
        members: "",
        errors: {
          capacity: "The no. of members are more than capacity"
        }
      });
    }
  }

  onChange(e, index, n) {
    let rows = [];
    let row = this.state.bookingDetails[index];

    if (n === "name") {
      row.name = e;
    } else if (n === "address") {
      row.address = e;
    } else if (n === "mobile") {
      row.mobile = e;
    } else if (n === "aadharImage") {
      row.aadharImage = e;
    }

    rows[index] = row;

    this.setState(prevState => ({
      bookingDetails: [...prevState.bookingDetails, rows]
    }));
  }

  render() {
    const { classes } = this.props;
    const { members, errors, bookingError } = this.state;
    let formContent = [];
    let buttonContent;
    let bookError = [
      {
        members: "",
        packageName: "",
        bookingDetails: [],
        errors: {
          capacity: ""
        },
        bookingError: []
      }
    ];
    if (bookingError !== null && bookingError.length > 0) {
      bookError = bookingError;
    }
    if (members > 0 && members <= this.state.capacity) {
      let bookingDetails = [];
      buttonContent = (
        <div>
          <input
            className={classes.input}
            id="contained-button-submit"
            type="submit"
          />
          <label htmlFor="contained-button-submit">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.onSubmit}
            >
              Book Now
            </Button>
          </label>
        </div>
      );
      for (let i = 0; i < members; i++) {
        bookingDetails.push({
          name: "",
          address: "",
          mobile: "",
          aadharImage: ""
        });
        let err = {
          name: "",
          address: "",
          mobile: "",
          aadharImage: ""
        };
        if (bookError[i] !== undefined) {
          err = bookError[i];
        }
        formContent[i] = (
          <Grid item container>
            <Grid
              item
              container
              direction="vertical"
              className={classes.formContentroot}
            >
              <Grid item container lg={12}>
                <Grid item lg={2} />
                <Grid item lg={8}>
                  <Typography
                    variant="h5"
                    gutterBottom={true}
                    className={classes.formContents}
                  >
                    Member {i + 1} Details:-
                  </Typography>
                  <hr />
                </Grid>
                <Grid item lg={2} xs={1} />
              </Grid>
              <Grid item container lg={12}>
                <Grid item lg={2} />
                <Grid item lg={2}>
                  <TextField
                    label="Full Name"
                    type="text"
                    name="name"
                    className={classes.formContents}
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.onChange(e.target.value, i, "name")}
                    error={err.name !== "" ? err.name : ""}
                    helperText={err.name !== "" ? err.name : ""}
                  />
                </Grid>
                <Grid item lg={2}>
                  <TextField
                    label="Address"
                    name="address"
                    type="text"
                    className={classes.formContents}
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.onChange(e.target.value, i, "address")}
                    error={err.address !== "" ? err.address : ""}
                    helperText={err.address !== "" ? err.address : ""}
                  />
                </Grid>
                <Grid item lg={2}>
                  <TextField
                    label="Mobile No."
                    name="mobile"
                    type="number"
                    className={classes.formContents}
                    onInput={e => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 10);
                    }}
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.onChange(e.target.value, i, "mobile")}
                    error={err.mobile !== "" ? err.mobile : ""}
                    helperText={err.mobile !== "" ? err.mobile : ""}
                  />
                </Grid>
                <Grid item lg={2}>
                  <TextField
                    label="Aadhar No."
                    style={{ marginBottom: 50 }}
                    name="aadharImage"
                    type="number"
                    className={classes.formContents}
                    onInput={e => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 12);
                    }}
                    margin="normal"
                    variant="outlined"
                    onChange={e =>
                      this.onChange(e.target.value, i, "aadharImage")
                    }
                    error={err.aadharImage !== "" ? err.aadharImage : ""}
                    helperText={err.aadharImage !== "" ? err.aadharImage : ""}
                  />
                </Grid>
                <Grid item lg={2} />
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="vertical"
              className={classes.formContentrootresponsive}
            >
              <Grid item container xs={12}>
                `<Grid item xs={2} />
                <Grid item xs={8}>
                  <Typography
                    variant="h5"
                    gutterBottom={true}
                    className={classes.formContents}
                  >
                    Member {i + 1} Details:-
                  </Typography>
                  <hr />
                </Grid>
                <Grid item xs={2} />
              </Grid>
              <Grid item container xs={12} direction="vertical">
                <Grid item xs={12}>
                  <TextField
                    label="Full Name"
                    type="text"
                    name="name"
                    className={classes.formContents}
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.onChange(e.target.value, i, "name")}
                    error={err.name !== "" ? err.name : ""}
                    helperText={err.name !== "" ? err.name : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Address"
                    name="address"
                    type="text"
                    className={classes.formContents}
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.onChange(e.target.value, i, "address")}
                    error={err.address !== "" ? err.address : ""}
                    helperText={err.address !== "" ? err.address : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Mobile No."
                    name="mobile"
                    type="number"
                    className={classes.formContents}
                    onInput={e => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 10);
                    }}
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.onChange(e.target.value, i, "mobile")}
                    error={err.mobile !== "" ? err.mobile : ""}
                    helperText={err.mobile !== "" ? err.mobile : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Aadhar No."
                    style={{ marginBottom: 50 }}
                    name="aadharImage"
                    type="number"
                    className={classes.formContents}
                    onInput={e => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 12);
                    }}
                    margin="normal"
                    variant="outlined"
                    onChange={e =>
                      this.onChange(e.target.value, i, "aadharImage")
                    }
                    error={err.aadharImage !== "" ? err.aadharImage : ""}
                    helperText={err.aadharImage !== "" ? err.aadharImage : ""}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      }
    }
    return (
      <div>
        <Grid container direction="vertical" style={{ marginBottom: 40 }}>
          <Grid item xs={12} style={{ marginTop: 40 }}>
            <Typography variant="h2" align="center">
              Booking Registration
            </Typography>
            <br />
            <Typography variant="subtitle1" align="center">
              Buy This Package
            </Typography>
          </Grid>
          <Grid item container lg={12} xs={12} direction="horizontal">
            <Grid item lg={4} xs={1} />
            <Grid item lg={4} xs={11}>
              <TextField
                id="outlined-email-input"
                label={`No. of Members within capacity ${this.state.capacity}`}
                style={{
                  width: 300,
                  marginBottom: 50,
                  marginTop: 50
                }}
                name="nom"
                type="number"
                margin="normal"
                variant="outlined"
                error={errors.capacity}
                helperText={errors.capacity !== null ? errors.capacity : ""}
              />
              <Button
                style={{
                  height: 55,
                  width: 100
                }}
                className={classes.nextButton}
                variant="contained"
                color="primary"
                onClick={this.onClick.bind(this)}
              >
                Next
              </Button>
            </Grid>
            <Grid item lg={4} xs={1} />
          </Grid>
          <Grid
            item
            container
            lg={12}
            direction="vertical"
            style={{ marginTop: 40 }}
          >
            <form className={classes.container} onSubmit={this.onSubmit}>
              {formContent}
              {buttonContent}
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

PaymentForm.propTypes = {
  classes: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default withStyles(styles)(PaymentForm);
