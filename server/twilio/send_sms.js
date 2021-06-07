require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports = {
  sendReminder: () => {
    const {username, }
    client.messages
    .create({
       body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
       from: '+18329242976',
       to: '+18013193240'
     })
    .then(message => console.log(message.sid));
  }
}