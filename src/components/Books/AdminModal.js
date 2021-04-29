import React, { useState, useContext } from "react";
import { axiosInstance } from "../axios";
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
import PublishIcon from "@material-ui/icons/Publish";

const PUBLIC_FOLDER = process.env.PUBLIC_URL;
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];

const AdminModal = ({ id, title, author, genre, numberOfPages, imageName }) => {
  const { setShowMessage } = useContext(MessageContext);
  const { setMessageContent } = useContext(MessageContentContext);
  const { languageSelected } = useContext(LanguageContext);

  const imageURL = `${PUBLIC_FOLDER}/static/images/${imageName}`;

  const [errorMessage, setErrorMessage] = useState(null);
  const [deleteBook] = useMutation(BOOK_DELETE_BOOK_MUTATION);

  const [titleEnglish, titleCzech] = title;
  const [authorEnglish, authorCzech] = author;
  const [genreEnglish, genreCzech] = genre;

  const titleCondition =
    languageSelected === "czech" ? titleCzech : titleEnglish;
  const authorCondition =
    languageSelected === "czech" ? authorCzech : authorEnglish;
  const genreCondition =
    languageSelected === "czech" ? genreCzech : genreEnglish;

  const [titleValue, setTitleValue] = useState(titleCondition);
  const [authorValue, setAuthorValue] = useState(authorCondition);
  const [genreValue, setGenreValue] = useState(genreCondition);
  const [numberOfPagesValue, setNumberOfPagesValue] = useState(numberOfPages);
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);

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
      const message =
        languageSelected === "czech"
          ? "Přiložený soubor není obrázek!"
          : "Attached file is not image!";

      setErrorMessage(message);
    }
  };

  const handleOnEdit = async (e) => {
    e.preventDefault();
    const message =
      languageSelected === "czech"
        ? `Uspěšně upravena ${titleCzech} kniha`
        : `Successfully edited ${titleEnglish} book`;

    let formData = new FormData();
    formData.append("title", titleValue);
    formData.append("author", authorValue);
    formData.append("genre", genreValue);
    formData.append("number_of_pages", numberOfPagesValue);

    // If image was attached -> add image
    if (image) {
      formData.append("image", image);
    }

    await axiosInstance.put(`/books/${id}/`, formData).catch((err) => {
      console.log(err.response);
    });

    // Reset website
    //window.location.reload();
    setShowMessage(true);
    setMessageContent(message);
    console.log("test");
  };

  const handleOnDelete = async () => {
    const message =
      languageSelected === "czech"
        ? `Smazal si ${titleCzech} knihu`
        : `You have deleted ${titleEnglish} book`;

    await deleteBook({
      variables: { id },
      refetchQueries: [{ query: BOOK_NOT_BORROWED_BOOKS_QUERY }],
    });

    // Show success message
    setShowMessage(true);
    setMessageContent(message);

    //Scroll to top
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
            {languageSelected === "czech" ? "Nahrát obrázek" : "Upload image"}
            <input onChange={handleImageChange} type="file" hidden />
          </Button>
        </div>
        <div className="modal-right-side">
          <Typography className="modal-description-item">
            <TextField
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              label={languageSelected === "czech" ? "Název" : "Title"}
            />
          </Typography>
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
        <Button onClick={handleOnEdit} color="primary" variant="contained">
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
