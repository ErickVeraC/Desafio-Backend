const jsonwebtoken = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

function sign(payload) {
  return jsonwebtoken.sign(payload, secret, { expiresIn: "1y" });
}

function verify(token) {
  return jsonwebtoken.verify(token, secret);
}

module.exports = {
  sign,
  verify,
};
