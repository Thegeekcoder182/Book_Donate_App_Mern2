const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Book = require("./models/bookModel");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

mongoose
  .connect(
    "mongodb+srv://ayanbarai185:anik4194@cluster0.us7pexp.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.post("/books", async (req, res) => {
  try {
    console.log("Received request to add a book:", req.body);

    const { title, author, genre, year, isbn, user } = req.body;
    if (!title || !author || !genre || !year || !isbn) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const book = new Book({ title, author, genre, year, isbn, user });
    console.log("Book object created:", book);

    const savedBook = await book.save();
    console.log("Book saved successfully:", savedBook);

    res.json(savedBook);
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre, year, isbn } = req.body;
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

app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    res.json(deletedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
