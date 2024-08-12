import {
  getAllPosts,
  updateLikes,
  addCommentToPost,
  getPostById,
  addLikeToPost,
} from "./postsApi.js";

// Función para contar la frecuencia de los tags
const countTagsFrequency = (posts) => {
  const tagCount = {};
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      const normalizedTag = tag.replace(/^#/, "").toLowerCase();
      tagCount[normalizedTag] = (tagCount[normalizedTag] || 0) + 1;
    });
  });
  return tagCount;
};

// Función para obtener los 8 tags más usados
const getTopTags = (tagCount) => {
  return Object.entries(tagCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([tag]) => tag);
};

// Función para renderizar los tags más populares
const renderPopularTags = (tags, containerId) => {
  const tagsContainer = document.getElementById(containerId);
  tagsContainer.innerHTML = ""; // Limpiar el contenedor antes de renderizar

  tags.forEach((tag) => {
    const tagElement = document.createElement("div");
    tagElement.className = "nav-popular__tag-sidebar-nav-element";
    tagElement.id = `default-sidebar-element-${tag}`;

    const tagLink = document.createElement("a");
    tagLink.className = "nav-popular__tag-link c-link c-link--block";
    tagLink.href = `tags.html?tag=${tag}`;
    tagLink.textContent = `#${tag}`;

    tagElement.appendChild(tagLink);
    tagsContainer.appendChild(tagElement);
  });
};

// Función principal para cargar y renderizar los tags populares
const loadPopularTags = async () => {
  try {
    const posts = await getAllPosts();
    const tagCount = countTagsFrequency(posts);
    const topTags = getTopTags(tagCount);
    renderPopularTags(topTags, "popularTags");
  } catch (error) {
    console.error("Error al cargar y renderizar los tags populares:", error);
  }
};

// Llamar a la función para cargar y renderizar los tags populares al cargar la página
document.addEventListener("DOMContentLoaded", loadPopularTags);

export { renderPopularTags, loadPopularTags };
