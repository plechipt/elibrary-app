import React, { useState, useContext } from "react";

import { LanguageContext } from "../Contexts/LanguageContext";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

const PUBLIC_FOLDER = process.env.PUBLIC_URL;

const CreateBookModal = ({ openModal, closeModal }) => {
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [numberOfPages, setNumberOfPages] = useState("");

  const { languageSelected } = useContext(LanguageContext);

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
      <DialogContent className="modal-content" dividers>
        <div className="modal-left-side">
          <img
            src={`${PUBLIC_FOLDER}/static/images/default_image.jpg`}
            className="modal-image"
            alt=""
          />
        </div>
        <div className="modal-right-side">
          <Typography className="modal-description-item">
            <TextField
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              label={languageSelected === "czech" ? "Autor" : "Author"}
            />
          </Typography>
          <Typography className="modal-description-item">
            <TextField
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              label={languageSelected === "czech" ? "Žánr" : "Genre"}
            />
          </Typography>
          <Typography className="modal-description-item">
            <TextField
              min="0"
              type="number"
              value={numberOfPages}
              onChange={(e) => setNumberOfPages(e.target.value)}
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
          {languageSelected === "czech" ? "Vytvořit knihu" : "Create book"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBookModal;
