import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./Contexts/UserContext";

const PrivateRoute = ({ component: Component }) => {
  const { user } = useContext(UserContext);

  return (
    <>
      {user.isSuperuser ? (
        <Route render={() => <Component />} />
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default PrivateRoute;
