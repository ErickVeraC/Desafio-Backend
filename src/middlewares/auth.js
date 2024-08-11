const createError = require("http-errors");

const postUseCases = require("../usecases/posts.usecase");

const jwt = require("jsonwebtoken");

function auth() {
  return async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;

      const token = authorization?.replace("Bearer ", "");

      if (!token) {
        throw createError(401, "Token is required");
      }

      const payload = jwt.verify(token);

      const post = await postUseCases.getById(payload.id);
      req.post = post;

      next();
    } catch (error) {
      res.status(error.status || 500);
      res.json({
        success: false,
        message: error.message,
      });
    }
  };
}

module.exports = auth;
