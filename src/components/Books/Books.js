import React, { useState, useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { BOOK_NOT_BORROWED_BOOKS_QUERY } from "../Api/books";
import { axiosInstance } from "../axios";

import { LanguageContext } from "../Contexts/LanguageContext";
import { ShowCreateModalContext } from "../Contexts/ShowCreateModalContext";
import Book from "./Book";
import CreateBookModal from "./CreateBookModal";
import "./Books.css";

import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const { languageSelected } = useContext(LanguageContext);
  const { showCreateModal, setShowCreateModal } = useContext(
    ShowCreateModalContext
  );

  useEffect(() => {
    setLoading(true);

    const fetchBooks = async () => {
      const {
        data: { results },
      } = await axiosInstance.get(`${BASE_URL}/books/`);

      setBooks(results);
      setLoading(false);
    };
    fetchBooks();
  }, []);

  return (
    <div className="books-container">
      {books && loading === false ? (
        <Grid container>
          {books.length !== 0 ? (
            <>
              {books.map(
                ({
                  id,
                  title,
                  author,
                  genre,
                  title_cz: titleCz,
                  author_cz: authorCz,
                  genre_cz: genreCz,
                  number_of_pages: numberOfPages,
                  image_name: imageName,
                }) => {
                  return (
                    <Book
                      isBorrowed={false}
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
              <CreateBookModal
                openModal={showCreateModal}
                closeModal={() => setShowCreateModal(false)}
              />
            </>
          ) : (
            <Typography className="text-container" variant="h2">
              {languageSelected === "czech"
                ? "Žádné dostupné knihy"
                : "No available books"}
            </Typography>
          )}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default Books;
