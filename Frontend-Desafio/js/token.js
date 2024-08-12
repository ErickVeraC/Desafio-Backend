


export const  validateSession =() => {
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
        if (cardlogin) cardlogin.classList.add("d-md-block")
    } else {
        if (createPostBtn) createPostBtn.classList.add("d-md-block");
        if (avatar) avatar.classList.remove("d-none");
        if (notifications) notifications.classList.remove("d-none");
        if (createAccount) createAccount.classList.remove("d-md-block");
        if (logOutBtn) logOutBtn.classList.remove("d-none");
        if (cardlogin) cardlogin.classList.add("d-none")
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
                window.location.href = '/'; 
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
            window.location.href = '/'; 
        });
    }
});

 
