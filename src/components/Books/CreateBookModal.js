import React, { useState, useContext } from "react";
import { LanguageContext } from "../Contexts/LanguageContext";
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

const CreateBookModal = ({ openModal, closeModal }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [numberOfPages, setNumberOfPages] = useState("");
  const [image, setImage] = useState(null);

  const { languageSelected } = useContext(LanguageContext);

  const handleImageChange = (e) => {
    const selected = e.target.files[0];

    let reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(selected);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    console.log("test");

    axiosInstance.post("/books/", {
      title,
      author,
      genre,
      number_of_pages: numberOfPages,
    });
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
            <img
              src={image ? image : DEFAULT_IMAGE}
              className="modal-image"
              alt=""
            />
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
