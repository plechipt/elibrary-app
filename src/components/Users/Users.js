import React from "react";
import "./Users.css";
import UsersRow from "./UsersRow";

import Grid from "@material-ui/core/Grid";

const Users = () => {
  return (
    <div className="users-container">
      <Grid container item xs={12} spacing={3}>
        <UsersRow />
      </Grid>
      <Grid container item xs={12} spacing={3}>
        <UsersRow />
      </Grid>
      <Grid container item xs={12} spacing={3}>
        <UsersRow />
      </Grid>
      <Grid container item xs={12} spacing={3}>
        <UsersRow />
      </Grid>
      <Grid container item xs={12} spacing={3}>
        <UsersRow />
      </Grid>
    </div>
  );
};

export default Users;
