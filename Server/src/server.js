// Importing necessary modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Book = require("../models/bookModel"); // Importing the Book model

// Initializing the Express app
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS
app.use(bodyParser.json()) ; // Parse JSON requests
app.use(express.static("public")); // Serve static files from the 'public' directory

// Connecting to MongoDB
mongoose
  .connect(
    "mongodb+srv://ayanbarai185:anik4194@cluster0.us7pexp.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// POST endpoint to add a new book
app.post("/books", async (req, res) => {
  try {
    console.log("Received request to add a book:", req.body);

    const { title, author, genre, year, isbn, user } = req.body;
    if (!title || !author || !genre || !year || !isbn) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Creating a new Book instance
    const book = new Book({ title, author, genre, year, isbn, user });
    console.log("Book object created:", book);

    // Saving the book to the database
    const savedBook = await book.save();
    console.log("Book saved successfully:", savedBook);

    res.json(savedBook);
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET endpoint to retrieve all books
app.get("/books", async (req, res) => {
  try {
    // Fetching all books from the database
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT endpoint to update a book by ID
app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre, year, isbn } = req.body;

    // Updating the book in the database
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, genre, year, isbn },
      { new: true }
    );
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE endpoint to delete a book by ID
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Deleting the book from the database
    const deletedBook = await Book.findByIdAndDelete(id);
    res.json(deletedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Setting up the server to listen on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
