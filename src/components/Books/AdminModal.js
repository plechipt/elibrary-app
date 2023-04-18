import React, { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { axiosInstance } from "../axios";
import { useMutation } from "@apollo/client";
import { MessageContext } from "../Contexts/MessageContext";
import { MessageContentContext } from "../Contexts/MessageContentContext";
import {
  BOOK_DELETE_BOOK_MUTATION,
  BOOK_NOT_BORROWED_BOOKS_QUERY,
  BOOK_NOT_BORROWED_BOOKS_COUNT_QUERY,
} from "../Api/books";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import PublishIcon from "@material-ui/icons/Publish";

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];

const AdminModal = ({ id, title, author, genre, numberOfPages, imageName }) => {
  const { t, i18n } = useTranslation();
  const { setShowMessage } = useContext(MessageContext);
  const { setMessageContent } = useContext(MessageContentContext);

  const [loading, setLoading] = useState(false);
  const imageURL = `/static/images/default.jpg`;

  const [errorMessage, setErrorMessage] = useState(null);
  const [deleteBook] = useMutation(BOOK_DELETE_BOOK_MUTATION);

  const [titleEnglish, titleCzech] = title;
  const [authorEnglish, authorCzech] = author;
  const [genreEnglish, genreCzech] = genre;

  const titleCondition = i18n.language === "cs" ? titleCzech : titleEnglish;
  const authorCondition = i18n.language === "cs" ? authorCzech : authorEnglish;
  const genreCondition = i18n.language === "cs" ? genreCzech : genreEnglish;

  const [titleValue, setTitleValue] = useState(titleCondition);
  const [authorValue, setAuthorValue] = useState(authorCondition);
  const [genreValue, setGenreValue] = useState(genreCondition);
  const [numberOfPagesValue, setNumberOfPagesValue] = useState(numberOfPages);
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const titleDidntChange = titleValue === titleCondition;
    const authorDidntChange = authorValue === authorCondition;
    const genreDidntChange = genreValue === genreCondition;
    const numberOfPagesDidntChange = numberOfPagesValue === numberOfPages;

    if (
      titleDidntChange &&
      authorDidntChange &&
      genreDidntChange &&
      numberOfPagesDidntChange &&
      image === null
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [
    titleValue,
    authorValue,
    genreValue,
    numberOfPagesValue,
    image,
    titleCondition,
    authorCondition,
    genreCondition,
    numberOfPages,
  ]);

  const handleImageChange = (e) => {
    setErrorMessage(null);
    const selected = e.target.files[0];
    const isCorrectType = ALLOWED_TYPES.includes(selected.type);

    if (selected && isCorrectType) {
      setImage(selected);

      let reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selected);
    } else {
      const message = t("books.failed_to_preview_image");

      setErrorMessage(message);
    }
  };

  const handleOnEdit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const message = t("books.edit_message");

    let formData = new FormData();
    formData.append("number_of_pages", numberOfPagesValue);

    // Set values to correct language
    if (i18n.language === "cs") {
      formData.append("title_cz", titleValue);
      formData.append("author_cz", authorValue);
      formData.append("genre_cz", genreValue);
    } else {
      formData.append("title", titleValue);
      formData.append("author", authorValue);
      formData.append("genre", genreValue);
    }

    // Add image if it was attached
    if (image) {
      formData.append("image", image);
    }

    await axiosInstance
      .put(`/books/${id}/`, formData)
      .catch((err) => {
        console.log(err.response);
      })
      .then(() => {
        setLoading(false);
      });

    // Reset website
    window.location.reload();
    setShowMessage(true);
    setMessageContent(message);
  };

  const handleOnDelete = async () => {
    setLoading(true);

    const titleName = i18n.language === "cs" ? titleCzech : titleEnglish;
    const message = i18n.t("books.delete_message", { title: titleName });

    await deleteBook({
      variables: { id },
      refetchQueries: [
        { query: BOOK_NOT_BORROWED_BOOKS_COUNT_QUERY },
        { query: BOOK_NOT_BORROWED_BOOKS_QUERY, variables: { page: 1 } },
      ],
    });

    // Show success message
    setShowMessage(true);
    setMessageContent(message);
    setLoading(false);

    //Scroll to top
    window.location.reload();
    window.scrollTo(0, 0);
  };

  return (
    <>
      <DialogContent className="modal-content" dividers>
        <div className="modal-left-side">
          {errorMessage ? (
            <Typography className="modal-error-message" variant="h5">
              {errorMessage}
            </Typography>
          ) : (
            <img
              src={imagePreview ? imagePreview : imageURL}
              className="modal-image"
              alt=""
            />
          )}
          <Button
            className="upload-button"
            type="submit"
            variant="contained"
            color="primary"
            component="label"
            startIcon={<PublishIcon />}
          >
            {t("books.upload_image")}
            <input onChange={handleImageChange} type="file" hidden />
          </Button>
        </div>
        <div className="modal-right-side">
          <Typography className="modal-description-item">
            <TextField
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              label={t("books.title")}
            />
          </Typography>
          <Typography className="modal-description-item">
            <TextField
              value={authorValue}
              onChange={(e) => setAuthorValue(e.target.value)}
              label={t("books.author")}
            />
          </Typography>
          <Typography className="modal-description-item">
            <TextField
              value={genreValue}
              onChange={(e) => setGenreValue(e.target.value)}
              label={t("books.genre")}
            />
          </Typography>
          <Typography className="modal-description-item">
            <TextField
              min="0"
              type="number"
              value={numberOfPagesValue}
              onChange={(e) => setNumberOfPagesValue(e.target.value)}
              label={t("books.number_of_pages")}
            />
          </Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={loading}
          onClick={handleOnEdit}
          color="primary"
          variant="contained"
        >
          {t("books.edit_book")}
        </Button>
        <Button onClick={handleOnDelete} color="primary" variant="contained">
          {t("books.delete_book")}
        </Button>
      </DialogActions>
    </>
  );
};

export default AdminModal;
