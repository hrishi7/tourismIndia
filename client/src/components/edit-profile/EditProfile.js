import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import {
  withStyles,
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Avatar
} from "@material-ui/core";

// Components
import Spinner from "../common/Spinner";
import { DropzoneArea } from "material-ui-dropzone";

// Actions
import {
  getCurrentProfile,
  createProfile,
  uploadImage
} from "../../actions/profileActions";
import { connect } from "react-redux";
import axios from "axios";

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
  textarea: {
    [theme.breakpoints.up("lg")]: {
      width: 540
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 10,
      width: 350
    },
    marginTop: 20,
    height: 100
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
  formControl: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: 10
    },
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  },
  bigAvatar: {
    [theme.breakpoints.up("lg")]: {
      marginLeft: 160
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 70
    },
    width: 200,
    height: 200
  },
  dropzonebutton: {
    position: "absolute",
    [theme.breakpoints.up("lg")]: {
      marginLeft: 150
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: 20,
      width: 360
    }
  }
});

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      mobile: "",
      gender: "",
      address: "",
      nationality: "",
      files: [],
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleChange = event => {
    this.setState({ gender: event.target.value });
  };
  handleChangeFiles(files) {
    this.setState({
      files: files[0]
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const userData = {
      name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile,
      gender: this.state.gender,
      address: this.state.address,
      nationality: this.state.nationality
    };
    //console.log(userData);
    this.props.createProfile(userData, this.props.history);
  }
  uploadImageClick(e) {
    e.preventDefault();
    const fd = new FormData();
    fd.append("profileImage", this.state.files, this.state.files.name);
    //console.log(this.state.files.name);
    axios
      .post("/api/profile/image", fd, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${fd._boundary}`
        }
      })
      .then(res => {
        console.log(res.data);
        window.location.reload();
      })
      .catch(err => console.log("Upload Failed"));
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      this.setState({
        name: profile.name,
        email: profile.email,
        mobile: profile.mobile,
        gender: profile.gender,
        address: profile.address,
        nationality: profile.nationality
      });
    }
  }
  render() {
    const { classes } = this.props;
    const { profile, loading } = this.props.profile;
    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = (
        <div style={{ overflowX: "hidden" }}>
          <Grid container>
            <Grid
              item
              container
              lg={12}
              direction="vertical"
              style={{ marginBottom: 40 }}
            >
              <Grid container item lg={12}>
                <Grid item lg={4} />
                <Grid item lg={4}>
                  <DropzoneArea onChange={this.handleChangeFiles.bind(this)} />
                </Grid>
                <Grid item lg={4} />
              </Grid>
            </Grid>
            <Grid container item lg={12}>
              <Grid item lg={4} />
              <Grid item lg={4}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.uploadImageClick.bind(this)}
                  className={classes.dropzonebutton}
                >
                  Upload Image
                </Button>
              </Grid>
              <Grid item lg={4} />
            </Grid>

            <Grid
              item
              container
              lg={12}
              direction="vertical"
              style={{ marginTop: 50 }}
            >
              <Grid container item lg={12}>
                <Grid item lg />
                <Grid item lg>
                  <Avatar
                    alt="https://s3.ap-south-1.amazonaws.com/tourismindia/default-1546146648776.png"
                    src={profile.dpUrl}
                    className={classes.bigAvatar}
                  />
                </Grid>
                <Grid item lg />
              </Grid>
              <form
                className={classes.container}
                autoComplete="off"
                onSubmit={this.onSubmit}
              >
                <Grid container item lg={12} direction="vertical">
                  <Grid container item lg={12}>
                    <Grid item lg={4} />
                    <Grid item lg={4}>
                      <TextField
                        id="outlined-email-input"
                        label="Full Name"
                        className={classes.textField}
                        name="name"
                        value={profile.name}
                        autoComplete="name"
                        margin="normal"
                        variant="outlined"
                        onChange={this.onChange}
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
                        value={profile.email}
                        autoComplete="email"
                        margin="normal"
                        variant="outlined"
                        onChange={this.onChange}
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
                        value={profile.mobile}
                        type="number"
                        margin="normal"
                        variant="outlined"
                        onChange={this.onChange}
                      />
                    </Grid>
                    <Grid item lg={4} />
                  </Grid>
                  <Grid container item lg={12}>
                    <Grid item lg={4} />
                    <Grid item lg={4}>
                      <FormControl
                        component="fieldset"
                        className={classes.formControl}
                      >
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                          aria-label="Gender"
                          name="gender1"
                          value={this.state.gender}
                          className={classes.group}
                          onChange={this.handleChange}
                        >
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Male"
                          />
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                          />
                          <FormControlLabel
                            value="other"
                            control={<Radio />}
                            label="Other"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item lg={4} />
                  </Grid>
                  <Grid container item lg={12}>
                    <Grid item lg={4} />
                    <Grid item lg={4}>
                      <textarea
                        className={classes.textarea}
                        placeholder="Current Address"
                        name="address"
                        value={profile.address}
                        onChange={this.onChange}
                      />
                    </Grid>
                    <Grid item lg={4} />
                  </Grid>
                  <Grid container item lg={12}>
                    <Grid item lg={4} />
                    <Grid item lg={4}>
                      <TextField
                        id="outlined-password-input"
                        label="Nationality"
                        className={classes.textField}
                        name="nationality"
                        value={profile.nationality}
                        margin="normal"
                        variant="outlined"
                        onChange={this.onChange}
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
                          Update Profile
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

    return (
      <div>
        <Grid container direction="vertical" style={{ marginBottom: 40 }}>
          <Grid item xs={12} style={{ marginTop: 40 }}>
            <Typography variant="h2" align="center">
              Edit Profile
            </Typography>
            <br />
            <Typography variant="subtitle1" align="center">
              You can Update Your Profile
            </Typography>
          </Grid>
          <Grid item xs={12} direction="vertical">
            {dashboardContent}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { getCurrentProfile, createProfile, uploadImage }
)(withRouter(withStyles(styles)(EditProfile)));
