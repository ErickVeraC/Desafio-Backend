const BASE_URL = "https://js23-kodemia-default-rtdb.firebaseio.com/posts";

const createPost = async (postObject) => {
  postObject.timestamp = new Date().toISOString();
  let response = await fetch(`${BASE_URL}.json`, {
    method: "POST",
    body: JSON.stringify(postObject),
  });
  let data = await response.json();
  return data.name;
};

const getAllPosts = async () => {
  let response = await fetch(`${BASE_URL}.json`);
  let data = await response.json();
  return Object.entries(data).map(([id, post]) => ({ ...post, id }));
};

const updateLikes = async (postId, newLikes) => {
  await fetch(`${BASE_URL}/${postId}/likes.json`, {
    method: "PUT",
    body: JSON.stringify(newLikes),
  });
};

const getPostById = async (postId) => {
  let response = await fetch(`${BASE_URL}/${postId}.json`);
  let data = await response.json();
  return data;
};

const addLikeToPost = async (postId) => {
  try {
    let post = await getPostById(postId);
    let newLikes = (post.likes || 0) + 1;
    await updateLikes(postId, newLikes);
    console.log(`Likes actualizados para el post ${postId}.`);
  } catch (error) {
    console.error("Error al actualizar los likes:", error);
  }
};

const addCommentToPost = async (postId, comment) => {
  try {
    let post = await getPostById(postId);
    if (!post.comments) {
      post.comments = [];
    }
    post.comments.push(comment);
    await fetch(`${BASE_URL}/${postId}/comments.json`, {
      method: "PUT",
      body: JSON.stringify(post.comments),
    });
    console.log(`Comentario agregado para el post ${postId}.`);
  } catch (error) {
    console.error("Error al agregar el comentario:", error);
  }
};

export {
  createPost,
  getAllPosts,
  updateLikes,
  getPostById,
  addLikeToPost,
  addCommentToPost,
};
