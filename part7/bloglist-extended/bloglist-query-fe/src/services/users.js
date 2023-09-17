import axios from 'axios';
const baseUrl = '/api/users';

let jwt = null;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const get = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const setToken = (token) => {
  jwt = `Bearer ${token}`;
};

export default { getAll, get, setToken };
