import React from "react";
import "./Users.css";
import UsersRow from "./UsersRow";

import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";

const Users = () => {
  return (
    <>
      <Grid container item xs={12}>
        <div className="users-container">
          <UsersRow />
          <UsersRow />
        </div>
      </Grid>
      <Pagination
        className="paginator"
        size="large"
        count={10}
        color="primary"
      />
    </>
  );
};

export default Users;
