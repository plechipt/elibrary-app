import React, { useState, useRef } from "react";
import ProfileMenu from "./ProfileMenu";
import "./Navbar.css";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";

const Navbar = () => {
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
          <Typography variant="h6" className="logo">
            Elibrary
          </Typography>
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
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
