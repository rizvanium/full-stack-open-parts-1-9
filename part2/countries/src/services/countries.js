import axios from "axios"

const BASE_URL = 'https://studies.cs.helsinki.fi/restcountries/api';

const getAll = () => {
  return axios
    .get(`${BASE_URL}/all`)
    .then(response => response.data);
}

const findByName = (name) => {
  return axios
    .get(`${BASE_URL}/name/${name}`)
    .then(response => response.data);
}

export default {
  getAll,
  findByName
}