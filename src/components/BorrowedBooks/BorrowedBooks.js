import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { BORROWING_LIST_QUERY } from "../Api/borrowings";
import { LanguageContext } from "../Contexts/LanguageContext";
import TableRowComponent from "./TableRowComponent";
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
  const { data: borrowings } = useQuery(BORROWING_LIST_QUERY);

  return (
    <>
      {borrowings ? (
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
                  {languageSelected === "czech"
                    ? "Den vypůjčení"
                    : "Borrowing day"}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {borrowings.borrowings.map(
                ({ id, book: { title }, user: { username }, dateString }) => {
                  return (
                    <TableRowComponent
                      key={id}
                      title={title}
                      username={username}
                      date={dateString}
                    />
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </>
  );
};

export default BorrowedBooks;
