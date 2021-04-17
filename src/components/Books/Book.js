import React, { useState, useContext } from "react";
import { LanguageContext } from "../Contexts/LanguageContext";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import BookModal from "./BookModal";

const PUBLIC_FOLDER = process.env.PUBLIC_URL;

const Book = ({
  isBorrowed,
  id,
  title,
  author,
  genre,
  numberOfPages,
  imageName,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const { languageSelected } = useContext(LanguageContext);

  const [titleEnglish, titleCzech] = title;

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Paper className="book">
        <img
          onClick={() => setOpenModal(true)}
          src={`${PUBLIC_FOLDER}/static/images/${imageName}`}
          title={languageSelected === "czech" ? titleCzech : titleEnglish}
          alt=""
        />
        <Button
          onClick={() => setOpenModal(true)}
          fullWidth
          color="primary"
          variant="contained"
          size="large"
        >
          {languageSelected === "czech" ? "Více info" : "More info"}
        </Button>
      </Paper>
      <BookModal
        isBorrowed={isBorrowed}
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
        id={id}
        title={title}
        author={author}
        numberOfPages={numberOfPages}
        genre={genre}
        imageName={imageName}
      />
    </Grid>
  );
};

export default Book;
