import React from "react";
import { useHistory } from "react-router-dom";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const ProfileMenu = ({ isOpen, anchorEl, closeProfileMenu }) => {
  const history = useHistory();

  return (
    <Menu
      onClick={closeProfileMenu}
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
      <MenuItem onClick={() => history.push("/")}>Home</MenuItem>
      <MenuItem onClick={() => history.push("/my-books")}>My Books</MenuItem>
      <MenuItem>Logout</MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
