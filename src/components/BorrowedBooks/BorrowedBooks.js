import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import {
  BORROWING_LIST_QUERY,
  BORROWING_LIST_COUNT_QUERY,
} from "../Api/borrowings";
import { LanguageContext } from "../Contexts/LanguageContext";

import TableRowComponent from "./TableRowComponent";
import CustomPagination from "../Other/CustomPagination";
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
  const { data: borrowingsCount } = useQuery(BORROWING_LIST_COUNT_QUERY);

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
                    : "Borrow day"}
                </TableCell>
                <TableCell align="left">
                  {languageSelected === "czech" ? "Den vrácení" : "Return day"}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {borrowings.borrowings.map(
                ({
                  id,
                  book: { title },
                  user: { username },
                  dateBorrowed,
                  dateReturned,
                }) => {
                  return (
                    <TableRowComponent
                      key={id}
                      title={title}
                      username={username}
                      dateBorrowed={dateBorrowed}
                      dateReturned={dateReturned}
                    />
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
      {borrowingsCount ? (
        <CustomPagination
          count={borrowingsCount.borrowingsCount}
          pageSize={10}
        />
      ) : null}
    </>
  );
};

export default BorrowedBooks;
