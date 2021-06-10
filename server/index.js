require('dotenv').config();
const session = require('express-session');
const massive = require('massive');
const express = require('express');
const authCtrl = require('./controllers/auth');
const homeCtrl = require('./controllers/home');
const singleCtrl = require('./controllers/single');
const compCtrl = require('./controllers/completed');
const msgCtrl = require('./controllers/twilio/send_sms');

const app = express();

app.use(express.json());

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: { maxAge: 86400000 }
  })
)

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then(db => {
  app.set('db', db);
  console.log('Database connection established')
})

app.post('/api/auth/register', authCtrl.register);
app.post('/api/auth/login', authCtrl.login);
app.get('/api/auth/me', authCtrl.getUser);
app.post('/api/auth/logout', authCtrl.logout);

app.get('/api/home/activities', homeCtrl.getActivities);
app.post('/api/home/createActivity', homeCtrl.createActivity);
app.delete('/api/home/deleteActivity/:id', homeCtrl.deleteActivity);

app.get('/api/single/getActivity/:id', singleCtrl.getActivity);
app.put('/api/single/updateActivity/:id', singleCtrl.updateActivity);
app.delete('/api/single/deleteActivity/:id', singleCtrl.deleteActivity);

app.get('/api/completion/getCompleted', compCtrl.getCompleted);
app.post('/api/completion/createCompleted', compCtrl.toggleCompleted);

app.post('/api/message/setReminder', msgCtrl.sendReminder);
app.post('/api/message/setReminderEmail', msgCtrl.sendEmailReminder);

app.listen(SERVER_PORT, _ => console.log(`Running on ${SERVER_PORT}`));