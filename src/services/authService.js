import http from "./httpServices";
import jwtDecode from "jwt-decode";

const apiEndpoint = "auth";

export async function login(user) {
  const { data } = await http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
  });
  localStorage.setItem("token", data);
}

export function loginWithJwt(token) {
  localStorage.setItem("token", token);
}

export function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem("token");
    return jwtDecode(token);
  } catch (ex) {
    return null;
  }
}

// this is added to remove bidirectional dependencies
// here we telling http to set jwt
http.setJwt(localStorage.getItem("token"));

const authServices = { login, loginWithJwt, logout, getCurrentUser };

export default authServices;
