import React from "react";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const TableRowComponent = () => {
  //const classes = useStyles();

  return (
    <TableRow key="ds">
      <TableCell>TestKniha</TableCell>
      <TableCell align="left">TestUser</TableCell>
      <TableCell align="left">12.04 2021</TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
