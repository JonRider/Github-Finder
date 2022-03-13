import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import GithubContext from "../context/github/GithubContext";

const Search = ({ sendAlert }) => {
  const githubContext = useContext(GithubContext);
  const { users, searchUsers, clearUsers } = githubContext;
  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      sendAlert("Please enter something", "light");
    } else {
      searchUsers(text);
      setText("");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search Users..."
          value={text}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {users.length > 0 && (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  sendAlert: PropTypes.func.isRequired,
};

export default Search;
