import axios from 'axios';
const baseUrl = '/api/blogs';

let jwt = null;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (requestBody) => {
  const config = {
    headers: { Authorization: jwt },
  };
  const response = await axios.post(baseUrl, requestBody, config);
  return response.data;
};

const update = async ({ id, ...requestBody }) => {
  const config = {
    headers: { Authorization: jwt },
  };

  const response = await axios.put(`${baseUrl}/${id}`, requestBody, config);

  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: jwt },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const setToken = (token) => {
  jwt = `Bearer ${token}`;
};

export default { getAll, create, update, remove, setToken };
