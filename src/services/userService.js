import http from "./httpServices";

const apiEndpoint = "users";

export function registerUser(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    name: user.name,
    password: user.password,
  });
}
