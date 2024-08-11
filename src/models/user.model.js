const mongoose = require("mongoose");

/*
Atributos necesarios para la conexión a la base de datos
- name (string)
- profilePic (string)
- email (string)
- password (string)
- created_at (date)
- updated_at (date)
*/

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  profilePic: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: RegExp(".*@.*..*"),
  },
  password: {
    type: String,
    required: true,
    select: false,
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

module.exports = mongoose.model("User", userSchema);
