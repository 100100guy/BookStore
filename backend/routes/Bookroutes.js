const express = require("express");
const Book = require("../models/Book"); // Import the User model
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authMiddleware");

const bookRoute = express.Router();

// Create a new book
bookRoute.post("/create", async (req, res) => {
  try {
    const { title, author, category, createdBy } = req.body;
    const newBook = new Book({
      title,
      author,
      category,
      createdBy,
    });
    const createdBook = await newBook.save();
    res.status(200).json(createdBook);
  } catch (error) {
    res.status(500);
    throw new Error("Error creating book");
  }
});

// Get all books
bookRoute.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (error) {
    res.status(500);
    throw new Error("Error getting books");
  }
});

//update a book. authenticate user before that
bookRoute.put(
  "/:id", authenticateToken,
  async (req, res) => {
    try {
      const { title, author, category } = req.body;
     
      const book = await Book.findById(req.params.id);
      console.log(book);
      if (book) {
        book.title = title || book.title;
        book.author = author || book.author;
        book.category = category || book.category;
        const updatedBook = await book.save();
        console.log(updatedBook);
        res.status(200).json(updatedBook);
      } else {
        res.status(404);
        throw new Error("Book not found");
      }
    } catch (error) {
      res.status(500);
      throw new Error("Error updating book");
    }
  }
);



module.exports = bookRoute;
