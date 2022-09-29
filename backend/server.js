
/** Reference code: https://github.com/bpeddapudi/nodejs-basics-routes/blob/master/server.js 
 * import express */
const express = require('express');
const cors = require('cors');
const app = express();
// middleware
app.use(express.json());
app.use(cors())

let myMockDB = [
    {
        id: 1,
        title: 'Rich Dad Poor Dad',
        author: 'Robert Kiyosaki',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, voluptatibus corporis! Deserunt doloribus unde magnam, iusto officia cum commodi praesentium?',
        img: 'https://m.media-amazon.com/images/I/51AHZGhzZEL.jpg',
        status: 'todo'
    },
    {
        id: 2,
        title: 'Rework',
        author: 'Jason Fried',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, voluptatibus corporis! Deserunt doloribus unde magnam, iusto officia cum commodi praesentium?',
        img: 'https://m.media-amazon.com/images/P/0307463745.01._SCLZZZZZZZ_SX500_.jpg',
        status: 'inprogress'
    },
    {
        id: 2,
        title: 'When Breath Becomes Air',
        author: 'Paul Kalanithi',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, voluptatibus corporis! Deserunt doloribus unde magnam, iusto officia cum commodi praesentium?',
        img: 'https://images-na.ssl-images-amazon.com/images/I/71dxZ1Z10xL.jpg',
        status: 'inprogress'
    }
]

app.get('/', (req, res) => {
    res.send('Your are lucky!! server is running...');
});



/** GET API: GETs Books from DB and returns as response */
app.get('/books', (req, res) => {
    res.json(myMockDB);
});

/** POST API: Gets new book info from React and adds it to DB */

app.post('/books', (req, res) => {
    const inputBook = req.body;
    const matchingBooks = myMockDB.filter(book => book.id === inputBook.id).length;
    if (matchingBooks) {
        res.status(500);
        console.error(`Book with id:${inputBook.id} already exists`);
    } else {
        myMockDB.push(req.body);
    }
    res.json(myMockDB);
});

/** DELETE API: Gets ID of the book to be deleted from React and deletes the book in db. 
 * Sends 400 if there is no book with given id
 * Sends 500 if there is an error while saving data to DB
 * Sends 200 if deleted successfully
 */

app.listen(3001);