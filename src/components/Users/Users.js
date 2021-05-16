import React from "react";
import { useQuery } from "@apollo/client";
import { USER_ALL_USERS_QUERY, USER_ALL_USERS_COUNT_QUERY } from "../Api/users";
import UsersRow from "./UsersRow";
import CustomPagination from "../Other/CustomPagination";
import "./Users.css";

import Grid from "@material-ui/core/Grid";

const Users = () => {
  const { data: users } = useQuery(USER_ALL_USERS_QUERY);
  const { data: usersCount } = useQuery(USER_ALL_USERS_COUNT_QUERY);

  return (
    <>
      {users ? (
        <>
          <Grid container>
            <div className="users-container">
              <UsersRow users={users} />
            </div>
          </Grid>
          {usersCount ? (
            <CustomPagination count={usersCount.allUsersCount} pageSize={10} />
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default Users;
