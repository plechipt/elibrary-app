import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import "./Other.css";

const CustomPagination = ({ count, pageSize, setPage }) => {
  const numberOfPages = Math.ceil(count / pageSize);

  return (
    <>
      {count && pageSize ? (
        <Pagination
          onChange={(e, value) => setPage(value)}
          className="pagination"
          count={numberOfPages < 1 ? 1 : numberOfPages}
          size="large"
          color="primary"
        />
      ) : null}
    </>
  );
};

export default CustomPagination;
