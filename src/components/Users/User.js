import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

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

  return (
    <ListItem className="user-item" key={id} button>
      <ListItemAvatar>
        <Avatar className={classes.blue}>{firstLetter}</Avatar>
      </ListItemAvatar>
      <ListItemText className="text-item" id={id} primary={username} />
    </ListItem>
  );
};

export default User;
