const BASE_URL = "https://desafio-backend-jnku.onrender.com";

// 1. Registrar un nuevo usuario
const registerUser = async (userObject) => {
  let response = await fetch(`${BASE_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  });

  let data = await response.json();
  return data;
};

// 2. Obtener la información de un usuario por id
const getUserById = async (userId) => {
  let response = await fetch(`${BASE_URL}/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let data = await response.json();
  return data;
};

// 3. Iniciar sesión y obtener un JWT
const loginUser = async (credentials) => {
  let response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  let data = await response.json();
  return data;
};

// 4. Obtener la información de un usuario por email y password
const getUserByEmailAndPassword = async (email, password) => {
  const credentials = { email, password };
  let data = await loginUser(credentials);

  if (data && data.token) {
    return data;
  } else {
    throw new Error("Invalid email or password");
  }
};

// 5. Almacenar el token JWT en localStorage
const storeToken = async (email, password) => {
  try {
    const data = await getUserByEmailAndPassword(email, password);

    if (data && data.token) {
      localStorage.setItem("jwtToken", data.token);
      console.log("Token stored successfully!");

      // Actualizar la sesión y UI
      validateSession();
    }
  } catch (error) {
    console.error("Error storing token:", error);
  }
};

// 6. Validar la sesión y actualizar la UI
const validateSession = async () => {
  let token = localStorage.getItem("jwtToken");
  let createPostBtn = document.getElementById("createPostBtn");
  let notifications = document.getElementById("notifications");
  let avatar = document.getElementById("avatar");
  let createAccount = document.getElementById("createAccount");
  let logOutBtn = document.getElementById("logOutBtn");
  let cardLogin = document.getElementById("card-login");

  if (!token) {
    if (createPostBtn) createPostBtn.classList.remove("d-md-block");
    if (avatar) avatar.classList.add("d-none");
    if (notifications) notifications.classList.add("d-none");
    if (createAccount) createAccount.classList.add("d-md-block");
    if (logOutBtn) logOutBtn.classList.add("d-none");
    if (cardLogin) cardLogin.classList.add("d-md-block");
  } else {
    if (createPostBtn) createPostBtn.classList.add("d-md-block");
    if (avatar) {
      avatar.classList.remove("d-none");

      // Obtener la información del usuario usando el token
      try {
        const user = await fetch(`${BASE_URL}/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json());

        if (user && user.profilePic) {
          avatar.src = user.profilePic;
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    if (notifications) notifications.classList.remove("d-none");
    if (createAccount) createAccount.classList.remove("d-md-block");
    if (logOutBtn) logOutBtn.classList.remove("d-none");
    if (cardLogin) cardLogin.classList.add("d-none");
  }
};

// 7. Función de cierre de sesión
const logOut = () => {
  localStorage.removeItem("jwtToken");
  validateSession();
};

// 8. Event listeners para el login y logout
document.addEventListener("DOMContentLoaded", () => {
  validateSession();

  let loginButton = document.getElementById("login-button");
  if (loginButton) {
    loginButton.addEventListener("click", (event) => {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (email && password) {
        storeToken(email, password).then(() => {
          window.location.href = "/";
        });
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

export { storeToken, logOut, validateSession };
