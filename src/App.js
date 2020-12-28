import "./App.css";

import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "./components/HOC/PrivateRoute";
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./redux/actions";
import Product from "./containers/Products";
import Orders from "./containers/Orders";
import Category from "./containers/Category";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    //Read Comment Below
    if (!auth.authenticated) {
      dispatch(isUserLoggedIn());
    }
  }, []);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/category" exact component={() => <Category />} />

        <PrivateRoute path="/products" component={() => <Product />} />
        <PrivateRoute path="/orders" component={() => <Orders />} />

        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
      </Switch>
    </div>
  );
}

export default App;

/*

(1)
 - when admin time /signin in URL page reload and Store became null
 - so that's why authenticated is false
 - in action we check that
 - OK, admin is logged in which means token is stord in localstorage
 - so we check that is token is there than we update the authenticated to TRUE
 - so we can achive REDIRECT functionality


(2)
  - when we are on Dashboard and click on singin we see signin page for 1/5 milisecond
  - WHY..? because we are setting on Dashboard and out checking happen on sing in page 
  - Solution..?
  - checking happen on Dashboard level so copy useEffect from here to Dashboard

(3)
  - we need to perform checking on every page insted of that 
  - we remove <Route> from App.js to index.js
  - and write checking useEffect on TOP Level 

*/
