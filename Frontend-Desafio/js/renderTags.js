import { getAllPosts } from "./postsApi.js";

const params = new URLSearchParams(window.location.search);
const tag = params.get("tag");
const postsContainer = document.getElementById("postsContainer");

const renderPosts = async (tag) => {
  const posts = await getAllPosts();
  const filteredPosts = posts.filter((post) => post.tags.includes(`#${tag}`));

  filteredPosts.forEach((post) => {
    const card = document.createElement("div");
    card.className = "card w-75 mb-3 mt-3";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const authorAndDate = document.createElement("div");
    const author = document.createElement("small");
    author.className = "text-muted fw-bold d-block";
    author.textContent = post.user;

    const date = document.createElement("small");
    date.className = "text-muted d-block";
    date.textContent = new Date(post.timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    authorAndDate.appendChild(author);
    authorAndDate.appendChild(date);

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = post.title;

    const cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.textContent =
      post.abstract.split(" ").slice(0, 20).join(" ") + "...";

    const reactions = document.createElement("div");
    const likeCount = document.createElement("span");
    likeCount.className = "me-3";
    likeCount.textContent = `${post.likes || 0} Likes`;

    const commentCount = document.createElement("span");
    const numComments = post.comments ? post.comments.length : 0;
    commentCount.textContent =
      numComments === 1 ? "1 comentario" : `${numComments} comentarios`;

    reactions.appendChild(likeCount);
    reactions.appendChild(commentCount);

    cardBody.appendChild(authorAndDate);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(reactions);

    card.appendChild(cardBody);
    postsContainer.appendChild(card);
  });
};

if (tag) {
  renderPosts(tag);
} else {
  const messageElement = document.createElement("p");
  messageElement.textContent = "Please provide a tag in the URL.";
  postsContainer.appendChild(messageElement);
}

// new funntions

export const validateSession = () => {
  let hasToken = localStorage.getItem("token");
  let createPostBtn = document.getElementById("createPostBtn");
  let notifications = document.getElementById("notifications");
  let avatar = document.getElementById("avatar");
  let createAccount = document.getElementById("createAccount");
  let logOutBtn = document.getElementById("logOutBtn");
  let cardlogin = document.getElementById("card-login");

  if (!hasToken) {
    if (createPostBtn) createPostBtn.classList.remove("d-md-block");
    if (avatar) avatar.classList.add("d-none");
    if (notifications) notifications.classList.add("d-none");
    if (createAccount) createAccount.classList.add("d-md-block");
    if (logOutBtn) logOutBtn.classList.add("d-none");
    if (cardlogin) cardlogin.classList.add("d-md-block");
  } else {
    if (createPostBtn) createPostBtn.classList.add("d-md-block");
    if (avatar) avatar.classList.remove("d-none");
    if (notifications) notifications.classList.remove("d-none");
    if (createAccount) createAccount.classList.remove("d-md-block");
    if (logOutBtn) logOutBtn.classList.remove("d-none");
    if (cardlogin) cardlogin.classList.add("d-none");
  }
};

export const logIn = () => {
  localStorage.setItem("token", "exampleToken");
  validateSession();
};

export const logOut = () => {
  localStorage.removeItem("token");
  validateSession();
};

document.addEventListener("DOMContentLoaded", () => {
  validateSession();

  let loginButton = document.getElementById("login-button");
  if (loginButton) {
    loginButton.addEventListener("click", (event) => {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (email && password) {
        logIn();
        window.location.href = "/";
      } else {
        alert("Por favor, completa todos los campos.");
      }
    });
  }

  let logOutBtn = document.getElementById("logOutBtn");
  if (logOutBtn) {
    logOutBtn.addEventListener("click", (event) => {
      event.preventDefault();
      logOut();
      window.location.href = "/";
    });
  }
});
