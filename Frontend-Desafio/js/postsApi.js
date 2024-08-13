const BASE_URL = "https://desafio-backend-jnku.onrender.com";

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
  try {
    const response = await fetch(`${BASE_URL}/post`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data); // <-- Verifica la estructura aquí
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return []; // Devuelve un array vacío en caso de error
  }
}

async function getPostById(postId) {
  const response = await fetch(`${BASE_URL}/${postId}`);
  const data = await response.json();
  return data;
}

export { createPost, getAllPosts, getPostById };
