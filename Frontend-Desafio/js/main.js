import { getAllPosts } from "./postsApi.js";
import { renderPosts, handleSort } from "./printAllPosts.js";
import { renderTagCards } from "./printTags.js";
import { validateSession, logIn, logOut } from "./token.js";
import { renderPopularTags, loadPopularTags } from "./popularTags.js";

document.addEventListener("DOMContentLoaded", async () => {
  const postsContainer = document.getElementById("postsContainer");
  const tagsContainer = document.getElementById("tagsContainer");

  const posts = await getAllPosts();
  renderPosts(posts, postsContainer);
  renderTagCards(tagsContainer);

  // Event listeners para los botones de ordenamiento
  const relevantBtn = document.getElementById("relevantBtn");
  relevantBtn.addEventListener("click", () => {
    handleSort("relevant", postsContainer);
    toggleActiveButton(relevantBtn);
  });

  const latestBtn = document.getElementById("latestBtn");
  latestBtn.addEventListener("click", () => {
    handleSort("latest", postsContainer);
    toggleActiveButton(latestBtn);
  });

  const topBtn = document.getElementById("topBtn");
  topBtn.addEventListener("click", () => {
    handleSort("top", postsContainer);
    toggleActiveButton(topBtn);
  });

  // Función para alternar la clase active en los botones
  const toggleActiveButton = (btn) => {
    const allBtns = document.querySelectorAll(".sort-btn");
    allBtns.forEach((button) => {
      button.classList.remove("fw-bold");
    });
    btn.classList.add("fw-bold");
  };
});
