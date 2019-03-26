import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Material UI import components
import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Grid,
  ListItemIcon
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Icon from "@material-ui/core/Icon";

// Redux Actions
import { logoutUser } from "../../actions/authActions";
import SelectDemo from "../common/SelectDemo";

const styles = theme => ({
  root: {
    flexGrow: 1,
    background: "transparent"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    [theme.breakpoints.up("lg")]: {
      display: "none"
    }
  },
  list: {
    width: 200
  },
  widthList: {
    width: "auto"
  },
  avatar: {
    margin: 5
  },
  navbar: {
    background: "transparent",
    color: "black",
    boxShadow: "none",
    [theme.breakpoints.down("sm")]: {
      position: "absolute"
    }
  },
  button: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  selectdemo: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  }
});

class NavBar extends Component {
  constructor() {
    super();
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }
  state = {
    left: false,
    anchorEl: null
  };

  toogleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  onLogoutClick = () => {
    this.props.logoutUser();
  };

  render() {
    const { classes } = this.props;
    const { isAuthenticate } = this.props.auth;
    const sideListGuest = (
      <div className={classes.list}>
        <List>
          {["HOME", "REGISTER", "LOGIN", "ABOUT US", "CONTACT US"].map(
            (text, index) => (
              <a
                style={{ textDecoration: "none" }}
                href={
                  text === "HOME"
                    ? "/"
                    : text === "REGISTER"
                    ? "/register"
                    : text === "LOGIN"
                    ? "/login"
                    : text === "ABOUT US"
                    ? "/about"
                    : "/contact"
                }
              >
                <ListItem button key={text}>
                  <ListItemIcon>
                    <Icon>
                      {text === "HOME" ? (
                        <span title="Home">
                          <i class="fas fa-home 2px fa-sm" />
                        </span>
                      ) : text === "REGISTER" ? (
                        <span title="Register">
                          <i class="fas fa-user-plus 2px fa-sm" />
                        </span>
                      ) : text === "LOGIN" ? (
                        <span title="Login">
                          <i class="fas fa-sign-in-alt 2px fa-sm" />
                        </span>
                      ) : text === "ABOUT US" ? (
                        <span title="About Us">
                          <i class="fas fa-info" />
                        </span>
                      ) : (
                        <span title="Contact Us">
                          <i class="fas fa-phone" />
                        </span>
                      )}
                    </Icon>
                  </ListItemIcon>
                  <ListItemText inset primary={text} />
                </ListItem>
              </a>
            )
          )}
        </List>
      </div>
    );
    const sideListAuth = (
      <div className={classes.list}>
        <List>
          {["HOME", "PROFILE", "LOGOUT", "ABOUT US", "CONTACT US"].map(
            (text, index) => (
              <a
                style={{ textDecoration: "none" }}
                href={
                  text === "HOME"
                    ? "/"
                    : text === "PROFILE"
                    ? "/edit-profile"
                    : text === "LOGOUT"
                    ? "/"
                    : text === "ABOUT US"
                    ? "/about"
                    : "/contact"
                }
              >
                <ListItem
                  button
                  key={text}
                  onClick={text === "LOGOUT" ? this.onLogoutClick : ""}
                >
                  <ListItemIcon>
                    <Icon>
                      {text === "HOME" ? (
                        <span title="Home">
                          <i class="fas fa-home 2px fa-sm" />
                        </span>
                      ) : text === "PROFILE" ? (
                        <span title="Profile">
                          <i class="fas fa-user 2px fa-sm" />
                        </span>
                      ) : text === "LOGOUT" ? (
                        <span title="Logout">
                          <i class="fas fa-sign-out-alt 2px fa-sm" />
                        </span>
                      ) : text === "ABOUT US" ? (
                        <span title="About Us">
                          <i class="fas fa-info" />
                        </span>
                      ) : (
                        <span title="Contact Us">
                          <i class="fas fa-phone" />
                        </span>
                      )}
                    </Icon>
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </a>
            )
          )}
        </List>
      </div>
    );
    const guestLinks = (
      <div>
        <Button color="inherit" href="/" className={classes.button}>
          <Icon>
            <span title="Home">
              <i class="fas fa-home 2px fa-sm" />
            </span>
          </Icon>
        </Button>
        <Button color="inherit" href="/Register" className={classes.button}>
          <Icon>
            <span title="Register">
              <i class="fas fa-user-plus 1px fa-sm" />
            </span>
          </Icon>
        </Button>
        <Button color="inherit" href="/Login" className={classes.button}>
          <Icon>
            <span title="Login">
              <i class="fas fa-sign-in-alt fa-sm" />
            </span>
          </Icon>
        </Button>
      </div>
    );
    const authLinks = (
      <div>
        <Button color="inherit" href="/" className={classes.button}>
          <Icon>
            <span title="Home">
              <i class="fas fa-home 1px fa-sm" />
            </span>
          </Icon>
        </Button>
        <Button color="inherit" href="/edit-profile" className={classes.button}>
          <span title="Profile">
            <i class="fas fa-user 2px fa-lg" />
          </span>
        </Button>
        <Button
          color="inherit"
          onClick={this.onLogoutClick}
          variant="outlined"
          className={classes.button}
        >
          <span title="Logout">
            <i class="fas fa-sign-out-alt 3px" />
          </span>
        </Button>
      </div>
    );
    return (
      <div className={classes.root}>
        <AppBar position="relative" className={classes.navbar}>
          <Toolbar>
            <Grid container xs={12}>
              <Grid container item xs={1}>
                <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                  onClick={this.toogleDrawer("left", true)}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid container item xs={11}>
                <Grid container item className={classes.selectdemo} xs={9}>
                  <SelectDemo />
                </Grid>
                <Grid container item xs>
                  {isAuthenticate ? authLinks : guestLinks}
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Drawer
          open={this.state.left}
          onClose={this.toogleDrawer("left", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toogleDrawer("left", false)}
            onKeyDown={this.toogleDrawer("left", false)}
          >
            {isAuthenticate ? sideListAuth : sideListGuest}
          </div>
        </Drawer>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withStyles(styles)(NavBar));
