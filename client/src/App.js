import React, { Component } from "react";
import jwt_decode from "jwt-decode";

// React Redux
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Common Component
import PrivateRoute from "./components/common/PrivateRoute";

//Components
import "./App.css";
import Footer from "./components/layout/Footer";
import PackageDetails from "./components/packages/PackageDetails";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import EditProfile from "./components/edit-profile/EditProfile";

// Connect with Redux
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import Landing from "./components/layout/Landing";
import ViewDetails from "./components/places/ViewDetails";
import NavBar from "./components/layout/NavBar";
import BuyBid from "./components/payment/BuyBid";
import PaymentComplete from "./components/payment/PaymentComplete";
import PaymentForm from "./components/payment/PaymentForm";
import Verify from "./components/forgotpass/Verify";
import ResetPass from "./components/forgotpass/ResetPass";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout User
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route
                exact
                path="/PackageDetails/*"
                component={PackageDetails}
              />
              <Route exact path="/Login" component={Login} />
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
                <PrivateRoute exact path="/Payment/:id" component={BuyBid} />
                <PrivateRoute
                  exact
                  path="/payment-complete/:id"
                  component={PaymentComplete}
                />
                <PrivateRoute
                  exact
                  path="/BookPackageForm/:pid"
                  component={PaymentForm}
                />
              </Switch>
              <Route exact path="/ForgotPassword" component={Verify} />
              <Route exact path="/Register" component={Register} />
              <Route exact path="/ViewDetails/*" component={ViewDetails} />
              <Route exact path="/ResetPass" component={ResetPass} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
