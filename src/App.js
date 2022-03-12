import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./users/Users";
import User from "./users/User";
import Search from "./users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import axios from "axios";
import "./App.css";

const App = () => {
  const github = axios.create({
    baseURL: "https://api.github.com",
    timeout: 1000,
    headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN },
  });

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const fetchUsers = async () => {
    const res = await github.get(`/users`);
    setUsers(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Search Github Users
  const searchUsers = async (text) => {
    setLoading(true);
    const res = await github.get(`/search/users?q=${text}`);
    console.log("Searching for " + text);
    console.log(res.data.items);
    setUsers(res.data.items);
    setLoading(false);
  };

  // Get a single Github user
  const getUser = async (login) => {
    setLoading(true);
    const res = await github.get(`/users/${login}`);
    setUser(res.data);
    setLoading(false);
  };

  // Get a users repos
  const getUserRepos = async (login) => {
    setLoading(true);
    const res = await github.get(
      `/users/${login}/repos?per_page=5&sort=created:asc`
    );
    setRepos(res.data);
    setLoading(false);
  };

  // Clear Users from State
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  // Send an alert that nothing was searched
  const sendAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
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
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    sendAlert={sendAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path={`/user/:login`}
              element={
                <User
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
