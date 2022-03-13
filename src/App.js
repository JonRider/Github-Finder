import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./users/Users";
import User from "./users/User";
import Search from "./users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/Aler  tState";

import "./App.css";

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar title="Github Finder" icon="fa fa-github" />
            <div className="container">
              <Alert />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Fragment>
                      <Search />
                      <Users />
                    </Fragment>
                  }
                />
                <Route path="/about" element={<About />} />
                <Route path={`/user/:login`} element={<User />} />
              </Routes>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
