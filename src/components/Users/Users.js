import React from "react";
import UsersRow from "./UsersRow";
import "./Users.css";

import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";

const Users = () => {
  return (
    <>
      <Grid container>
        <div className="users-container">
          <UsersRow />
          <UsersRow />
        </div>
      </Grid>
      <Pagination
        className="paginator"
        count={10}
        size="large"
        color="primary"
      />
    </>
  );
};

export default Users;
