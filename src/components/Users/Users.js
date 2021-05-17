import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { USER_ALL_USERS_QUERY, USER_ALL_USERS_COUNT_QUERY } from "../Api/users";
import UsersRow from "./UsersRow";
import CustomPagination from "../Other/CustomPagination";
import "./Users.css";

import Grid from "@material-ui/core/Grid";

const Users = () => {
  const [page, setPage] = useState(1);
  const [getUsers, { data: users }] = useLazyQuery(USER_ALL_USERS_QUERY);
  const { data: usersCount } = useQuery(USER_ALL_USERS_COUNT_QUERY);

  useEffect(() => {
    getUsers({ variables: { page } });
  }, [page, getUsers]);

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
            <CustomPagination
              count={usersCount.allUsersCount}
              pageSize={10}
              setPage={setPage}
            />
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default Users;
