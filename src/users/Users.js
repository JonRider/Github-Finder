import React, { Component } from "react";
import UserItem from "./UserItem";

class Users extends Component {
  state = {
    users: [
      {
        id: 1,
        login: "mojombo",
        avatar_url:
          "https://media2.firstshowing.net/firstshowing/img/avatar-newstills-101-full-01.jpg",
        html_url: "",
      },
      {
        id: 2,
        login: "mojombo",
        avatar_url:
          "https://media2.firstshowing.net/firstshowing/img/avatar-newstills-101-full-01.jpg",
        html_url: "",
      },
      {
        id: 3,
        login: "mojombo",
        avatar_url:
          "https://media2.firstshowing.net/firstshowing/img/avatar-newstills-101-full-01.jpg",
        html_url: "",
      },
      {
        id: 4,
        login: "mojombo",
        avatar_url:
          "https://media2.firstshowing.net/firstshowing/img/avatar-newstills-101-full-01.jpg",
        html_url: "",
      },
    ],
  };

  render() {
    return (
      <div style={userStyle}>
        {this.state.users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }
}

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};

export default Users;
