import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { USER_DELETE_TOKENS_MUTATION } from "../Api/users";

import { UserContext } from "../Contexts/UserContext";
import { LanguageContext } from "../Contexts/LanguageContext";
import { ShowCreateModalContext } from "../Contexts/ShowCreateModalContext";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const ProfileMenu = ({ isOpen, anchorEl, closeProfileMenu }) => {
  const history = useHistory();
  const [deleteTokens] = useMutation(USER_DELETE_TOKENS_MUTATION);

  const { user } = useContext(UserContext);
  const { languageSelected } = useContext(LanguageContext);
  const { setShowCreateModal } = useContext(ShowCreateModalContext);

  const handleOnLogout = async () => {
    await deleteTokens();
    history.go(0); // Reset page
  };

  const showModal = () => {
    history.push("/");
    setShowCreateModal(true);
  };

  return (
    <Menu
      open={isOpen}
      onClick={closeProfileMenu}
      onClose={closeProfileMenu}
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      id="menu-appbar"
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
      <MenuItem onClick={() => history.push("/")}>
        {languageSelected === "czech" ? "Domů" : "Home"}
      </MenuItem>
      {user.isSuperuser ? (
        <div>
          <MenuItem onClick={() => history.push("/users")}>
            {languageSelected === "czech" ? "Uživatelé" : "Users"}
          </MenuItem>
          <MenuItem onClick={showModal}>
            {languageSelected === "czech" ? "Vytvořit knihu" : "Create a book"}
          </MenuItem>
          <MenuItem onClick={() => history.push("/borrowed-books")}>
            {languageSelected === "czech" ? "Pujčené knihy" : "Borrowed books"}
          </MenuItem>
        </div>
      ) : (
        <MenuItem onClick={() => history.push("/my-books")}>
          {languageSelected === "czech" ? "Moje knihy" : "My books"}
        </MenuItem>
      )}
      <MenuItem onClick={handleOnLogout}>
        {languageSelected === "czech" ? "Odhlásit se" : "Logout"}
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
