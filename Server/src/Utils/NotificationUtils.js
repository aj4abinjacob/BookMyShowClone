const nodemailer = require('nodemailer');


const sendEmail = async (email, subject, html) => {

    console.log("Sending email to: ", email);
    console.log("Subject: ", subject);
    console.log("Text: ", html);

}

module.exports = {sendEmail};
