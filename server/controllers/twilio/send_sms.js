// require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports = {
  sendReminder: (req, res) => {
    // console.log('here')
    // const db = req.app.get('db');
    const user = req.session.username;
    const { activity_title, number, timeout } = req.body;
    // console.log(authToken);
    setTimeout(
      function () {
        // console.log('here')
        client.messages
          .create({
            body: `Hey ${user}! This is just a friendly reminder to do ${activity_title} today!`,
            from: '+18329242976',
            to: `+${number}`
          })
          .then(message => res.status(200).send(message))
          .catch((err) => res.status(500).send(err));
      }, +timeout
    )
  }
}