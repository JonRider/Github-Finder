import React, { useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/layout/Spinner";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Repos from "../components/repos/Repos";

function User({
  getUser,
  getUserRepos,
  repos,
  loading,
  user: {
    name,
    avatar_url,
    location,
    bio,
    company,
    blog,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  },
}) {
  const { login } = useParams();

  useEffect(() => {
    getUser(login);
    getUserRepos(login);
  }, []);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <Link to={"/"} className="btn btn-light">
          Back To Search
        </Link>
        Hireable:{" "}
        {hireable ? (
          <i className="fas fa-check text-success"></i>
        ) : (
          <i className="fas fa-times-circle text-danger"></i>
        )}
        <div className="card grid-2">
          <div className="all-center">
            <img
              className="round-img"
              src={avatar_url}
              alt={login}
              style={{ width: "150px" }}
            ></img>
            <h1>{name}</h1>
            <p>Location: {location}</p>
          </div>
          <div>
            {bio && (
              <Fragment>
                <h3>Bio:</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a href={html_url} className="btn btn-dark my-1">
              Visit Github Profile
            </a>
            <ul>
              <li>
                <Fragment>
                  <strong>Username: </strong>
                  {login}
                </Fragment>
              </li>
              <li>
                {company && (
                  <Fragment>
                    <strong>Company: </strong>
                    {company}
                  </Fragment>
                )}
              </li>
              <li>
                {blog && (
                  <Fragment>
                    <strong>Website: </strong>
                    {company}
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="card text-center">
          <div className="badge badge-primary">Followers: {followers}</div>
          <div className="badge badge-success">Following: {following}</div>
          <div className="badge badge-light">Public Repos: {public_repos}</div>
          <div className="badge badge-dark">Public Gists: {public_gists}</div>
        </div>
        <Repos repos={repos} />
      </Fragment>
    );
  }
}

User.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  getUserRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
};

export default User;
