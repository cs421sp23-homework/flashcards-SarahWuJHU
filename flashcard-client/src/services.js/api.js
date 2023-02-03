import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9000/",
  headers: {
    Authorization: "",
  },
});

function setToken(token) {
  axiosInstance.defaults.headers.Authorization = token;
}

async function get(url) {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function getAll() {
  const response = await get(`/api/cards`);
  return response.data;
}

async function create(card) {
  try {
    const response = await axiosInstance.post(`/api/cards`, card);
    return response.data.data;
  } catch (err) {
    throw err;
  }
}

async function remove(card) {
  try {
    const response = await axiosInstance.delete(`/api/courses/${card._id}`);
    return response.data.data;
  } catch (err) {
    throw err;
  }
}

async function update(card) {
  try {
    const response = await axiosInstance.patch(
      `/api/courses/${card._id}`,
      card
    );
    return response.data.data;
  } catch (err) {
    throw err;
  }
}

async function register(user) {
  try {
    const response = await axiosInstance.post(`/register`, user);
    return response.data.data;
  } catch (err) {
    throw err;
  }
}

async function authenticate(user) {
  try {
    const response = await axiosInstance.post(`/authenticate`, user);
    return response.data.data;
  } catch (err) {
    throw err;
  }
}

export {setToken, get, getAll, create, remove, update, register, authenticate}