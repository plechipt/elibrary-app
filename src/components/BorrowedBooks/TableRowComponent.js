import React from "react";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const TableRowComponent = ({ title, username, date }) => {
  return (
    <TableRow key="ds">
      <TableCell>{title}</TableCell>
      <TableCell align="left">{username}</TableCell>
      <TableCell align="left">{date}</TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
