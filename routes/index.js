var express = require('express');
var router = express.Router();
var path = require('path');
//call axios
var axios = require('axios');

const books =[];

/* GET home page. */
//add all the rutes

router.get('/books', function(req, res, next) {
  res.sendFile(path.join(__dirname,'..','..','cliente','index.html'))
});

router.get('/books/new',function(req,res,next){
  res.sendFile(path.join(__dirname,'..','..','cliente','new.html'))
})

router.get('/books/detail',function(req,res,next){
  res.sendFile(path.join(__dirname,'..','..','cliente','detail.html'))
})

//route to post a new book by isbn

router.post('/api/books', function(req,res,next){
  const book = req.body;
  books.push(book);
  console.log(books)
  res.json(books);
})


//route to show all the books

router.get('/api/books', function(req, res, next) {
  res.json(books);
});

//route to show the detail of a book with the api's google

router.get('/api/books/:isbn', function(req, res, next) {
  const isbn = req.params.isbn;
  axios
  .get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn)
  .then(function (elResultado) {
    console.log(elResultado.data);
    const data = elResultado.data;
 
 const libro = {
      title: data.items[0].volumeInfo.title,
      subtitle: data.items[0].volumeInfo.subtitle,
      description: data.items[0].volumeInfo.description,
      authors: data.items[0].volumeInfo.authors,
      cover: data.items[0].volumeInfo.imageLinks.thumbnail,
      isbn: isbn
      
    }

  

    res.json(libro);
  })
});





module.exports = router;
