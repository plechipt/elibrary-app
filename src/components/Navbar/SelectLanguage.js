import React, { useState, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";

import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import LanguageIcon from "@material-ui/icons/Translate";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  margin: {
    margin: theme.spacing(1),
  },
  language: {
    margin: theme.spacing(0, 0.5, 0, 1),
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
}));

const SelectLanguage = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef();

  const changeLanguage = (language) => {
    setIsOpen(false);
    i18n.changeLanguage(language);
  };

  return (
    <div className={classes.root}>
      <Button
        ref={selectRef}
        onClick={() => setIsOpen(true)}
        aria-owns={"language-menu"}
        color="inherit"
        aria-haspopup="true"
        data-ga-event-category="header"
        data-ga-event-action="language"
      >
        <LanguageIcon />
        <span className={classes.language}>{t("navbar.language")}</span>
        <ExpandMoreIcon fontSize="small" />
      </Button>
      <Menu
        onClose={() => setIsOpen(false)}
        anchorEl={selectRef.current}
        open={isOpen}
        id="simple-menu"
        keepMounted
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => changeLanguage("cs")}>Čestina</MenuItem>
        <MenuItem onClick={() => changeLanguage("en")}>English</MenuItem>
      </Menu>
    </div>
  );
};

export default SelectLanguage;
