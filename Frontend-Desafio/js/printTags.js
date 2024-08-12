import { getAllPosts } from "./postsApi.js";

const TAGS = ["#javascript", "#webdev", "#phyton"];

const createCardLinksTags = (tag, posts) => {
  const card = document.createElement("div");
  card.className = "card mb-3 bg-light";

  const cardHeader = document.createElement("div");
  cardHeader.className = "card-header bg-light text-body fw-bold";
  cardHeader.style.fontSize = "1.25rem";
  cardHeader.textContent = tag;
  card.appendChild(cardHeader);

  const listGroup = document.createElement("ul");
  listGroup.className = "list-group list-group-flush";

  posts.forEach((post) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item bg-light text-body";

    const anchor = document.createElement("a");
    anchor.href = `generalPost.html?id=${post.id}`;
    anchor.textContent = post.title;
    anchor.style.textDecoration = "none";
    anchor.style.color = "black"; // Color del texto negro
    anchor.addEventListener("mouseover", () => (anchor.style.color = "black"));
    anchor.addEventListener("mouseout", () => (anchor.style.color = "black"));

    listItem.appendChild(anchor);

    // Añadir comentarios si existen
    if (post.comments && post.comments.length > 0) {
      const comments = document.createElement("p");
      comments.className = "text-muted";
      comments.style.fontSize = "0.875rem"; // Tamaño más pequeño para los comentarios
      const commentsText =
        post.comments.length === 1 ? "comentario" : "comentarios";
      comments.textContent = `${post.comments.length} ${commentsText}`;
      listItem.appendChild(comments);
    }

    listGroup.appendChild(listItem);
  });

  card.appendChild(listGroup);

  return card;
};

const renderTagCards = async (container) => {
  const posts = await getAllPosts();

  TAGS.forEach((tag) => {
    const tagPosts = posts
      .filter((post) => post.tags.includes(tag))
      .slice(0, 5);

    while (tagPosts.length < 5) {
      tagPosts.push({ title: "No more posts", id: "#" });
    }

    // Selecciona aleatoriamente 5 posts para mostrar
    const randomPosts = tagPosts.sort(() => 0.5 - Math.random()).slice(0, 5);
    const card = createCardLinksTags(tag, randomPosts);
    container.appendChild(card);
  });
};

export { renderTagCards };
