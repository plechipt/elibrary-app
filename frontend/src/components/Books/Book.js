import React from "react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const PUBLIC_FOLDER = process.env.PUBLIC_URL;

const Book = ({ id, title, author, numberOfPages, genre, imageName }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Paper className="book">
        <img
          src={`${PUBLIC_FOLDER}/static/images/${imageName}`}
          className="card-img-top"
          alt=""
        />
        <Button
          fullWidth
          className="book-button"
          color="primary"
          variant="contained"
          size="large"
        >
          More Info
        </Button>
      </Paper>
    </Grid>
  );
};

export default Book;
