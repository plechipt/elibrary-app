import React, { useContext } from "react";
import { LanguageContext } from "../Contexts/LanguageContext";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const TableRowComponent = ({ title, username, dateBorrowed, dateReturned }) => {
  const { languageSelected } = useContext(LanguageContext);
  const notReturnedMessage =
    languageSelected === "czech" ? "Nevráceno" : "Not returned";

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
