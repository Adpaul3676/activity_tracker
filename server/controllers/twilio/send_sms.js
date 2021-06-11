// require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const EMAIL = process.env.EMAIL;
const EMAIL_PASS = process.env.EMAIL_PASS;

module.exports = {
  sendReminder: (req, res) => {
    // console.log(client);
    // console.log('here')
    // const db = req.app.get('db');
    const user = req.session.user.username;
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
  },

  sendEmailReminder: async (req, res) => {
    const user = req.session.user.username;
    const { activity_title, email, timeout } = req.body;

    setTimeout(
      function () {

        const nodemailer = require("nodemailer");
        // async..await is not allowed in global scope, must use a wrapper
        async function main() {
          // Generate test SMTP service account from ethereal.email
          // Only needed if you don't have a real mail account for testing
          let testAccount = await nodemailer.createTestAccount();

          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
            service: "Gmail",
            // port: 4000,
            // secure: false, // true for 465, false for other ports
            auth: {
              user: `${EMAIL}`, // generated ethereal user
              pass: `${EMAIL_PASS}`, // generated ethereal password
            },
          });

          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: '"Activity Tracker" <adpaul3676@gmail.com>', // sender address
            to: `${email}`, // list of receivers
            subject: "Friendly Reminder!", // Subject line
            text: `Hey ${user}! This is your reminder to do ${activity_title} today!`, // plain text body
            html: `<b>Hey ${user}! This is your reminder to do ${activity_title} today!</b>`, // html body
          });

          console.log("Message sent: %s", info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

          // Preview only available when sending through an Ethereal account
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        }

        main().catch(console.error);
      }
    ), +timeout
  }
}