// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:5144/api";

const getAuthToken = () => {
  return JSON.parse(localStorage.getItem("token"));
};

const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    username,
    password,
  });
  if (response.data.token) {
    localStorage.setItem("token", JSON.stringify(response.data.token));
  }
  return response.data;
};

const fetchUsers = async () => {
  const token = getAuthToken();
  const response = await axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const registerUser = async (user) => {
  const token = getAuthToken();
  const response = await axios.post(`${API_URL}/users`, user, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const logout = () => {
  localStorage.removeItem("token");
};

export { login, fetchUsers, registerUser, logout };
