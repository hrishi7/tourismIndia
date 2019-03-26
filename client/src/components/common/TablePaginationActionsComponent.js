import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, IconButton, Grid } from "@material-ui/core";
import LastPageIcon from "@material-ui/icons/LastPage";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const actionStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  paginationresponsive: {
    marginLeft: 0,
    width: 100,
    color: theme.palette.text.secondary,
    [theme.breakpoints.up("lg")]: {
      display: "none"
    }
  }
});

class TablePagination extends Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };
  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };
  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };
  handLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)
    );
  };

  render() {
    const { classes, page, theme, count, rowsPerPage } = this.props;
    return (
      <Grid container xs={12}>
        <div className={classes.root}>
          <IconButton
            onClick={this.handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="First Page"
          >
            {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
          <IconButton
            onClick={this.handleBackButtonClick}
            disabled={page === 0}
            aria-label="Previous Page"
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </IconButton>
          <IconButton
            onClick={this.handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Next Page"
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </IconButton>
          <IconButton
            onClick={this.handLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Last Page"
          >
            {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>
        </div>
        <div className={classes.paginationresponsive}>
          <IconButton
            onClick={this.handleBackButtonClick}
            disabled={page === 0}
            aria-label="Previous Page"
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </IconButton>
          <IconButton
            onClick={this.handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Next Page"
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </IconButton>
        </div>
      </Grid>
    );
  }
}

TablePagination.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired
};

export default withStyles(actionStyles, {
  withTheme: true
})(TablePagination);
