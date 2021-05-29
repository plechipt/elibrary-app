import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { MessageContext } from "../Contexts/MessageContext";
import { MessageContentContext } from "../Contexts/MessageContentContext";
import { axiosInstance } from "../axios";

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

  const { t } = useTranslation();
  const { setShowMessage } = useContext(MessageContext);
  const { setMessageContent } = useContext(MessageContentContext);

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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

  const handleOnSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const message = t("books.create_message");

    let formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("genre", genre);
    formData.append("number_of_pages", numberOfPages);

    // If image was attached -> add image
    if (image) {
      formData.append("image", image);
    }

    await axiosInstance
      .post("/books/", formData)
      .catch((err) => {
        console.log(err.response);
      })
      .then(() => {
        setLoading(false);
      });

    window.location.reload(); // Reset website
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
          <span className="modal-title">{t("books.create_book")}</span>
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
              {t("books.upload_image")}
              <input onChange={handleImageChange} type="file" hidden />
            </Button>
          </div>
          <div className="modal-right-side">
            <Typography className="modal-description-item">
              <TextField
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                label={t("books.title")}
                InputLabelProps={{ required: false }}
              />
            </Typography>
            <Typography className="modal-description-item">
              <TextField
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                label={t("books.author")}
                InputLabelProps={{ required: false }}
              />
            </Typography>
            <Typography className="modal-description-item">
              <TextField
                required
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                label={t("books.genre")}
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
                label={t("books.number_of_pages")}
              />
            </Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={loading}
            type="submit"
            color="primary"
            variant="contained"
          >
            {t("books.create_book")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateBookModal;
