import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "./../utils/paginate";
import { getGenres } from "../services/genreService";
import MovieTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    pageSize: 8,
    searchQuery: "",
    selectedItem: null,
  };

  async componentDidMount() {
    const { data: data_genres } = await getGenres();
    const { data: data_movies } = await getMovies();
    const genres = [{ _id: 0, name: "All Genres" }, ...data_genres];
    this.setState({ movies: data_movies, genres: genres });
  }

  handleDelete = async (movieId) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((movie) => movie._id !== movieId);
    this.setState({ movies });
    try {
      await deleteMovie(movieId);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted");
      }
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies: movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleItemSelect = (item) => {
    // as input is a controlled field, so we don't set the searchQuery to null instead we use "" so that it remain controlled before
    this.setState({ selectedItem: item, searchQuery: "", currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (searchTerm) => {
    // here selectedGenre value = null doesn't matter
    // as it is only used to apply the styles
    // i.e. is-active class( please refer to listGroup for more info )
    this.setState({
      searchQuery: searchTerm,
      selectedGenre: null,
      currentPage: 1,
    });
  };

  getPageData = () => {
    const {
      movies: allMovies,
      currentPage,
      pageSize,
      sortColumn,
      selectedItem,
      searchQuery,
    } = this.state;

    let filtered = allMovies;

    // result based on the search term
    if (searchQuery) {
      filtered = allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      // result based on the selected Genre
    } else if (selectedItem && selectedItem._id) {
      filtered = allMovies.filter(
        (movie) => movie.genre._id === selectedItem._id
      );
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const {
      genres,
      currentPage,
      pageSize,
      sortColumn,
      selectedItem,
      searchQuery,
    } = this.state;

    const { user } = this.props;

    const { totalCount, data: movies } = this.getPageData();

    return (
      <div className="container-lg">
        <div className="row m-2">
          <div className="col-md-3 col-lg-3 col-xl-3 d-none d-md-block">
            <ListGroup
              items={genres}
              selectedItem={selectedItem}
              onItemSelect={this.handleItemSelect}
            />
          </div>
          <div className="col-md-9 col-lg-9 col-xl-9">
            {user && (
              <Link
                to="/movies/new"
                className="btn btn-primary btn-sm shadow-sm"
              >
                New Movie
              </Link>
            )}
            <p className="mt-2">Showing {totalCount} movies in the database</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <MovieTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
