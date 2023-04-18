import React, { useContext } from "react";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { USER_DELETE_TOKENS_MUTATION } from "../Api/users";

import { UserContext } from "../Contexts/UserContext";
import { ShowCreateModalContext } from "../Contexts/ShowCreateModalContext";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const ProfileMenu = ({ isOpen, anchorEl, closeProfileMenu }) => {
  const history = useHistory();
  const { t } = useTranslation();

  const { user } = useContext(UserContext);
  const { setShowCreateModal } = useContext(ShowCreateModalContext);

  const handleOnLogout = async () => {
    Cookies.remove("token");
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
      <MenuItem onClick={() => history.push("/")}>{t("navbar.home")}</MenuItem>
      {user.isSuperuser ? (
        <div>
          <MenuItem onClick={() => history.push("/users")}>
            {t("navbar.users")}
          </MenuItem>
          <MenuItem onClick={showModal}>{t("navbar.create_book")}</MenuItem>
          <MenuItem onClick={() => history.push("/borrowed-books")}>
            {t("navbar.borrowed_books")}
          </MenuItem>
        </div>
      ) : (
        <MenuItem onClick={() => history.push("/my-books")}>
          {t("navbar.my_books")}
        </MenuItem>
      )}
      <MenuItem onClick={handleOnLogout}>{t("navbar.logout")}</MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
