import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import auth from "./../services/authService";
import { Link } from "react-router-dom";

class MovieTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={"/movies/" + movie._id} className="text-decoration-none">
          {movie.title}
        </Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) =>
        auth.getCurrentUser() &&
        auth.getCurrentUser().isAdmin && (
          <button
            onClick={() => this.props.onDelete(movie._id)}
            className="btn btn-danger btn-sm shadow-sm"
          >
            <i className="bi bi-trash"></i>
          </button>
        ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        data={movies}
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default MovieTable;
