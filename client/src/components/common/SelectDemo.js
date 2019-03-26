import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import { Grid, Button } from "@material-ui/core";
import axios from "axios";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  input: {
    display: "flex",
    padding: 0
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    overflow: "hidden"
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 16
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  selectdemocontent1: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  selectdemocontent2: {
    [theme.breakpoints.up("lg")]: {
      display: "none"
    },
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      style={{ width: 300 }}
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};

class SelectDemo extends React.Component {
  state = {
    packages: [],
    state: null,
    city: null,
    cities: []
  };

  handleChange = name => value => {
    this.setState({
      [name]: value
    });
  };

  componentDidMount() {
    axios
      .get("/api/package")
      .then(res => {
        const pckgs = res.data;
        this.setState({
          packages: pckgs
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let i;
    let states = [];
    let pckgs = [];
    let count = 0;
    const { classes, theme } = this.props;
    const { packages } = this.state;
    const { cities, state, city } = this.state;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        "& input": {
          font: "inherit"
        }
      })
    };

    if (packages) {
      for (i = 0; i < packages.length; i++) {
        let f = 0;
        for (let k = 0; k < pckgs.length; k++) {
          if (packages[i].state === pckgs[k].state) {
            f = 1;
          }
        }
        if (f !== 1) {
          pckgs[count] = packages[i];
          count++;
        }
      }
      for (i = 0; i < pckgs.length; i++) {
        states[i] = { label: pckgs[i].state };
        cities[i] = { label: pckgs[i].city };
      }
    }

    const suggestions1 = states.map(suggestion => ({
      value: suggestion.label,
      label: suggestion.label
    }));

    const suggestions2 = cities.map(suggestion => ({
      value: suggestion.label,
      label: suggestion.label
    }));

    let SearchContent;

    if (state && city) {
      SearchContent = (
        <Button
          variant="contained"
          color="primary"
          href={`/ViewDetails/${state.value}/${city.value}`}
        >
          <span title="Search">
            <i class="fas fa-search" />
          </span>
        </Button>
      );
    } else if (city) {
      SearchContent = (
        <Button
          variant="contained"
          color="primary"
          href={`/ViewDetails/city/${city.value}`}
        >
          <span title="Search">
            <i class="fas fa-search" />
          </span>
        </Button>
      );
    } else {
      SearchContent = (
        <Button variant="contained" color="primary">
          <span title="Search">
            <i class="fas fa-search" />
          </span>
        </Button>
      );
    }

    return (
      <div className={classes.root}>
        <Grid container className={classes.selectdemocontent1} xs={12} lg={12}>
          <Grid item xs={4} lg={4}>
            <Select
              classes={classes}
              styles={selectStyles}
              options={suggestions1}
              components={components}
              value={this.state.state}
              onChange={this.handleChange("state")}
              placeholder="Search a State"
              isClearable
            />
          </Grid>
          <Grid item xs={4} lg={4} style={{ marginLeft: 80 }}>
            <Select
              classes={classes}
              styles={selectStyles}
              options={suggestions2}
              components={components}
              value={this.state.city}
              onChange={this.handleChange("city")}
              placeholder="Search a City"
              isClearable
            />
          </Grid>
          <Grid item xs={4} lg={2} style={{ marginLeft: 40 }}>
            {SearchContent}
          </Grid>
        </Grid>
        <Grid
          container
          className={classes.selectdemocontent2}
          xs={12}
          direction="vertical"
        >
          <Grid
            container
            item
            xs={12}
            direction="horizontal"
            style={{ marginTop: 20 }}
          >
            <Grid container item xs={1} />
            <Grid container item xs={9}>
              <Select
                classes={classes}
                styles={selectStyles}
                options={suggestions1}
                components={components}
                value={this.state.state}
                onChange={this.handleChange("state")}
                placeholder="Search a State"
                isClearable
              />
            </Grid>
            <Grid container item xs={1} />
          </Grid>
          <Grid
            container
            item
            xs={12}
            direction="horizontal"
            style={{ marginTop: 10 }}
          >
            <Grid container item xs={1} />
            <Grid item xs={9}>
              <Select
                classes={classes}
                styles={selectStyles}
                options={suggestions2}
                components={components}
                value={this.state.city}
                onChange={this.handleChange("city")}
                placeholder="Search a City"
                isClearable
              />
            </Grid>
            <Grid container item xs={1} />
          </Grid>
          <Grid
            container
            item
            xs={12}
            direction="horizontal"
            style={{ marginTop: 10 }}
          >
            <Grid container item xs={4} />
            <Grid item xs={4}>
              {SearchContent}
            </Grid>
            <Grid container item xs={4} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

SelectDemo.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SelectDemo);
