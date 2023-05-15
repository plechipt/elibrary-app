import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client";
import { useHistory, Link } from "react-router-dom";
import { USER_REGISTER_MUTATION } from "../Api/users";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

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
    marginTop: theme.spacing(3),
  },
  submitButton: {
    margin: theme.spacing(1, 0, 2),
    background: "#1976D2",
    "&:hover": {
      background: "#1976D2",
    },
  },
  loginLink: {
    color: "#1976D2",
    marginLeft: 5,
    textDecoration: "none",
  },
}));

const SignUp = ({ user }) => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();

  const [register, { data: registerData, loading }] = useMutation(
    USER_REGISTER_MUTATION
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);

  const [usernameMessageError, setUsernameMessageError] = useState("");
  const [passwordMessageError, setPasswordMessageError] = useState("");
  const [passwordConfirmMessageError, setPasswordConfirmMessageError] =
    useState("");

  const setErrorMessage = (message, field) => {
    message = message.replace(".", ""); // Remove dot from message

    if (field === "username") {
      setUsernameMessageError(message);
    }
    if (field === "password1") {
      setPasswordMessageError(message);
    }
    if (field === "password2") {
      setPasswordConfirmMessageError(message);
    }
  };

  const resetErrorMessages = () => {
    setUsernameMessageError("");
    setPasswordConfirmMessageError("");
    setPasswordConfirmMessageError("");
  };

  useEffect(() => {
    if (registerData) {
      const {
        register: { errors, user },
      } = registerData;
      const registerWasNotSuccessful = user === null;

      resetErrorMessages();

      if (registerWasNotSuccessful) {
        errors.forEach(({ messages, field }) => {
          let [message] = messages;
          setErrorMessage(message, field);
        });
      } else {
        history.push("/login");
      }
    }
  }, [registerData, history]);

  const handleOnRegister = async (e) => {
    e.preventDefault();

    await register({
      variables: {
        username,
        password1: password,
        password2: passwordConfirm,
      },
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
              {t("login_register.sign_up")}
            </Typography>
            <form onSubmit={handleOnRegister} className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    onChange={(e) => setUsername(e.target.value)}
                    error={usernameMessageError !== "" ? true : false}
                    helperText={
                      usernameMessageError !== "" ? usernameMessageError : ""
                    }
                    autoComplete="username"
                    name="username"
                    variant="outlined"
                    id="username"
                    label={t("login_register.username")}
                    autoFocus
                    required
                    fullWidth
                    InputLabelProps={{ required: false }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={(e) => setPassword(e.target.value)}
                    error={passwordMessageError !== "" ? true : false}
                    helperText={
                      passwordMessageError !== "" ? passwordMessageError : ""
                    }
                    type={showPasswords ? "text" : "password"}
                    variant="outlined"
                    name="password"
                    label={t("login_register.password")}
                    id="password"
                    autoComplete="current-password"
                    required
                    fullWidth
                    InputLabelProps={{ required: false }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    error={passwordConfirmMessageError !== "" ? true : false}
                    helperText={
                      passwordConfirmMessageError !== ""
                        ? passwordConfirmMessageError
                        : ""
                    }
                    type={showPasswords ? "text" : "password"}
                    variant="outlined"
                    name="password"
                    label={t("login_register.confirm_password")}
                    id="confirm-password"
                    autoComplete="confirm-password"
                    fullWidth
                    required
                    InputLabelProps={{ required: false }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onClick={() => setShowPasswords(!showPasswords)}
                        value="allowExtraEmails"
                        color="primary"
                      />
                    }
                    label={t("login_register.show_passwords")}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                className={classes.submitButton}
                disabled={loading}
                fullWidth
                variant="contained"
                color="primary"
              >
                {t("login_register.sign_up")}
              </Button>
              <Typography color="textSecondary">
                {t("login_register.already_have_account")}
                <Link to="/" className={classes.loginLink}>
                  {t("login_register.sign_in")}
                </Link>
              </Typography>
            </form>
          </div>
        </Container>
      ) : null}
    </>
  );
};

export default SignUp;
