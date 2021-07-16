import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container py-3">
      <h1>Not Found</h1>
      <Link to="/movies" className="btn btn-dark">
        Back to home
      </Link>
    </div>
  );
};

export default NotFound;
