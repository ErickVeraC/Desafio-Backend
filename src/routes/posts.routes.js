const express = require("express");
const createError = require("http-errors");

const postsUseCases = require("../usecases/posts.usecase");
const auth = require("../middlewares/auth");

const router = express.Router();

/*
-POST /posts 🔒
Para crear un nuevo post, el post creado será asignado al usuario que llamó este endpoint
Requiere autorización

-GET /posts
Para listar todos los posts
Debe soportar el filtrado por titulo usando un query param llamado `search`
No requiere autorización

-PATCH /posts/:id 🔒
Para permitir actualizar un post
No se debe permitir cambiar el usuario de un post
Requiere autorización

-DELETE /posts/:id 🔒
Para permitir borrar un post
Solo el usuario dueño del post debe ser capaz de ejecutar esta acción
Requiere autorización
*/

// POST /posts
router.post("/posts", auth, async (req, res) => {
  try {
    const data = req.body;
    const post = await postsUseCases.create(data);

    res.json({
      success: true,
      message: "Post created",
      data: {
        post,
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

// GET /posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await postsUseCases.getAll();

    res.json({
      success: true,
      message: "Posts found",
      data: {
        posts,
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

// GET /posts/:id
router.get("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postsUseCases.getById(id);

    if (!post) {
      throw createError(404, "Post not found");
    }

    res.json({
      success: true,
      message: "Post found",
      data: {
        post,
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

// PATCH /posts/:id
router.patch("/posts/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const post = await postsUseCases.update(id, newData);

    res.json({
      success: true,
      message: "Post updated",
      data: {
        post,
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

// DELETE /posts/:id
router.delete("/posts/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postsUseCases.remove(id);

    res.json({
      success: true,
      message: "Post deleted",
      data: {
        post,
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
