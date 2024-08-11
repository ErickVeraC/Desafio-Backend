require("dotenv").config();

const server = require("./src/server");
const db = require("./src/lib/db");

const PORT = process.env.PORT || 8080;

db.connect()
  .then(() => {
    console.log("DB connected");
    server.listen(PORT, () => {
      console.log("Server is listening on port:", PORT);
    });
  })
  .catch((error) => {
    console.error("It wasn't possible to connect with DB: ", error);
    process.exit(1);
  });
