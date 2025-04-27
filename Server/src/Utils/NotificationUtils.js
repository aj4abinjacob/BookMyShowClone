const nodemailer = require('nodemailer');

const sendEmail = (email,subject,html)=>{
    console.log(html);

    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.ADMIN_EMAIL,
            pass:process.env.ADMIN_PASSWORD
        }
    });

    let mailDetails = {
        from:process.env.ADMIN_EMAIL,
        to:email,
        subject:subject,
        html:html
    }

    transporter.sendMail(mailDetails,(err,data)=>{

        if(err){
            console.log("Unable to send email",err);
        }
        else{
            console.log(`Email sent sucessfully to${email}`);   
        }
    })


}

module.exports = sendEmail;
