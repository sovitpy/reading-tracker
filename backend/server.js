import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from './models/bookModel.js';

dotenv.config();
const DB_URI = process.env.MONGO_URI;

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Your are lucky!! server is running...');
});

app.get('/books', async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      status: 'success',
      data: books,
    });
  } catch (err) {
    console.log(err);
    next();
  }
});

app.post('/books', async (req, res, next) => {
  const { title, author, description, img, status } = req.body;
  const book = {
    title,
    author,
    description,
    img,
    status,
  };
  try {
    const addedBook = await Book.create(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Book added!',
      data: book,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.delete('/books', async (req, res, next) => {
  const bookToDeleteId = req.body._id;
  if (!bookToDeleteId) {
    res.status(400).json({
      status: 'fail',
      message: 'Book id required!',
    });
    next();
  }
  try {
    const bookToDelete = await Book.findById({
      _id: bookToDeleteId,
    });
    if (!bookToDelete) {
      res.status(404).json({
        status: 'fail',
        message: 'Book with id not found!',
      });
      next();
    }
    const deletedBook = await Book.deleteOne({
      _id: bookToDelete._id,
    });
    res.status(200).json({
      status: 'success',
      message: 'Book deleted!',
      data: bookToDelete,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

mongoose.connect(DB_URI).then((res) => {
  console.log('Database Connected Successfully!');
});

app.listen(3001, () => {
  console.log('App listening on port 3001');
});
