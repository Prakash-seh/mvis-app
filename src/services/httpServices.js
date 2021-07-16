import axios from "axios";
import { toast } from "react-toastify";

//default axios baseURL
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

//no need to export as it intercepts the response in http request/response pipeline
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  // !expectedError === unexpected error
  if (!expectedError) {
    console.log("unexpected error occured : " + error);
    toast.error("unexpected error : Something failed");
  }

  return Promise.reject(error);
});

//for getting accessing the pages that required authorization like editing a movie
export function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-secret"] = jwt;
}

const ports = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};

export default ports;
