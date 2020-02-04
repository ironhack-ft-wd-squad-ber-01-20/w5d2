const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String
  },
  description: String,
  author: String,
  rating: Number
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
