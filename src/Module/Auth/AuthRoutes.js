import React from "react";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Loader from "./../Common/Loader";
const Login = React.lazy(() => import("./Login"));

function AuthRoutes({ setAuthToken }) {
  return (
      <React.Suspense fallback={<div className="loader"> <Loader /> </div>}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Login setAuthToken={setAuthToken} />
              <Redirect to='/' />
            </Route>
          </Switch>
        </Router>
      </React.Suspense>
  );
}

export default AuthRoutes;
