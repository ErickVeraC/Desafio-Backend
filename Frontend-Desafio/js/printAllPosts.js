// Importar funciones necesarias de otros archivos
import { getAllPosts, getPostById } from "./postsApi.js";

// Función para mostrar las etiquetas en el contenedor
const renderTags = (tags, tagsContainer) => {
  tags.forEach((tag) => {
    const tagElement = document.createElement("a");
    tagElement.href = `tags.html?tag=${tag.replace(/^#/, "")}`;
    tagElement.className = "tag-link text-secondary";
    tagElement.textContent = `#${tag.replace(/^#/, "")}`;
    tagElement.style.textDecoration = "none";
    tagsContainer.appendChild(tagElement);
  });
};

// Función para crear una card
const createCard = (post, isFirst) => {
  const cardLink = document.createElement("div");
  cardLink.style.width = "100%";
  cardLink.className = "card mb-3";
  cardLink.style.textDecoration = "none";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  cardBody.style.height = "auto";

  const cardImg = document.createElement("img");
  cardImg.src = post.image; // Usamos post.image del backend
  cardImg.className = "card-img-top img-fluid";
  cardImg.alt = post.title;
  cardImg.classList.add("card-box");

  if (!isFirst) {
    cardImg.style.display = "none";
  } else {
    cardImg.style.width = "100%";
    cardImg.style.margin = "0";
    cardImg.style.padding = "0";
    cardBody.appendChild(cardImg);
  }

  const authorAndDate = document.createElement("div");
  const author = document.createElement("small");
  author.className = "text-muted fw-bold d-block";
  author.textContent = post.user;
  const date = document.createElement("small");
  date.className = "text-muted d-block";
  date.textContent = new Date(post.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  authorAndDate.appendChild(author);
  authorAndDate.appendChild(date);

  const cardTitle = document.createElement("a");
  cardTitle.href = `generalPost.html?id=${post.id}`;
  cardTitle.className = "card-title h5 my-3";
  cardTitle.textContent = post.title;
  cardTitle.addEventListener("mouseover", () => {
    cardTitle.style.color = "blue";
  });
  cardTitle.addEventListener("mouseout", () => {
    cardTitle.style.color = "black";
  });
  cardTitle.style.textDecoration = "none";
  cardTitle.style.display = "block";

  const tagsContainer = document.createElement("div");
  tagsContainer.className = "mb-2";
  renderTags(post.tags, tagsContainer); // Asumiendo que `post.tags` es un array de strings

  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.textContent = post.body.split(" ").slice(0, 12).join(" ") + "..."; // Usamos post.body para el texto de la card
  cardText.style.textDecoration = "none";

  cardBody.appendChild(authorAndDate);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(tagsContainer);
  cardBody.appendChild(cardText);
  cardLink.appendChild(cardBody);

  return cardLink;
};

document.addEventListener("DOMContentLoaded", async () => {
  const response = await getAllPosts();

  const posts = response.data.posts;

  if (!Array.isArray(posts)) {
    console.error("Expected an array but got:", posts);
    return;
  }

  const cardContainer = document.getElementById("card-container");

  posts.forEach((post, index) => {
    const card = createCard(post, index === 0); // Pasamos `index === 0` como `isFirst`
    cardContainer.appendChild(card);
  });
});

// Función para renderizar los posts en el contenedor
const renderPosts = (posts, postsContainer) => {
  postsContainer.innerHTML = "";
  posts.forEach((post, index) => {
    const card = createCard(post, index === 0);
    postsContainer.appendChild(card);
  });
};

// Función para filtrar los posts según la búsqueda
const filterPosts = (posts, searchTerm) => {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  // Separar los posts que tienen una coincidencia exacta en el título
  const exactMatches = posts.filter((post) =>
    post.title.toLowerCase().includes(lowerCaseSearchTerm)
  );

  // Incluir también los posts que tienen coincidencias en el contenido
  const contentMatches = posts.filter(
    (post) =>
      post.body.toLowerCase().includes(lowerCaseSearchTerm) &&
      !post.title.toLowerCase().includes(lowerCaseSearchTerm)
  );

  // Combinar ambas listas, priorizando a los títulos
  return [...exactMatches, ...contentMatches];
};

// Función para manejar la búsqueda de posts
const handleSearch = async (event) => {
  const searchTerm = event.target.value;
  const postsContainer = document.getElementById("postsContainer");
  const posts = await getAllPosts();
  const filteredPosts = filterPosts(posts, searchTerm);
  renderPosts(filteredPosts, postsContainer);
};

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");

  if (searchButton) {
    searchButton.addEventListener("click", () => {
      searchInput.classList.toggle("d-none");
      searchInput.focus();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", handleSearch);
  }

  validateSession();
});

// Función para manejar el ordenamiento de posts
const handleSort = async (sortType, postsContainer) => {
  try {
    const posts = await getAllPosts();
    renderPosts(posts, postsContainer); // Ordenamiento manual removido
  } catch (error) {
    console.error("Error al ordenar y renderizar los posts:", error);
  }
};

// Función para obtener el ID del post desde la URL
const getPostIdFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
};

// Función para cargar un post individual
const loadPost = async (postId, postContainer) => {
  try {
    const post = await getPostById(postId);
    if (post) {
      const card = createCard(post, true);
      postContainer.appendChild(card);
    } else {
      console.error(`No se encontró el post con ID: ${postId}`);
    }
  } catch (error) {
    console.error("Error al cargar el post:", error);
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  const postId = getPostIdFromUrl();
  if (postId) {
    const postContainer = document.getElementById("postContainer");
    await loadPost(postId, postContainer);
  }
});

export { renderPosts, handleSort, getPostIdFromUrl, loadPost };
