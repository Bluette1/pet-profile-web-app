import React, { useEffect } from "react";
import { Switch, Route, Link, Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./containers/Home";
import Profile from "./components/Profile";
import PetForm from "./components/PetForm";
import history from "./helpers/history";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

const App = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    history.listen(() => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);
  const logOut = (e) => {
    e.preventDefault();
    dispatch(logout()).then(
      alert(
        "You have successfully logged out. It was happy to have you. Hope to see you again!"
      )
    );
  };
  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/tutorials" className="navbar-brand">
            petProfile
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/home" className="nav-link">
                Home
              </Link>
            </li>
            {!currentUser && (
              <li className="nav-item">
                <Link to="/signup" className="nav-link">
                  Register
                </Link>
              </li>
            )}

            {!currentUser && (
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                {message && (
                  <span className="alert alert-danger">{message}</span>
                )}
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to="/add" className="nav-link">
                  Add Pet
                </Link>
                {message && (
                  <span className="alert alert-danger">{message}</span>
                )}
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  Logout
                </a>
                {message && (
                  <span className="alert alert-danger">{message}</span>
                )}
              </li>
            )}
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/signup" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
            <Route path="/add" component={PetForm} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
