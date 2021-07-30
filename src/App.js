import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Switch, Redirect } from "react-router";
import Navbar from "./components/navbar";
import MovieForm from "./components/movieForm";
import Movies from "./components/movies";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import Register from "./components/register";
import Logout from "./components/logout";
import Profile from "./components/profile";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};

  // componentDidMount called only once when App component is called
  // then its re-render the view but don't call componentDidMount again
  // so we need to refresh the app to see the user changes
  // that's why we refresh app component after registration and login
  // to see the changes
  // for details go to authServices
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <>
        <ToastContainer />
        <Navbar user={user} />
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          {/* <Route
              path="/movies/:id"
              render={(props) => {
                if (!user) return <Redirect to="/login" />;
                else return <MovieForm {...props} />;
              }}
            /> */}
          <ProtectedRoute path="/movies/:id" component={MovieForm} />
          <Route
            path="/movies"
            render={(props) => <Movies user={this.state.user} {...props} />}
          />
          <ProtectedRoute path="/profile" component={Profile} />
          <Route path="/not-found" component={NotFound} />

          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </>
    );
  }
}

export default App;
