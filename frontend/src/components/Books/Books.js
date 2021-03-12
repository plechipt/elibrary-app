import React from "react";
import "./Books.css";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const PUBLIC_FOLDER = process.env.PUBLIC_URL;

const Books = () => {
  return (
    <div className="books-container">
      <Grid container>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Paper className="book">
            <img
              src={`${PUBLIC_FOLDER}/static/images/hamlet.jpg`}
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

        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Paper className="book">
            <img
              src={`${PUBLIC_FOLDER}/static/images/hobbit.jpg`}
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
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Paper className="book">
            <img
              src={`${PUBLIC_FOLDER}/static/images/the_old_man_and_sea.jpg`}
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

        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Paper className="book">
            <img
              src={`${PUBLIC_FOLDER}/static/images/alice_in_wonderland.jpg`}
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
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Paper className="book">
            <img
              src={`${PUBLIC_FOLDER}/static/images/little_prince.jpg`}
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
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Paper className="book">
            <img
              src={`${PUBLIC_FOLDER}/static/images/great_gatsby.jpg`}
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

        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Paper className="book">
            <img
              src={`${PUBLIC_FOLDER}/static/images/romeo_a_julie.jpg`}
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
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Paper className="book">
            <img
              src={`${PUBLIC_FOLDER}/static/images/lord_of_the_rings.jpg`}
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
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Paper className="book">
            <img
              src={`${PUBLIC_FOLDER}/static/images/don_quijote.jpg`}
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
      </Grid>
    </div>
  );
};

export default Books;
