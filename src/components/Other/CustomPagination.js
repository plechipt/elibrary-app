import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import "./Other.css";

const CustomPagination = ({ count, pageSize }) => {
  const numberOfPages = Math.ceil(count / pageSize);

  return (
    <>
      {count && pageSize ? (
        <Pagination
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
