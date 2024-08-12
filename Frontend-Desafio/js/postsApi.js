const BASE_URL = "https://desafio-backend-jnku.onrender.com/users";

async function createPost(postObject, token) {
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postObject),
  });
}

async function getAllPosts() {
  let response = await fetch(`${BASE_URL}?search=${searchQuery}`);
  let data = await response.json();
  return Object.entries(data).map(([id, post]) => ({ ...post, id }));
}

async function updateLikes(postId, updatedPost, token) {
  await fetch(`${BASE_URL}/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedPost),
  });
}

async function getPostById(postId) {
  const response = await fetch(`${BASE_URL}/${postId}`);
  const data = await response.json();
  return data;
}

async function addLikeToPost(postId, token) {
  try {
    let post = await getPostById(postId);
    let newLikes = (post.likes || 0) + 1;
    post.likes = newLikes;
    await updateLikes(postId, post, token);
    console.log(`Likes actualizados para el post ${postId}.`);
  } catch (error) {
    console.error("Error al actualizar los likes:", error);
  }
}

async function addCommentToPost(postId, comment, token) {
  try {
    let post = await getPostById(postId);
    if (!post.comments) {
      post.comments = [];
    }
    post.comments.push(comment);
    await updateLikes(postId, post, token);
    console.log(`Comentario agregado para el post ${postId}.`);
  } catch (error) {
    console.error("Error al agregar el comentario:", error);
  }
}

export {
  createPost,
  getAllPosts,
  updateLikes,
  getPostById,
  addLikeToPost,
  addCommentToPost,
};
