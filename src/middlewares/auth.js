const createError = require("http-errors");

const userUseCases = require("../usecases/users.usecase");

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

      const user = await userUseCases.getById(payload.id);

      if (!user) {
        throw createError(401, "Unauthorized");
      }

      req.user = user;

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
