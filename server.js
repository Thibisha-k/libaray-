// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let books = [
  // Thriller
  {
    id: 1,
    title: "The Girl in Room 105",
    author: "Chetan Bhagat",
    category: "Thriller",
    year: 2018,
    description: "A suspense thriller involving a mysterious murder.",
    issued: false,
  },
  {
    id: 6,
    title: "The Mahabharata Secret",
    author: "Christopher C. Doyle",
    category: "Thriller",
    year: 2013,
    description: "A gripping historical thriller based on ancient Indian secrets.",
    issued: false,
  },

  // Fantasy
  {
    id: 2,
    title: "The Immortals of Meluha",
    author: "Amish Tripathi",
    category: "Fantasy",
    year: 2010,
    description: "A mythological fantasy reimagining Lord Shiva’s life.",
    issued: false,
  },
  {
    id: 7,
    title: "The Secret of the Nagas",
    author: "Amish Tripathi",
    category: "Fantasy",
    year: 2011,
    description: "Sequel to Immortals of Meluha, diving deeper into Indian mythology.",
    issued: false,
  },

  // Kids
  {
    id: 3,
    title: "Grandma's Bag of Stories",
    author: "Sudha Murty",
    category: "Kids",
    year: 2012,
    description: "A delightful collection of moral stories for kids.",
    issued: false,
  },
  {
    id: 8,
    title: "The Magic Drum and Other Favourite Stories",
    author: "Sudha Murty",
    category: "Kids",
    year: 2008,
    description: "Traditional folk tales retold for children.",
    issued: false,
  },

  // Romance
  {
    id: 4,
    title: "2 States",
    author: "Chetan Bhagat",
    category: "Romance",
    year: 2009,
    description: "A love story about a couple from different Indian states.",
    issued: false,
  },
  {
    id: 9,
    title: "I Too Had a Love Story",
    author: "Ravinder Singh",
    category: "Romance",
    year: 2008,
    description: "A heart-touching romantic tale based on a true story.",
    issued: false,
  },

  // Comedy
  {
    id: 5,
    title: "Serious Men",
    author: "Manu Joseph",
    category: "Comedy",
    year: 2010,
    description: "A satirical novel exploring ambition and caste in India.",
    issued: false,
  },
  {
    id: 10,
    title: "Don’t Tell the Governor",
    author: "Ravi Subramanian",
    category: "Comedy",
    year: 2018,
    description: "A humorous political fiction novel.",
    issued: false,
  }
];


// GET all books
app.get('/books', (req, res) => res.json(books));

// ISSUE a book
app.put('/books/:id/issue', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (book) book.issued = true;
  res.json(book);
});

// RETURN a book
app.put('/books/:id/return', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (book) book.issued = false;
  res.json(book);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
