import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().min(3).max(50).required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Daily Rental Rate"),
  };

  async populatingGenres() {
    // first see form then come here
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populatingMovies() {
    // checking if url has new in it, if yes than use need a new movie
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    try {
      // movieId exist, check whether a movie with movieId exists or not
      const { data: movie } = await getMovie(movieId);
      // populating the movieForm by predefined found movie data
      // mapToViewModel(movie) maps our movie to a proper movie object
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  async componentDidMount() {
    this.populatingGenres();
    this.populatingMovies();
  }

  mapToViewModel({ _id, title, genre, numberInStock, dailyRentalRate }) {
    return {
      _id: _id,
      title: title,
      genreId: genre._id,
      numberInStock: numberInStock,
      dailyRentalRate: dailyRentalRate,
    };
  }

  doSubmit = async () => {
    //calling backend
    // this action is only allowed if all data is valid
    await saveMovie(this.state.data);

    this.props.history.push("/movies");
  };
  render() {
    return (
      <div className="row">
        <div className="offset-1 col-10 offset-md-3 col-md-6">
          <h1 className="text-center py-3">Movie Form</h1>
          <hr />
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("title", "Title", "text")}
            {this.renderSelect("genreId", "Genre", this.state.genres)}
            {this.renderInput("numberInStock", "Number In Stock", "number")}
            {this.renderInput("dailyRentalRate", "Rate", "text")}
            {this.renderButton("Save")}
          </form>
        </div>
      </div>
    );
  }
}

export default MovieForm;
