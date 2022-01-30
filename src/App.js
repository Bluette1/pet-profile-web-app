import React, { useEffect } from "react";
import { Switch, Route, Link, Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./containers/Home";
import Profile from "./components/Profile";
import PetForm from "./components/PetForm";
import PetFormUpdate from "./components/PetFormUpdate";
import Pet from "./components/Pet";
import history from "./helpers/history";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import '../node_modules/bootstrap/dist/js/bootstrap.min';

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
    dispatch(logout()).then(() => {
      alert(
        "You have successfully logged out. It was happy to have you. Hope to see you again!"
      );
      window.location.reload();
    });
  };
  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand-lg navbar-inverse navbar-dark bg-secondary">
          <div className="p-3">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarToggler"
              aria-controls="navbarToggler"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="navbar-nav mr-auto" id="navbarToggler">
              <a href="/" className="navbar-brand">
                &nbsp;petProfile
              </a>
              <li className="nav-item">
                <Link to="/home" className="nav-link">
                &nbsp;Home
                </Link>
              </li>
              {!currentUser && (
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                  &nbsp;Register
                  </Link>
                </li>
              )}

              {!currentUser && (
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                  &nbsp;Login
                  </Link>
                  {message && (
                    <span className="alert alert-danger">{message}</span>
                  )}
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link to="/add" className="nav-link">
                  &nbsp;Add Pet
                  </Link>
                  {message && (
                    <span className="alert alert-danger">{message}</span>
                  )}
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to="/my-pets" className="nav-link">
                  &nbsp;My pets
                  </Link>
                  {message && (
                    <span className="alert alert-danger">{message}</span>
                  )}
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut}>
                  &nbsp;Logout
                  </a>
                  {message && (
                    <span className="alert alert-danger">{message}</span>
                  )}
                </li>
              )}
            </div>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/signup" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/my-pets" component={Profile} />
            <Route path="/add" component={PetForm} />
            <Route path="/edit" component={PetFormUpdate} />
            <Route path="/pet/" component={Pet} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
