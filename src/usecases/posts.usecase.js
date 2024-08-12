const Post = require("../models/post.model");
const createError = require("http-errors");

// Funcion para crear un post
async function create(data) {
  const newPost = await Post.create(data);
  return newPost;
}

// Funcion para obtener todos los posts
async function getAll({ search }) {
  const query = search ? { title: new RegExp(search, "i") } : {};
  const posts = await Post.find(query);
  return posts;
}

// Funcion para actualizar un post
async function update(id, newData) {
  const postFound = await Post.findById(id);

  if (!postFound) {
    throw createError(404, "Post not found");
  }

  Object.assign(postFound, newData);
  await postFound.save();
  return postFound;
}

// Funcion para eliminar un post
async function remove(id, userId) {
  const postFound = await Post.findById(id);

  if (!postFound) {
    throw createError(404, "Post not found");
  }

  if (postFound.user.toString() !== userId.toString()) {
    throw createError(403, "Not authorized to delete this post");
  }

  await postFound.remove();
  return postFound;
}

module.exports = {
  create,
  getAll,
  update,
  remove,
};
