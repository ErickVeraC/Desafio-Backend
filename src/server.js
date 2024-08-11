const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const usersRoutes = require("./routes/users.routes");
const postsRoutes = require("./routes/posts.routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/user", usersRoutes);
app.use("/post", postsRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Houston, we are ready to launch",
  });
});

module.exports = app;
