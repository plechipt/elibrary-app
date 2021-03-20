import React from "react";
import "./SearchBar.css";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const SearchBar = () => {
  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Grid className="searchbar-container" container>
      <Grid item xs={11} sm={8} md={6} lg={4}>
        <form onSubmit={handleOnSubmit} noValidate autoComplete="off">
          <TextField fullWidth label="Search a book..." />
        </form>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
