import React from "react";
import { useTranslation } from "react-i18next";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const TableRowComponent = ({ title, username, dateBorrowed, dateReturned }) => {
  const { t } = useTranslation();
  const notReturnedMessage = t("borrowed_books.return_day");

  // If dateReturned is null -> show notReturnedMessage
  dateReturned = dateReturned === null ? notReturnedMessage : dateReturned;

  return (
    <TableRow key="ds">
      <TableCell>{title}</TableCell>
      <TableCell align="left">{username}</TableCell>
      <TableCell align="left">{dateBorrowed}</TableCell>
      <TableCell align="left">{dateReturned}</TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
