import React, { Component } from "react";
import PropTypes from "prop-types";

// material ui import
import {
  withStyles,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemIcon
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import classNames from "classnames";
import { loadCSS } from "fg-loadcss/src/loadCSS";
import GoogleMapsContainer from "../google-map/GoogleMapsContainer";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#212121",
    color: "white",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  responsive: {
    flexGrow: 1,
    backgroundColor: "#212121",
    color: "white",
    overflow: "hidden",
    [theme.breakpoints.up("lg")]: {
      display: "none"
    }
  }
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

class Footer extends Component {
  componentDidMount() {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
      document.querySelector("#insertion-point-jss")
    );
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container xs={12} className={classes.root} direction="vertical">
          <Grid container item xs={12}>
            <Grid container item xs={3}>
              <Grid container item xs />
              <Grid container item xs>
                <List component="nav">
                  <ListItemLink href="#simple-list">
                    <ListItemIcon>
                      <Icon>
                        <span
                          title="Quick Links"
                          style={{ fontSize: "25px", color: "white" }}
                        >
                          <i class="fas fa-link" />
                        </span>
                      </Icon>
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary="Quick Links"
                      style={{ color: "white" }}
                    />
                  </ListItemLink>
                  <ListItemLink href="/edit-profile">
                    <ListItemIcon>
                      <Icon>
                        <span
                          title="Profile"
                          style={{ fontSize: "25px", color: "white" }}
                        >
                          <i class="fas fa-user" />
                        </span>
                      </Icon>
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary="Profile"
                      style={{ color: "white" }}
                    />
                  </ListItemLink>
                  <ListItemLink href="#simple-list">
                    <ListItemIcon>
                      <Icon>
                        <span
                          title="Search Package"
                          style={{ fontSize: "20px", color: "white" }}
                        >
                          <i class="fas fa-plane-departure" />
                        </span>
                      </Icon>
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary="Search Package"
                      style={{ color: "white" }}
                    />
                  </ListItemLink>
                  <ListItemLink href="/">
                    <ListItemIcon>
                      <Icon>
                        <span
                          title="Home"
                          style={{ fontSize: "20px", color: "white" }}
                        >
                          <i class="fas fa-home" />
                        </span>
                      </Icon>
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary="Home"
                      style={{ color: "white" }}
                    />
                  </ListItemLink>
                  <ListItemLink href="#simple-list">
                    <ListItemIcon>
                      <Icon>
                        <span
                          title="About Us"
                          style={{ fontSize: "20px", color: "white" }}
                        >
                          <i class="fas fa-info" />
                        </span>
                      </Icon>
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary="About Us"
                      style={{ color: "white" }}
                    />
                  </ListItemLink>
                </List>
              </Grid>
              <Grid container item xs />
            </Grid>
            <Grid container item xs={6}>
              <Grid container item xs />
              <Grid container item xs={6} style={{ position: "relative" }}>
                <GoogleMapsContainer />
              </Grid>
              <Grid container item xs />
            </Grid>
            <Grid container item xs={3}>
              <Grid container item xs />
              <Grid container item xs>
                <ListItem>
                  <ListItemText
                    disableTypography
                    primary="ABC Tourism India Pvt. Ltd."
                    style={{ color: "white" }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon style={{ color: "white" }}>
                    <Icon>
                      <span title="Gmail">
                        <i class="far fa-envelope-open" />
                      </span>
                    </Icon>
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary="shivahazra@gmail.com"
                    style={{ color: "white" }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon style={{ color: "white" }}>
                    <Icon>
                      <span title="Phone">
                        <i class="fas fa-phone" />
                      </span>
                    </Icon>
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary="+91 9093079136"
                    style={{ color: "white" }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    disableTypography
                    primary="Address"
                    style={{ color: "white" }}
                  />
                </ListItem>
                <ListItem>
                  <Grid container spacing={24}>
                    <Grid item>
                      <Icon
                        className={classNames(
                          classes.icon,
                          "fab fa-facebook-square"
                        )}
                      />
                    </Grid>
                    <Grid item>
                      <Icon
                        className={classNames(classes.icon, "fab fa-twitter")}
                      />
                    </Grid>
                    <Grid item>
                      <Icon
                        className={classNames(classes.icon, "fab fa-instagram")}
                      />
                    </Grid>
                    <Grid item>
                      <Icon
                        className={classNames(
                          classes.icon,
                          "fab fa-google-plus"
                        )}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
              </Grid>
              <Grid container item xs />
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <Typography
                style={{ color: "white", marginTop: 30, fontFamily: "modern" }}
                align="center"
                variant="h6"
              >
                Product of Mediatek Nation Pvt. Ltd. copyright ©{" "}
                {new Date().getFullYear()}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography
                style={{ color: "white", marginTop: 5, fontFamily: "modern" }}
                align="center"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          xs={12}
          className={classes.responsive}
          direction="vertical"
        >
          <Grid container item xs={12}>
            <Grid container item xs={1} />
            <Grid container item xs={4}>
              <Grid container item xs />
              <Grid container item xs>
                <List component="nav" style={{ width: 300 }}>
                  <ListItemLink href="#simple-list">
                    <ListItemIcon>
                      <Icon>
                        <span
                          title="Quick Links"
                          style={{ fontSize: "25px", color: "white" }}
                        >
                          <i class="fas fa-link" />
                        </span>
                      </Icon>
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary="Quick Links"
                      style={{ color: "white" }}
                    />
                  </ListItemLink>
                  <ListItemLink href="/edit-profile">
                    <ListItemIcon>
                      <Icon>
                        <span
                          title="Profile"
                          style={{ fontSize: "25px", color: "white" }}
                        >
                          <i class="fas fa-user" />
                        </span>
                      </Icon>
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary="Profile"
                      style={{ color: "white" }}
                    />
                  </ListItemLink>
                  <ListItemLink href="#simple-list">
                    <ListItemIcon>
                      <Icon>
                        <span
                          title="Search Package"
                          style={{ fontSize: "20px", color: "white" }}
                        >
                          <i class="fas fa-plane-departure" />
                        </span>
                      </Icon>
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary="Search Package"
                      style={{ color: "white" }}
                    />
                  </ListItemLink>
                  <ListItemLink href="/">
                    <ListItemIcon>
                      <Icon>
                        <span
                          title="Home"
                          style={{ fontSize: "20px", color: "white" }}
                        >
                          <i class="fas fa-home" />
                        </span>
                      </Icon>
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary="Home"
                      style={{ color: "white" }}
                    />
                  </ListItemLink>
                  <ListItemLink href="#simple-list">
                    <ListItemIcon>
                      <Icon>
                        <span
                          title="About Us"
                          style={{ fontSize: "20px", color: "white" }}
                        >
                          <i class="fas fa-info" />
                        </span>
                      </Icon>
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary="About Us"
                      style={{ color: "white" }}
                    />
                  </ListItemLink>
                </List>
              </Grid>
              <Grid container item xs />
            </Grid>
            <Grid container item xs={4}>
              <Grid container item xs />
              <Grid container item xs>
                <List style={{ width: 150 }}>
                  <ListItem>
                    <ListItemText
                      disableTypography
                      primary="ABC Tourism India Pvt. Ltd."
                      style={{ color: "white" }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      disableTypography
                      primary="shivahazra@gmail.com"
                      style={{ color: "white" }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      disableTypography
                      primary="9093079136"
                      style={{ color: "white" }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      disableTypography
                      primary="Address"
                      style={{ color: "white" }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      disableTypography
                      primary="Contact Us"
                      style={{ color: "white" }}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid container item xs />
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid container item xs />
            <Grid container item xs={10} direction="vertica">
              <Grid container item xs={12} style={{ marginTop: 10 }}>
                <Grid container item xs />
                <Grid container item xs={3}>
                  <Typography style={{ color: "white" }}>Locate Us</Typography>
                </Grid>
                <Grid container item xs />
              </Grid>
              <Grid
                container
                item
                xs={12}
                style={{ position: "relative", height: 280, marginTop: 20 }}
              >
                <GoogleMapsContainer />
              </Grid>
            </Grid>
            <Grid container item xs />
          </Grid>
          <Grid container item xs={12}>
            <Grid container item xs />
            <Grid container item xs={12} direction="vertical">
              <Grid container item xs={12} style={{ marginTop: 20 }}>
                <Grid container item xs />
                <Grid container item xs={4}>
                  <Typography style={{ color: "white" }}>
                    Stay Connected
                  </Typography>
                </Grid>
                <Grid container item xs />
              </Grid>
              <Grid
                container
                item
                xs={12}
                style={{ position: "relative", marginTop: 20 }}
              >
                <Grid item container xs={12}>
                  <Grid item xs={2} />
                  <Grid item xs={2}>
                    <Icon
                      className={classNames(
                        classes.icon,
                        "fab fa-facebook-square"
                      )}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Icon
                      className={classNames(classes.icon, "fab fa-twitter")}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Icon
                      className={classNames(classes.icon, "fab fa-instagram")}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Icon
                      className={classNames(classes.icon, "fab fa-google-plus")}
                    />
                  </Grid>
                  <Grid item xs={2} />
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs />
          </Grid>
          <Grid
            container
            item
            xs={12}
            direction="vertical"
            style={{ marginTop: 20 }}
          >
            <Grid item container xs={12} style={{ marginTop: 10 }}>
              <Grid item xs={3} />
              <Grid item xs={8}>
                <Typography style={{ color: "white", align: "justify" }}>
                  Product of Mediatek Nation
                </Typography>
              </Grid>
              <Grid item xs={1} />
            </Grid>
            <Grid item container xs={12} style={{ marginTop: 10 }}>
              <Grid item xs={2} />
              <Grid item xs={8}>
                <Typography style={{ color: "white", align: "justify" }}>
                  {`copyright ${new Date().getFullYear()}`}: All Rights Reserved
                </Typography>
              </Grid>
              <Grid item xs={2} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
