
export const logOut = () => {
    localStorage.removeItem("token");
    validateSession();
};

