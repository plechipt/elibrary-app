import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  BORROWING_USER_LIST_QUERY,
  BORROWING_USER_LIST_COUNT_QUERY,
} from "../Api/borrowings";
import CustomPagination from "../Other/CustomPagination";
import Book from "./Book";

import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const UserBooks = () => {
  const [page, setPage] = useState(1);
  const { t } = useTranslation();

  let [getBorrowings, { data: usersBorrowings, loading }] = useLazyQuery(
    BORROWING_USER_LIST_QUERY
  );
  const { data: usersBorrowingsCount } = useQuery(
    BORROWING_USER_LIST_COUNT_QUERY
  );

  useEffect(() => {
    getBorrowings({
      variables: { page },
    });
  }, [page, getBorrowings]);

  return (
    <>
      <div className="books-container">
        {usersBorrowings && loading === false ? (
          <>
            <Grid container className="books-grid-container">
              {usersBorrowings.usersBorrowings.length !== 0 ? (
                <>
                  {usersBorrowings.usersBorrowings.map(
                    ({
                      book: {
                        id,
                        title,
                        author,
                        genre,
                        titleCz,
                        authorCz,
                        genreCz,
                        numberOfPages,
                        imageName,
                      },
                    }) => {
                      return (
                        <Book
                          isBorrowed={true}
                          key={id}
                          id={id}
                          title={[title, titleCz]}
                          author={[author, authorCz]}
                          genre={[genre, genreCz]}
                          numberOfPages={numberOfPages}
                          imageName={imageName}
                        />
                      );
                    }
                  )}
                </>
              ) : (
                <>
                  <Typography className="text-container" variant="h2">
                    {t("books.no_borrowed_books")}
                  </Typography>
                </>
              )}
            </Grid>
          </>
        ) : (
          <CircularProgress />
        )}
      </div>
      {usersBorrowingsCount ? (
        <CustomPagination
          count={usersBorrowingsCount.usersBorrowingsCount}
          pageSize={12}
          setPage={setPage}
        />
      ) : null}
    </>
  );
};

export default UserBooks;
