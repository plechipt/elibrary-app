import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { LanguageContext } from "../Contexts/LanguageContext";
import { MessageContext } from "../Contexts/MessageContext";
import { MessageContentContext } from "../Contexts/MessageContentContext";
import { BOOK_DELETE_BOOK_MUTATION } from "../Api/books";
import { BOOK_NOT_BORROWED_BOOKS_QUERY } from "../Api/books";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

const PUBLIC_FOLDER = process.env.PUBLIC_URL;

const AdminModal = ({ id, title, author, genre, numberOfPages, imageName }) => {
  const { setShowMessage } = useContext(MessageContext);
  const { setMessageContent } = useContext(MessageContentContext);
  const { languageSelected } = useContext(LanguageContext);

  console.log(title);

  const [deleteBook] = useMutation(BOOK_DELETE_BOOK_MUTATION);

  const [titleEnglish, titleCzech] = title;
  const [authorEnglish, authorCzech] = author;
  const [genreEnglish, genreCzech] = genre;

  const authorCondition =
    languageSelected === "czech" ? authorCzech : authorEnglish;
  const genreCondition =
    languageSelected === "czech" ? genreCzech : genreEnglish;

  const [authorValue, setAuthorValue] = useState(authorCondition);
  const [genreValue, setGenreValue] = useState(genreCondition);
  const [numberOfPagesValue, setNumberOfPagesValue] = useState(numberOfPages);

  const handleOnDelete = async () => {
    const message =
      languageSelected === "czech"
        ? `Smazal si ${titleCzech} knihu`
        : `You have deleted ${titleEnglish} book`;

    await deleteBook({
      variables: { id },
      refetchQueries: [{ query: BOOK_NOT_BORROWED_BOOKS_QUERY }],
    });

    setShowMessage(true);
    setMessageContent(message);
  };

  return (
    <>
      <DialogContent className="modal-content" dividers>
        <div className="modal-left-side">
          <img
            src={`${PUBLIC_FOLDER}/static/images/${imageName}`}
            className="modal-image"
            alt=""
          />
        </div>
        <div className="modal-right-side">
          <Typography className="modal-description-item">
            <TextField
              value={authorValue}
              onChange={(e) => setAuthorValue(e.target.value)}
              label={languageSelected === "czech" ? "Autor" : "Author"}
            />
          </Typography>
          <Typography className="modal-description-item">
            <TextField
              value={genreValue}
              onChange={(e) => setGenreValue(e.target.value)}
              label={languageSelected === "czech" ? "Žánr" : "Genre"}
            />
          </Typography>
          <Typography className="modal-description-item">
            <TextField
              min="0"
              type="number"
              value={numberOfPagesValue}
              onChange={(e) => setNumberOfPagesValue(e.target.value)}
              label={
                languageSelected === "czech"
                  ? "Počet stránek"
                  : "Number of pages"
              }
            />
          </Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained">
          {languageSelected === "czech" ? "Upravit knihu" : "Edit Book"}
        </Button>
        <Button onClick={handleOnDelete} color="primary" variant="contained">
          {languageSelected === "czech" ? "Smazat knihu" : "Delete Book"}
        </Button>
      </DialogActions>
    </>
  );
};

export default AdminModal;
