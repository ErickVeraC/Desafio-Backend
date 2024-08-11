const express = require("express");
const createError = require("http-errors");

const usersUseCases = require("../usecases/users.usecase");

const router = express.Router();

/*
-POST /user
Para permitir el registro a los nuevos usuarios
No requiere autorización

GET /user/:id
Para obtener la información de un usuario por id
No requiere autorización

-POST /auth/login
Para otorgar un nuevo JWT cada que es llamado
No requiere autorización
*/

// POST /user
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const user = await usersUseCases.signup(data);

    res.json({
      success: true,
      message: "User created",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message,
    });
  }
});

// GET /user/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersUseCases.getById(id);

    if (!user) {
      throw createError(404, "User not found");
    }
    res.json({
      success: true,
      message: "User found",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
