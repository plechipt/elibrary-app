import React, { useContext } from "react";
import TableRowComponent from "./TableRowComponent";
import { LanguageContext } from "../Contexts/LanguageContext";
import "./BorrowedBooks.css";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const BorrowedBooks = () => {
  const { languageSelected } = useContext(LanguageContext);

  return (
    <TableContainer className="table-container" component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              {languageSelected === "czech" ? "Název knihy" : "Book name"}
            </TableCell>
            <TableCell align="left">
              {languageSelected === "czech" ? "Dlužník" : "Borrower"}
            </TableCell>
            <TableCell align="left">
              {languageSelected === "czech" ? "Den vypůjčení" : "Borrowing day"}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRowComponent />
          <TableRowComponent />
          <TableRowComponent />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BorrowedBooks;
