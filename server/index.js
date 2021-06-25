require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');

const {
  addRecipe,
  getRecipes
} = require('./controllers/recipeController');

const {
  register,
  login,
  getUser,
} = require('./controllers/authController');

const app = express();

app.use(express.json());

const {
  SERVER_PORT,
  SESSION_SECRET,
  CONNECTION_STRING,
} = process.env;

app.use(
  session({
    saveUninitialized: true,
    resave: false,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  }
}).then((dbInstance) => {
  app.set('db', dbInstance);
  console.log('database connected');
})

app.post('/api/recipes', addRecipe)
app.get('/api/recipes', getRecipes)

app.post('/auth/register', register)
app.post('/auth/login', login);
app.get('/auth/user', getUser);

app.listen(SERVER_PORT, () => console.log('Listening on Port ' + SERVER_PORT));