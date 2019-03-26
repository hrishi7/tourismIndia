import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
  Typography,
  Button,
  Grid
} from "@material-ui/core";
import TablePaginationActionsComponent from "../common/TablePaginationActionsComponent";
import Carousel from "nuka-carousel";
import ScrollUpButton from "react-scroll-up-button";

const styles = theme => ({
  root: {
    width: "70%",
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 30,
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  table: {
    [theme.breakpoints.up("lg")]: {
      minWidth: 500
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: 200
    }
  },
  tableWrapper: {
    overflowX: "auto"
  },
  avatar: {
    margin: 10,
    width: 130,
    height: 130
  },
  rootresponsive: {
    [theme.breakpoints.up("lg")]: {
      display: "none"
    }
  }
});

class PackageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 4,
      rows: props.pckgs
    };
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handChangePage = (event, page) => {
    this.setState({ page: page });
  };

  render() {
    const { classes } = this.props;
    const { rows, page, rowsPerPage } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    //let amt;
    return (
      <Grid container xs={12}>
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(row => {
                    let imagesContent = [];
                    for (let i = 0; i < row.imagesUrl.length; i++) {
                      imagesContent[i] = (
                        <img
                          src={row.imagesUrl[i]}
                          width={200}
                          height={150}
                          alt={row.packageName}
                        />
                      );
                    }
                    return (
                      <TableRow key={row._id}>
                        <TableCell component="th" scope="row">
                          <Carousel
                            cellAlign="center"
                            style={{ width: 200, height: 150 }}
                            autoplay={200}
                            speed={200}
                          >
                            {imagesContent}
                          </Carousel>
                        </TableCell>
                        <TableCell style={{ width: 500 }}>
                          <TableRow>
                            <TableCell colSpan={2} align="center">
                              <Typography variant="h6">
                                {row.packageName}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{ width: 250 }}>
                              <Typography variant="subtitle1">
                                {`Start Date: ${row.startDate}`}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="subtitle2">
                                {`Cost: ₹${row.tourCost}/_`}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography variant="subtitle1">
                                {`End Date: ${row.endDate}`}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="subtitle1">
                                {`Capacity: ${row.capacity}`}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableCell>
                        <TableCell align="right">
                          <TableRow>
                            <TableCell>
                              <Button
                                variant="outlined"
                                color="secondary"
                                href={`/BookPackageForm/${row._id}`}
                              >
                                Book Now
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Button
                                color="primary"
                                href={`/PackageDetails/${row._id}`}
                              >
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 48 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    colSpan={3}
                    rowsPerPageOptions={[6, 10, 25]}
                    page={page}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    onChangePage={this.handChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActionsComponent}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Paper>
        <Paper className={classes.rootresponsive}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(row => {
                    let imagesContent = [];
                    for (let i = 0; i < row.imagesUrl.length; i++) {
                      imagesContent[i] = (
                        <img
                          src={row.imagesUrl[i]}
                          width={200}
                          height={150}
                          alt={row.packageName}
                        />
                      );
                    }
                    return (
                      <TableRow key={row._id}>
                        <TableCell component="th" scope="row">
                          <TableRow>
                            <TableCell>
                              <TableCell align="center">
                                <Typography variant="h6">
                                  {row.packageName}
                                </Typography>
                              </TableCell>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Carousel
                                cellAlign="center"
                                style={{ width: 200, height: 150 }}
                                autoplay={200}
                                speed={200}
                              >
                                {imagesContent}
                              </Carousel>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography variant="subtitle1">
                                {`Start Date: ${row.startDate}`}
                              </Typography>
                              <Typography variant="subtitle2">
                                {`Cost: ₹${row.tourCost}/_`}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography variant="subtitle1">
                                {`End Date: ${row.endDate}`}
                              </Typography>
                              <Typography variant="subtitle1">
                                {`Capacity: ${row.capacity}`}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="center">
                              <Button
                                variant="outlined"
                                color="secondary"
                                href={`/BookPackageForm/${row._id}`}
                              >
                                Book Now
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="center">
                              <Button
                                color="primary"
                                href={`/PackageDetails/${row._id}`}
                              >
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 48 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>
                    <TablePagination
                      rowsPerPageOptions={[6, 10, 25]}
                      page={page}
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      onChangePage={this.handChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActionsComponent}
                    />
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Paper>
        <ScrollUpButton EasingType="easeInOutCubic" />
      </Grid>
    );
  }
}

PackageList.propTypes = {
  classes: PropTypes.object.isRequired,
  packages: PropTypes.array.isRequired
};

export default withStyles(styles)(PackageList);
