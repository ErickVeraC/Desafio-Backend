const User = require("../models/user.model");

const createError = require("http-errors");

const encryp = require("../lib/encrypt");

const jwt = require("../lib/jwt");

/*
Funcion para crear un post
Funcion para obtener todos los posts
Funcion para obtener un post por su id
Funcion para actualizar un post
Funcion para eliminar un post
*/

// Funcion para crear un post
async function create(data) {
  const newPost = await Post.create(data);
  return newPost;
}

// Funcion para obtener todos los posts
async function getAll() {
  const posts = await Post.find({});
  return posts;
}

// Funcion para obtener un post por su id
async function getById(id) {
  const post = await Post.findById(id);
  return post;
}

// Funcion para actualizar un post
async function update(id, newData) {
  const postFound = await Post.findByIdAndUpdate(id);

  if (!postFound) {
    throw createError(404, "Post not found");
  }
  const post = await Post.findByIdAndUpdate(id, newData, { new: true });
}

// Funcion para eliminar un post
async function remove(id) {
  const postFound = await Post.findByIdAndDelete(id);

  if (!postFound) {
    throw createError(404, "Post not found");
  }

  const deletedPost = await Post.findByIdAndDelete(id);
  return deletedPost;
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
