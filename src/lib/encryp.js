const bcrypt = require("bcryptjs");

const SALT_ROUNDS = 10;

function encrypt(plainText) {
  return bcrypt.hash(plainText, SALT_ROUNDS);
}

function compare(plainText, hash) {
  return bcrypt.compare(plainText, hash);
}

module.exports = {
  encrypt,
  compare,
};
