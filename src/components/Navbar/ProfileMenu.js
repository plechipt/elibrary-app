import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { USER_DELETE_TOKENS_MUTATION } from "../Api/users";
import { UserContext } from "../Contexts/UserContext";
import { LanguageContext } from "../Contexts/LanguageContext";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const ProfileMenu = ({ isOpen, anchorEl, closeProfileMenu }) => {
  const history = useHistory();
  const [deleteTokens] = useMutation(USER_DELETE_TOKENS_MUTATION);

  const { user } = useContext(UserContext);
  const { languageSelected } = useContext(LanguageContext);

  console.log(user.isSuperuser);

  const handleOnLogout = async () => {
    await deleteTokens();
    window.location.reload(); // Reset page
  };

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
      <MenuItem onClick={() => history.push("/")}>
        {languageSelected === "czech" ? "Domů" : "Home"}
      </MenuItem>
      <MenuItem onClick={() => history.push("/my-books")}>
        {languageSelected === "czech" ? "Moje knihy" : "My books"}
      </MenuItem>
      <MenuItem onClick={handleOnLogout}>
        {languageSelected === "czech" ? "Odhlásit se" : "Logout"}
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
