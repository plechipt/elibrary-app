import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
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

const UsersRow = () => {
  const classes = useStyles();

  return (
    <List width={500} className="users">
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem className="user-item" key={value} button>
            <ListItemAvatar>
              <Avatar className={classes.blue}>A{value}</Avatar>
            </ListItemAvatar>
            <ListItemText
              className="text-item"
              id={labelId}
              primary={`Line item ${value + 1}`}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default UsersRow;
