const mailgun = require("mailgun-js");

const DOMAIN = 'sandbox23e4bb0a9391421c85d04d078a56fd83.mailgun.org';
const mg = mailgun({apiKey: '58afb2de5cb59853bc1327478041da74-1f1bd6a9-75932d84', domain: DOMAIN});
let sendConfirmationEmail = (code)=>{
    const data = {
        from: 'noreply@gmail.me',
        to: 'thearifali07@gmail.com',
        subject: 'Hello',
        text: 'Testing some Mailgun awesomness!',
        html: `<h1>Email Confirmation</h1>
        <h2>Hello Arif</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:8081/confirm/${code}> Click here</a>`,
    };
    mg.messages().send(data, function (error, body) {
        console.log(body);
    });
}
module.exports = {
    sendConfirmationEmail
}