import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import BookModal from "./BookModal";

//const PUBLIC_FOLDER = process.env.PUBLIC_URL;
const BUCKET_URL = process.env.REACT_APP_BUCKET_URL;

const Book = ({
  isBorrowed,
  id,
  title,
  author,
  genre,
  numberOfPages,
  imageName,
}) => {
  const { t, i18n } = useTranslation();
  const [openModal, setOpenModal] = useState(false);

  const [titleEnglish, titleCzech] = title;

  return (
    <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
      <Paper className="book">
        <img
          onClick={() => setOpenModal(true)}
          src={`${BUCKET_URL}/static/images/${imageName}`}
          title={i18n.language === "cs" ? titleCzech : titleEnglish}
          alt=""
        />
        <Button
          onClick={() => setOpenModal(true)}
          fullWidth
          color="primary"
          variant="contained"
          size="large"
        >
          {t("books.more_info")}
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
