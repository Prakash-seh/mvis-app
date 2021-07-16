import React from "react";
import { Link } from "react-router-dom";

const Customers = () => {
  return (
    <div className="container py-3">
      <h1>Customers</h1>
      <Link to="/movies" className="btn btn-dark">
        Back to home
      </Link>
    </div>
  );
};

export default Customers;
