const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
const username = req.body.username
const password = req.body.password 


if (username && password){
  if(!isValid(username)){
    users.push({"username":username, "password":password})
    return res.status(200).json({message:"Customer succesfully registerd. Please log in."})

  }
  else {
    return res.status(200).json({message:"Name already exists or there was an error attempting to create your account."})
  }
}

return res.status(404).json({message:"Unable to create user. Unknown Error."})
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn
  let filtered_isbn = books[isbn]
  res.send(filtered_isbn)

 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
 const author = req.params.author
 let works = []
 for(book in books){
  
  if(books[book].author === author){
    works.push(books[book])

  }
  
 }
 res.send(works)
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title
  let works = []
  for(book in books){
   
   if(books[book].title === title){
     works.push(books[book])
 
   }
   
  }
  res.send(works)
  
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn
  let filtered_isbn = books[isbn].reviews
  res.send(filtered_isbn)
});

module.exports.general = public_users;
