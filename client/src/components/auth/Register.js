import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {
  withStyles,
  Grid,
  Typography,
  TextField,
  Button
} from "@material-ui/core";

// Components
import { connect } from "react-redux";

// Actions
import { registerUser } from "../../actions/authActions";

const styles = theme => ({
  navbar: {
    background: "transparent",
    color: "black",
    boxshadow: "none"
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
      width: 350,
      marginLeft: 10
    }
  },
  typography1: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: 110
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: 180
    }
  },
  typography2: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: 120
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: 200
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
  }
});

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      mobile: "",
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticate) {
      this.props.history.push("/edit-profile");
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      mobile: this.state.mobile
    };
    this.props.registerUser(newUser, this.props.history);
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
                style={{ width: 110 }}
                className={classes.typography1}
              >
                Register
              </Typography>
              <br />
              <Typography
                className={classes.typography2}
                variant="subtitle1"
                style={{ width: 200 }}
              >
                Register to our Website
              </Typography>
            </Grid>
            <Grid item lg={4} />
          </Grid>
          <Grid container item lg={12}>
            <form className={classes.container} onSubmit={this.onSubmit}>
              <Grid container item lg={12} direction="vertical">
                <Grid container item lg={12}>
                  <Grid item lg={4} />
                  <Grid item lg={4}>
                    <TextField
                      id="outlined-email-input"
                      label="Full Name"
                      className={classes.textField}
                      name="name"
                      autoComplete="name"
                      margin="normal"
                      variant="outlined"
                      onChange={this.onChange}
                      error={errors.name}
                      helperText={errors.name !== "" ? errors.name : ""}
                    />
                  </Grid>
                  <Grid item lg={4} />
                </Grid>
                <Grid container item lg={12}>
                  <Grid item lg={4} />
                  <Grid item lg={4}>
                    <TextField
                      id="outlined-email-input"
                      label="email"
                      className={classes.textField}
                      type="email"
                      name="email"
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
                    <TextField
                      id="outlined-password-input"
                      label="Password"
                      className={classes.textField}
                      name="password"
                      type="password"
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
                    <TextField
                      id="outlined-password-input"
                      label="Confirm Password"
                      className={classes.textField}
                      name="password2"
                      type="password"
                      margin="normal"
                      variant="outlined"
                      onChange={this.onChange}
                      error={errors.password2}
                      helperText={
                        errors.password2 !== "" ? errors.password2 : ""
                      }
                    />
                  </Grid>
                  <Grid item lg={4} />
                </Grid>
                <Grid container item lg={12}>
                  <Grid item lg={4} />
                  <Grid item lg={4}>
                    <TextField
                      id="outlined-password-input"
                      label="Mobile No."
                      className={classes.textField}
                      name="mobile"
                      type="number"
                      margin="normal"
                      variant="outlined"
                      onChange={this.onChange}
                      error={errors.mobile}
                      helperText={errors.mobile !== "" ? errors.mobile : ""}
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
                        Register
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

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(withStyles(styles)(Register)));
