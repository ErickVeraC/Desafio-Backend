const User = require("../models/user.model");

const createError = require("http-errors");

const encryption = require("../lib/encrypt");

const jwt = require("../lib/jwt");

// funcion para registrar un usuario
async function signup(data) {
  const userFound = await User.findOne({ email: data.email });

  if (userFound) {
    throw createError(409, "User already exists");
  }

  if (!data.password) {
    throw createError(400, "Password is required");
  }

  if (data.password.length < 8) {
    throw createError(400, "Password must be at least 8 characters long");
  }

  const password = await encryption.encrypt(data.password);

  data.password = password;

  const newUser = await User.create(data);

  return newUser;
}

// funcion para loguear un usuario
async function login(data) {
  const user = await User.findOne({ email: data.email }).select("+password");

  if (!user) {
    throw createError(401, "Invalid credentials");
  }

  const isValidPassword = encryption.compare(data.password, user.password);

  if (!isValidPassword) {
    throw createError(401, "Invalid credentials");
  }

  const token = jwt.sign({ id: user._id });

  return token;
}

// funcion para obtener un usuario por su id
async function getById(id) {
  const user = await User.findById(id);
  return user;
}

module.exports = {
  signup,
  login,
  getById,
};
