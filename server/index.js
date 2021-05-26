require('dotenv').config();
const session = require('express-session');
const massive = require('massive');
const express = require('express');
const authCtrl = require('./controllers/auth')

const app = express();

app.use(express.json());

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {maxAge: 86400000}
  })
)

massive({
  connectionString: CONNECTION_STRING,
  ssl: {rejectUnauthorized: false}
}).then(db => {
  app.set('db', db);
  console.log('Database connection established')
})

app.post('/api/auth/register', authCtrl.register);
app.post('/api/auth/login', authCtrl.login);
app.get('/api/auth/me', authCtrl.getUser);
app.post('/api/auth/logout', authCtrl.logout);


app.listen(SERVER_PORT, _ => console.log(`Running on ${SERVER_PORT}`));