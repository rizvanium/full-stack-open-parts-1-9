require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URI =
  process.env === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;
const SECRET = process.env.SECRET;
const HASH_SALT_ROUNDS = +process.env.HASH_SALT_ROUNDS ?? 10;

module.exports = {
  PORT,
  MONGODB_URI,
  SECRET,
  HASH_SALT_ROUNDS,
};
