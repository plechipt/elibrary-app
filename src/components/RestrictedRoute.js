import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./Contexts/UserContext";

const RestrictedRoute = ({ component: Component, forSuperUser }) => {
  const { user } = useContext(UserContext);

  // If forSuperUser is false, then route is determined for normal user

  return (
    <>
      {user.isSuperuser === forSuperUser ? (
        <Route render={() => <Component />} />
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default RestrictedRoute;
