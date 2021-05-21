import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  BORROWING_LIST_QUERY,
  BORROWING_LIST_COUNT_QUERY,
} from "../Api/borrowings";

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
  const [page, setPage] = useState(1);
  const { t } = useTranslation();

  const { data: borrowingsCount } = useQuery(BORROWING_LIST_COUNT_QUERY);
  const [getBorrowings, { data: borrowings }] =
    useLazyQuery(BORROWING_LIST_QUERY);

  useEffect(() => {
    getBorrowings({ variables: { page } });
  }, [page, getBorrowings]);

  return (
    <>
      {borrowings ? (
        <TableContainer className="table-container" component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{t("borrowed_books.book_name")}</TableCell>
                <TableCell align="left">
                  {t("borrowed_books.borrower")}
                </TableCell>
                <TableCell align="left">
                  {t("borrowed_books.borrow_day")}
                </TableCell>
                <TableCell align="left">
                  {t("borrowed_books.return_day")}
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
          setPage={setPage}
        />
      ) : null}
    </>
  );
};

export default BorrowedBooks;
