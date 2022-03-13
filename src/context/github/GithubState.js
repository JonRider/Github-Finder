import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./GithubContext";
import GithubReducer from "./GithubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_USER_REPOS,
} from "../types";

const github = axios.create({
  baseURL: "https://api.github.com",
  timeout: 1000,
  headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN },
});

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  const searchUsers = async (text) => {
    setLoading();
    const res = await github.get(`/search/users?q=${text}`);
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };

  // Get User
  const getUser = async (login) => {
    setLoading();
    const res = await github.get(`/users/${login}`);
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  // Get Repos
  const getUserRepos = async (login) => {
    setLoading();
    const res = await github.get(
      `/users/${login}/repos?per_page=5&sort=created:asc`
    );
    dispatch({
      type: GET_USER_REPOS,
      payload: res.data,
    });
  };

  // Clear Users
  const clearUsers = () => {
    dispatch({
      type: CLEAR_USERS,
    });
  };

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
