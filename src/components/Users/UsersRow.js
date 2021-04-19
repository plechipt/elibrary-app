import React from "react";
import User from "./User";

import List from "@material-ui/core/List";

const UsersRow = ({ users }) => {
  return (
    <List className="user-row">
      {users.allUsers.map(({ id, username }) => {
        const firstLetter = username[0].toUpperCase();

        return (
          <User
            key={id}
            id={id}
            username={username}
            firstLetter={firstLetter}
          />
        );
      })}
    </List>
  );
};

export default UsersRow;
