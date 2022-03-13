import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./users/Users";
import User from "./users/User";
import Search from "./users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import GithubState from "./context/github/GithubState";

import "./App.css";

const App = () => {
  const [alert, setAlert] = useState(null);

  // Send an alert that nothing was searched
  const sendAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar title="Github Finder" icon="fa fa-github" />
          <div className="container">
            <Alert alert={alert} />
            <Routes>
              <Route
                path="/"
                element={
                  <Fragment>
                    <Search sendAlert={sendAlert} />
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
    </GithubState>
  );
};

export default App;
