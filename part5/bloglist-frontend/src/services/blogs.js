import axios from 'axios';
const baseUrl = '/api/blogs';

let jwt = null;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const setToken = (token) => {
  jwt = `Bearer ${token}`;
};

export default { getAll, setToken };
