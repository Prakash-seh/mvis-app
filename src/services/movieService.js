import http from "./httpServices";

const apiEndpoint = "movies";

export function getMovies() {
  return http.get(apiEndpoint);
}

export function deleteMovie(id) {
  return http.delete(apiEndpoint + "/" + id);
}

export function getMovie(id) {
  return http.get(apiEndpoint + "/" + id);
}

export function saveMovie(movie) {
  if (movie._id) {
    const data = { ...movie };
    delete data._id;
    return http.put(apiEndpoint + "/" + movie._id, data);
  }
  return http.post(apiEndpoint, movie);
}
