const smtpTransport = require('nodemailer-smtp-transport');
const nodemailer = require('nodemailer');
const axios = require("axios");
const config = require('dotenv').config();

(async () => {
  const transporter = nodemailer.createTransport(smtpTransport({    
       service: 'gmail',
       host: 'smtp.gmail.com', 
       auth: {        
            user: process.env.MAIL_SENDER,       
            pass: process.env.PASS_SENDER   
       }
  }));
  
  const subject = "Journée du chien"
  let { data } = await axios.get("https://api.thedogapi.com/v1/images/search")
  let {url} = data[0]
  
  const message = `Le chien du jour 😁 <br/><img src="${url}" width="300px">`

  const mailOptions = {
    from: process.env.MAIL_SENDER,
    to: process.env.MAIL_RECEIVER,      
    subject: subject,         
    html: message
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.error(error);  
    } else {     
      console.info('Email sent: ' + info.response);  
    }   
  });
})();