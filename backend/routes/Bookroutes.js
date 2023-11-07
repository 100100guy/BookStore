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
    console.log(error);
    if (error.name === 'MongoError' && error.code === 11000) {
      // Handle duplicate key (unique field) error
      res.status(400).json({ error: 'Title must be unique.' });  
    } else {
      // Handle other errors
      res.status(500).json({ error: 'Error creating book' });
    }
   
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

// Delete a book
bookRoute.delete("/:id",authenticateToken, async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.id });
    if (book) {
      res.status(200).json({ message: "Book removed" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting book" });
    console.log(error);
  }
});




module.exports = bookRoute;
