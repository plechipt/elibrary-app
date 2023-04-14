import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useApolloClient } from "@apollo/client";
import { useHistory, Link } from "react-router-dom";
import { USER_LOGIN_MUTATION } from "../Api/users";
import Cookies from "js-cookie";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    background: "#1976D2",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submitButton: {
    margin: theme.spacing(2, 0, 2),
    background: "#1976D2",
    "&:hover": {
      background: "#1976D2",
    },
  },

  registerLink: {
    color: "#1976D2",
    marginLeft: 5,
    textDecoration: "none",
  },
}));

const SignIn = ({ user }) => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();

  const client = useApolloClient();
  const [login, { data: loginData, loading }] = useMutation(
    USER_LOGIN_MUTATION,
    {
      errorPolicy: "all",
    }
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [failedToLogin, setFailedToLogin] = useState(false);

  useEffect(() => {
    if (loginData) {
      const { tokenAuth } = loginData;
      const loginWasSuccessful = tokenAuth !== null;

      if (loginWasSuccessful) {
        Cookies.set("token", tokenAuth.token);
        client.resetStore();
        history.push("/");
      } else {
        setFailedToLogin(true);
        setPassword("");
      }
    }
  }, [loginData, history, client]);

  const handleOnLogin = async (e) => {
    e.preventDefault();

    await login({
      variables: { username, password },
    });
  };

  return (
    <>
      {user === null ? (
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t("login_register.sign_in")}
            </Typography>
            <form onSubmit={handleOnLogin} className={classes.form}>
              <TextField
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
                margin="normal"
                id="username"
                label={t("login_register.username")}
                name="username"
                autoComplete="username"
                autoFocus
                required
                fullWidth
                InputLabelProps={{ required: false }}
              />
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                error={failedToLogin ? true : false}
                helperText={
                  /* Handle bad login  */
                  failedToLogin ? t("login_register.failed_to_login") : ""
                }
                variant="outlined"
                margin="normal"
                name="password"
                label={t("login_register.password")}
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                InputLabelProps={{ required: false }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                disabled={loading}
                className={classes.submitButton}
                fullWidth
                variant="contained"
                color="primary"
              >
                {t("login_register.sign_in")}
              </Button>
              <Typography color="textSecondary">
                {}
                {t("login_register.dont_have_account")}
                <Link to="/register" className={classes.registerLink}>
                  {t("login_register.sign_up")}
                </Link>
              </Typography>
            </form>
          </div>
        </Container>
      ) : null}
    </>
  );
};

export default SignIn;
