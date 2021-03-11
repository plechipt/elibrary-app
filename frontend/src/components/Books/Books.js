import React from "react";
import "./Books.css";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Grid";

const Books = () => {
  return (
    <div className="books-container">
      <Grid container>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Paper className="book" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Paper className="book" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Paper className="book" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Paper className="book" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Paper className="book" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Paper className="book" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Paper className="book" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Paper className="book" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Paper className="book" />
        </Grid>
      </Grid>
    </div>
  );
};

export default Books;
