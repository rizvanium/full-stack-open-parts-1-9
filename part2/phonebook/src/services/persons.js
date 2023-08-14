import axios from "axios";

const BACKEND_BASE_URL = 'http://localhost:3001';
const PERSONS_URL = `${BACKEND_BASE_URL}/persons`;

const getAll = () => {
  return axios
    .get(PERSONS_URL)
    .then(response => response.data);
}

const create = person => {
  return axios
    .post(PERSONS_URL, person)
    .then(response => response.data);
}

const remove = (id) => {
  return axios
    .delete(`${PERSONS_URL}/${id}`);
}

export default {
  getAll,
  create,
  remove
};