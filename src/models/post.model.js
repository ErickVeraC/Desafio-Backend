const mongoose = require("mongoose");

/*
Atributos necesarios para la conexión a la base de datos
- title (string)
- image (string)
- body (string )
- user (ObjectId referencia a UserId)
- created_at (date)
- updated_at (date)
*/

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  image: {
    type: String,
    required: false,
  },
  body: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
