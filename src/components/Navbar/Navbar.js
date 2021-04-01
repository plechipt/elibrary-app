import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import SelectLanguage from "./SelectLanguage";
import "./Navbar.css";

import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";

const Navbar = ({ darkMode, setDarkMode }) => {
  const history = useHistory();

  const profileMenuRef = useRef();
  const [profileMenuIsOpen, setProfileMenuIsOpen] = useState(false);

  return (
    <div className="root">
      <AppBar
        className="app-bar"
        style={{ background: "#1976D2" }}
        position="static"
      >
        <Toolbar>
          <Typography
            onClick={() => history.push("/")}
            className="logo"
            variant="h6"
          >
            Elibrary
          </Typography>
          <Grid container justify="flex-end">
            <SelectLanguage />
            <IconButton
              onClick={() => setDarkMode((prevMode) => !prevMode)}
              aria-label="dark mode toggle"
              color="inherit"
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <IconButton
              onClick={() => setProfileMenuIsOpen(true)}
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <ProfileMenu
              isOpen={profileMenuIsOpen}
              anchorEl={profileMenuRef.current}
              closeProfileMenu={() => setProfileMenuIsOpen(false)}
            />
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
