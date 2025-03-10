const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
// Iteration 3 | Create a Recipe
// Now that you have established the database connection and created the models, it's time to create the routes. We will start with the routes for the recepies collection.

// Create a new route POST /recipes that, upon request, creates a new recipe document in the database. See the instructions below on how to construct this route:

// See Instructions

// HTTP Request

// Method: POST
// Route: /recipes
// HTTP Response:

// Status code: 201 (Created) if the document is successfully created.
// Content-Type: JSON
// Error Response:

// Status code: 500 (Internal Server Error) in case of an error.

app.post("/recipes", (req, res) => {
  Recipe.create({
    title: req.body.title,
    instructions: req.body.instructions,
    level: req.body.level,
    ingredients: req.body.ingredients,
    image: req.body.image,
    duration: req.body.duration,
    isArchived: req.body.isArchived,
    created: req.body.created,
  })
    .then((recipe) => res.status(201).json(recipe))
    .catch((err) => res.status(500).json(err));
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
  Recipe.find()
    .then((recipes) => res.status(200).json(recipes))
    .catch((err) => res.status(500).json(err));
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:id", (req, res) => {
  Recipe.findById(req.params.id)
    .then((recipe) => res.status(200).json(recipe))
    .catch((err) => res.status(500).json(err));
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("/recipes/:id", (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((recipe) => res.status(200).json(recipe))
    .catch((err) => res.status(500).json(err));
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res) => {
  Recipe.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).json())
    .catch((err) => res.status(500).json(err));
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
