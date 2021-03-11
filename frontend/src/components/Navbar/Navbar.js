import React, { useState, useRef } from "react";
import ProfileMenu from "./ProfileMenu";
import "./Navbar.css";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const Navbar = () => {
  const profileMenuRef = useRef();
  const [profileMenuIsOpen, setProfileMenuIsOpen] = useState(false);

  return (
    <div className="root">
      <AppBar className="app-bar" position="static">
        <Toolbar>
          <Typography variant="h6" className="logo">
            Elibrary
          </Typography>
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
