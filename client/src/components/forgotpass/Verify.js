import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Grid,
  Typography,
  TextField,
  Button
} from "@material-ui/core";

// Redux Connection
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

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
  textField: {
    [theme.breakpoints.up("lg")]: {
      width: 540
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 10,
      width: 350
    }
  },
  button: {
    [theme.breakpoints.up("lg")]: {
      width: 540
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 10,
      width: 350
    },
    marginTop: 15,
    height: 50
  },
  input: {
    display: "none"
  },
  typography1: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: 50
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: 130
    }
  },
  typography2: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: 10,
      width: 340
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: 90,
      width: 370
    }
  }
});

class Verify extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticate) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticate) {
      window.history.back();
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { classes, errors } = this.props;
    return (
      <div>
        <Grid container direction="vertical" style={{ marginBottom: 40 }}>
          <Grid item container lg={12} style={{ marginTop: 40 }}>
            <Grid item lg={4} />
            <Grid item lg={4}>
              <Typography
                variant="h2"
                style={{ width: 160 }}
                className={classes.typography1}
              >
                Verification
              </Typography>
              <br />
              <Typography
                variant="subtitle1"
                className={classes.typography2}
                align="center"
              >
                Verify Your Profile Using Your Email Registered Yet
              </Typography>
            </Grid>
            <Grid item lg={4} />
          </Grid>
          <Grid item xs={12}>
            <form className={classes.container} onSubmit={this.onSubmit}>
              <Grid container item lg={12} direction="vertical">
                <Grid container item lg={12}>
                  <Grid item lg={4} />
                  <Grid item lg={4}>
                    <TextField
                      id="outlined-email-input"
                      label="Email Address"
                      className={classes.textField}
                      type="email"
                      name="email"
                      value={this.state.email}
                      autoComplete="email"
                      margin="normal"
                      variant="outlined"
                      onChange={this.onChange}
                      error={errors.email}
                      helperText={errors.email !== "" ? errors.email : ""}
                    />
                  </Grid>
                  <Grid item lg={4} />
                </Grid>
                <Grid container item lg={12}>
                  <Grid item lg={4} />
                  <Grid item lg={4}>
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
                        Send One Time Password
                      </Button>
                    </label>
                  </Grid>
                  <Grid item lg={4} />
                </Grid>

                <Grid container item lg={12}>
                  <Grid item lg={4} />
                  <Grid item lg={4}>
                    <TextField
                      id="outlined-password-input"
                      label="One Time Password"
                      className={classes.textField}
                      type="text"
                      name="password"
                      value={this.state.password}
                      autoComplete="current-password"
                      margin="normal"
                      variant="outlined"
                      onChange={this.onChange}
                      error={errors.password}
                      helperText={errors.password !== "" ? errors.password : ""}
                    />
                  </Grid>
                  <Grid item lg={4} />
                </Grid>
                <Grid container item lg={12}>
                  <Grid item lg={4} />
                  <Grid item lg={4}>
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
                        Verify
                      </Button>
                    </label>
                  </Grid>
                  <Grid item lg={4} />
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Verify.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withStyles(styles)(Verify));
