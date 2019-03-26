import React, { Component } from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "normalize.css/normalize.css";
import "./slider-animations.css";
import "./styles.css";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      position: "relative",
      marginTop: 0
    }
  }
});

class SliderDemo extends Component {
  constructor() {
    super();
    this.state = {
      packages: [],
      left: false,
      anchorEl: null
    };
  }
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
  onClick(e) {
    e.preventDefault();
    this.props.history.push(`/ViewDetails/city/${e.target.value}`);
  }

  render() {
    const { packages } = this.state;
    const { classes } = this.props;
    let content = [];
    let pckgs = [];
    let count = 0;

    if (packages.length > 0 && packages !== null) {
      for (let i = 0; i < packages.length; i++) {
        let f = 0;
        for (let k = 0; k < pckgs.length; k++) {
          if (packages[i].city === pckgs[k].city) {
            f = 1;
          }
        }
        if (f !== 1) {
          pckgs[count] = packages[i];
          count++;
        }
      }
      for (let j = 0; j < pckgs.length; j++) {
        content[j] = {
          title: pckgs[j].city,
          description: pckgs[j].overview,
          button: "View Details",
          image: pckgs[j].imagesUrl[0],
          value: pckgs[j].city
        };
      }
    }

    return (
      <div className={`body1 ${classes.root}`}>
        <Slider className="slider-wrapper" autoplay={2000}>
          {content.map((item, index) => (
            <div
              key={index}
              style={{
                background: `url('${item.image}') no-repeat center center`
              }}
            >
              <div className="slider-content">
                <div className="inner">
                  <h1>{item.title}</h1>
                  <p>{item.description}</p>
                  <button
                    className="button1"
                    onClick={this.onClick.bind(this)}
                    value={item.value}
                  >
                    {item.button}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

SliderDemo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SliderDemo));
