const bcrypt = require("bcryptjs");

const SALT_ROUNDS = 10; // toma la contraseña y la encripta 10 veces

function encrypt(plainText) {
  return bcrypt.hashSync(plainText, SALT_ROUNDS);
}

function compare(plainText, hash) {
  // hash es la contraseña ya encriptada
  return bcrypt.compareSync(plainText, hash); // compareSync compara la contraseña en texto plano con la contraseña encriptada y regresa un booleano
}

module.exports = {
  encrypt,
  compare,
};
