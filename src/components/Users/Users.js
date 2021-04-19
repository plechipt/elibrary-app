import React from "react";
import { useQuery } from "@apollo/client";
import { USER_ALL_USERS_QUERY } from "../Api/users";
import UsersRow from "./UsersRow";
import "./Users.css";

import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";

const Users = () => {
  const { data: users } = useQuery(USER_ALL_USERS_QUERY);

  return (
    <>
      {users ? (
        <>
          <Grid container>
            <div className="users-container">
              <UsersRow users={users} />
            </div>
          </Grid>
          <Pagination
            className="paginator"
            count={1}
            size="large"
            color="primary"
          />
        </>
      ) : null}
    </>
  );
};

export default Users;
