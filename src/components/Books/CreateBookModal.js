import React, { useState, useContext } from "react";
import { MessageContext } from "../Contexts/MessageContext";
import { MessageContentContext } from "../Contexts/MessageContentContext";
import { LanguageContext } from "../Contexts/LanguageContext";
import { axiosInstance } from "../axios";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import PublishIcon from "@material-ui/icons/Publish";

const PUBLIC_FOLDER = process.env.PUBLIC_URL;
const DEFAULT_IMAGE = `${PUBLIC_FOLDER}/static/images/default.jpg`;
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];

const CreateBookModal = ({ openModal, closeModal }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [numberOfPages, setNumberOfPages] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const history = useHistory();
  const { setShowMessage } = useContext(MessageContext);
  const { setMessageContent } = useContext(MessageContentContext);

  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { languageSelected } = useContext(LanguageContext);

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

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const message =
      languageSelected === "czech"
        ? `Uspěšná vytvořena ${title} kniha`
        : `Successfully created ${title} book`;

    let formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("genre", genre);
    formData.append("number_of_pages", numberOfPages);

    // If image was attached -> add image
    if (image) {
      formData.append("image", image);
    }

    await axiosInstance.post("/books/", formData).catch((err) => {
      console.log(err.response);
    });

    history.got(0); // Reset website
    setShowMessage(true);
    setMessageContent(message);
  };

  return (
    <Dialog
      open={openModal}
      onClose={closeModal}
      aria-labelledby="customized-dialog-title"
    >
      <DialogTitle onClose={closeModal}>
        <div className="modal-header">
          <span className="modal-title">
            {languageSelected === "czech" ? "Vytvořit knihu" : "Create book"}
          </span>
        </div>
      </DialogTitle>
      <form onSubmit={handleOnSubmit}>
        <DialogContent className="modal-content" dividers>
          <div className="modal-left-side">
            {errorMessage ? (
              <Typography className="modal-error-message" variant="h5">
                {errorMessage}
              </Typography>
            ) : (
              <img
                src={imagePreview ? imagePreview : DEFAULT_IMAGE}
                className="modal-image"
                alt=""
              />
            )}
            <Button
              className="upload-button"
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
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                label={languageSelected === "czech" ? "Název" : "Title"}
                InputLabelProps={{ required: false }}
              />
            </Typography>
            <Typography className="modal-description-item">
              <TextField
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                label={languageSelected === "czech" ? "Autor" : "Author"}
                InputLabelProps={{ required: false }}
              />
            </Typography>
            <Typography className="modal-description-item">
              <TextField
                required
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                label={languageSelected === "czech" ? "Žánr" : "Genre"}
                InputLabelProps={{ required: false }}
              />
            </Typography>
            <Typography className="modal-description-item">
              <TextField
                required
                min="0"
                type="number"
                value={numberOfPages}
                onChange={(e) => setNumberOfPages(e.target.value)}
                InputLabelProps={{ required: false }}
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
          <Button type="submit" color="primary" variant="contained">
            {languageSelected === "czech" ? "Vytvořit knihu" : "Create book"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateBookModal;
