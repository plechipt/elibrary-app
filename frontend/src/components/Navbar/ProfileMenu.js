import React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const ProfileMenu = ({ isOpen, anchorEl, closeProfileMenu }) => {
  return (
    <Menu
      onClose={closeProfileMenu}
      open={isOpen}
      anchorEl={anchorEl}
      id="menu-appbar"
      keepMounted
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <MenuItem>Logout</MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
