import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import UserModal from "./UserModal";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  blue: {
    backgroundColor: "#1976D2",
  },
}));

const User = ({ id, username, firstLetter }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOnClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleOnClose = () => {
    setAnchorEl(null);
    setModalIsOpen(true);
  };

  return (
    <>
      <ListItem className="user-item" key={id} button>
        <ListItemAvatar>
          <Avatar className={classes.blue}>{firstLetter}</Avatar>
        </ListItemAvatar>
        <ListItemText className="text-item" id={id} primary={username} />
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleOnClick}
        >
          <MoreVertIcon />
        </IconButton>
      </ListItem>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleOnClose}>{t("users.popup_text")}</MenuItem>
      </Menu>
      <UserModal
        username={username}
        modalIsOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
      />
    </>
  );
};

export default User;
